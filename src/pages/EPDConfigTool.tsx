// src/pages/EPDConfigTool.tsx
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { 
  Alert, 
  Backdrop, 
  Box, 
  CircularProgress, 
  Snackbar, 
  Typography 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { checkBrowserSupport } from '../utils/browserCheck';
import {
  ModeType,
  PowerModeType,
  TimeZoneType,
  NetworkConfig,
  ImageConfig
} from '../types/common';
import { 
  createConfigFile, 
  createDirectory, 
  copyImages,
  createEmptyFile,
  // checkSDCardEmpty,
  cleanupSDCard
} from '../utils/fileSystem';
import { 
  generateConfig, 
  convertToConfigFile 
} from '../utils/configGenerator';
import { uploadImageToBin } from '../services/api';
import { logFileDetails } from '../utils/diagnostics';
import { validateNetworkSettings } from '../utils/networkValidators';

import PageHeader from '../components/PageHeader';
import BasicSettings from '../components/BasicSettings';
import NetworkSettings from '../components/NetworkSettings';
import ImageSettings from '../components/ImageSettings';
import SDCardPathSettings from '../components/SDCardPathSettings';
import ActionButtons from '../components/ActionButtons';
import { useTranslation } from 'react-i18next';

// Styled Components
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

// Helper Types
interface FileError extends Error {
  name: string;
  message: string;
  stack?: string;
}

// 計算預估空間大小
const calculateEstimatedSize = (
  images: ImageConfig['images'], 
  mode: ModeType
): number => {
  // 計算原始圖片大小
  const imagesSize = images.reduce((total, img) => total + img.file.size, 0);
  
  if (mode === 'auto') {
    // auto 模式：原始圖片 + BIN檔案(約1.5倍) + 其他檔案
    const estimatedBinSize = imagesSize * 1.5;
    const otherFilesSize = 1024 * 1024; // 1MB for other files
    return imagesSize + estimatedBinSize + otherFilesSize;
  } else if (mode === 'nas') {
    // nas 模式：原始圖片 + ZIP壓縮(約0.8倍) + 其他檔案
    const estimatedZipSize = imagesSize * 0.8;
    const otherFilesSize = 1024 * 1024; // 1MB for other files
    return imagesSize + estimatedZipSize + otherFilesSize;
  }
  
  return 0; // 其他模式不需要額外空間
};

// 檢查儲存空間錯誤
const isStorageError = (error: Error): boolean => {
  return error.name === 'QuotaExceededError' || 
         error.message.includes('quota') || 
         error.message.includes('space');
};

// 寫入檔案的輔助函數
async function writeFile(
  directory: FileSystemDirectoryHandle,
  fileName: string,
  content: Blob
): Promise<void> {
  try {
    const fileHandle = await directory.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  } catch (error) {
    console.error(`Error writing file ${fileName}:`, error);
    throw error;
  }
}

// 取得平台資訊
const getPlatformInfo = () => {
  if ('userAgentData' in navigator && navigator.userAgentData) {
    return {
      platform: navigator.userAgentData.platform || 'unknown',
      mobile: navigator.userAgentData.mobile || false,
      brands: navigator.userAgentData.brands || []
    };
  }
  
  return {
    platform: 'unknown',
    mobile: /Mobile|Android|iPhone/i.test(navigator.userAgent),
    brands: []
  };
};

// 定義翻譯選項的介面
interface TranslationOptions {
  imageNumber?: number;
  totalImages?: number;
  name?: string;
  current?: number;
  total?: number;
  interpolation?: {
    escapeValue: boolean;
  };
}

// 處理圖片的主要函數
async function processImages(
  images: ImageConfig['images'],
  imageDir: FileSystemDirectoryHandle,
  size: string,
  setStatus: (status: string) => void,
  t: (key: string, options?: TranslationOptions) => string
): Promise<void> {
  console.log('Starting processImages diagnostic:', { 
    imageCount: images.length, 
    size,
    platformInfo: getPlatformInfo(),
    userAgent: navigator.userAgent
  });

  try {
    // 複製並重命名圖片
    setStatus(t('common.status.copyingImages'));

    for (const [index, image] of images.entries()) {
      try {
        console.log(`Original file ${index + 1} diagnostic:`, await logFileDetails(image.file));

        const extension = image.name.split('.').pop() || '';
        const newFileName = `${(index + 1).toString()}.${extension}`;

        setStatus(t('common.status.copyingImages', { 
          imageNumber: index + 1,
          totalImages: images.length,
          name: newFileName
        }));

        await copyImages([{ ...image, name: newFileName, order: index }], imageDir);
        console.log(`Copied and renamed image to ${newFileName}`);
      } catch (err) {
        const error = err as FileError;
        if (isStorageError(error)) {
          console.error('Storage error while copying images:', {
            error: error.message,
            errorType: error.name,
            errorStack: error.stack
          });
          throw new Error(t('common.error.insufficientSpace'));
        }
        throw error;
      }
    }

    // 處理每個圖片的轉換
    for (let index = 0; index < images.length; index++) {
      try {
        const originalImage = images[index];
        const extension = originalImage.name.split('.').pop() || '';
        const newFileName = `${(index + 1).toString()}.${extension}`;

        const statusText = t('common.status.uploadingImage', { 
          current: index + 1, 
          total: images.length,
          name: newFileName 
        });
        console.log(statusText);
        setStatus(statusText);

        const fileHandle = await imageDir.getFileHandle(newFileName);
        const file = await fileHandle.getFile();
        console.log(`Processing renamed file ${index + 1} diagnostic:`, await logFileDetails(file));

        const fileBlob = new Blob([await file.arrayBuffer()], { type: file.type });
        const newFile = new File([fileBlob], file.name, { 
          type: file.type,
          lastModified: file.lastModified 
        });
        console.log(`File copy diagnostic:`, await logFileDetails(newFile));

        const result = await uploadImageToBin(newFile, size);
        console.log('Upload result:', result);

        // 處理 bin 檔案
        if (result.bin_url && result.bin_url.length > 0) {
          setStatus(t('common.status.downloadingBinFiles', { 
            current: index + 1, 
            total: images.length 
          }));

          for (let binIndex = 0; binIndex < result.bin_url.length; binIndex++) {
            const url = result.bin_url[binIndex];
            const secureUrl = url.replace('http://', 'https://');
            console.log('Downloading bin file:', secureUrl);
            const response = await fetch(secureUrl);
            
            if (!response.ok) {
              throw new Error(`Failed to download bin file: ${secureUrl}`);
            }
            
            const blob = await response.blob();
            const binFileName = `${index + 1}_${binIndex}.bin`;
            
            await writeFile(imageDir, binFileName, blob);
            console.log(`Saved bin file as: ${binFileName}`);
          }
        }
      } catch (err) {
        const error = err as FileError;
        console.error(`Error processing image ${(index + 1).toString()}:`, {
          error: error.message,
          errorType: error.name,
          errorStack: error.stack
        });
        if (isStorageError(error)) {
          throw new Error(t('common.error.insufficientSpace'));
        }
        throw new Error(t('common.error.imageProcessingFailed', { 
          name: `${(index + 1).toString()}`
        }));
      }
    }
  } catch (err) {
    const error = err as FileError;
    console.error('Error in processImages:', {
      error: error.message,
      errorType: error.name,
      errorStack: error.stack
    });
    throw error;
  }
}

const EPDConfigurationTool: React.FC = () => {
  const { t } = useTranslation();

  // 瀏覽器支援檢查
  const isSupportedBrowser = useMemo(() => checkBrowserSupport(), []);

  // UI 狀態
  const [sdCardHandle, setSdCardHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [showBrowserWarning, setShowBrowserWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<{
    show: boolean;
    message: string;
  }>({
    show: false,
    message: ''
  });

  // 基本設定狀態
  const [customer, setCustomer] = useState('NB');
  const [customerError, setCustomerError] = useState<string>('');
  const [mode, setMode] = useState<ModeType>('auto');
  const [powerMode, setPowerMode] = useState<PowerModeType>('hibernation');
  const [timeZone, setTimeZone] = useState<TimeZoneType>('GMT+08:00');
  const [sdCardPath, setSdCardPath] = useState('');

  // 網路設定狀態
  const [networkConfig, setNetworkConfig] = useState<NetworkConfig>({
    wifi: 'wpa2Personal',
    ssid: '',
    password: '',
    ip: '',
    netmask: '',
    gateway: '',
    dns: '',
  });

  // ServerURL 狀態和處理
  const [serverURL, setServerURL] = useState('');
  const [networkErrors, setNetworkErrors] = useState<Record<string, string>>({});

  // 當模式改變時更新 ServerURL
  useEffect(() => {
    setServerURL(mode === 'cms' ? 'https://api.ezread.com.tw/schedule' : '');
  }, [mode]);

  // 圖片設定狀態
  const [imageConfig, setImageConfig] = useState<ImageConfig>({
    size: '31.5',
    rotate: 0,
    interval: 180,
    images: []
  });

  // 欄位引用
  const fieldRefs = {
    ssid: React.createRef<HTMLInputElement>(),
    password: React.createRef<HTMLInputElement>(),
    ip: React.createRef<HTMLInputElement>(),
    netmask: React.createRef<HTMLInputElement>(),
    gateway: React.createRef<HTMLInputElement>(),
    dns: React.createRef<HTMLInputElement>(),
    serverURL: React.createRef<HTMLInputElement>()
  };

  // 瀏覽器支援檢查效果
  useEffect(() => {
    if (!isSupportedBrowser) {
      setShowBrowserWarning(true);
    }
  }, [isSupportedBrowser]);

  // 事件處理函數
  const handleCustomerChange = useCallback((value: string) => {
    setCustomer(value);
    if (customerError) {
      setCustomerError('');
    }
  }, [customerError]);

  const [serverSyncInterval, setServerSyncInterval] = useState('10'); // 預設值為 10
  const [basicErrors, setBasicErrors] = useState<Record<string, string>>({});

  const handleBasicError = useCallback((field: string, error: string) => {
    setBasicErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, []);

  const handleNetworkError = useCallback((field: string, error: string) => {
    setNetworkErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, []);

  const handleNetworkConfigChange = useCallback((updates: Partial<NetworkConfig>) => {
    setNetworkConfig(prev => {
      if ('wifi' in updates) {
        const newConfig = { ...prev, ...updates };
        
        switch (updates.wifi) {
          case 'open':
            return {
              ...newConfig,
              password: '',
              ip: '',
              netmask: '',
              gateway: '',
              dns: ''
            };
            
          case 'wpa2Personal':
            return {
              ...newConfig,
              ip: '',
              netmask: '',
              gateway: '',
              dns: ''
            };
            
          case 'staticIP':
            return newConfig;
            
          default:
            return newConfig;
        }
      }
      
      return { ...prev, ...updates };
    });
  }, []);

  const handleImageConfigChange = useCallback((
    updates: Partial<ImageConfig> | ((prev: ImageConfig) => ImageConfig)
  ) => {
    if (typeof updates === 'function') {
      setImageConfig(updates);
    } else {
      setImageConfig(prev => ({ ...prev, ...updates }));
    }
  }, []);

  const handleSDCardError = useCallback((message: string) => {
    setError({
      show: true,
      message
    });
  }, []);

  // handleGenerateConfig 函數
  const handleGenerateConfig = async () => {
    try {
      // 1. 先進行所有欄位檢查
      // 清除之前的錯誤訊息
      setCustomerError('');

      // 檢查共同必填項目: Customer
      if (!customer.trim()) {
        setCustomerError(t('common.error.customerRequired'));
        return;
      }

      // 檢查網路設定 (CMS 和 NAS 模式)
      if (mode === 'cms' || mode === 'nas') {
        // 檢查 ServerSyncInterval
        const intervalValue = parseInt(serverSyncInterval, 10);

        if (isNaN(intervalValue) || intervalValue < 5 || intervalValue > 1440) {
          setError({
            show: true,
            message: t('common.error.serverSyncInterval.invalid')
          });
          return;
        }
        
        // 檢查網路設定
        const networkValidation = validateNetworkSettings(
          t,
          mode,
          networkConfig,
          serverURL
        );

        if (!networkValidation.isValid) {
          const firstErrorField = Object.keys(networkValidation.errors)[0] as keyof typeof fieldRefs;
          
          if (firstErrorField && fieldRefs[firstErrorField]?.current) {
            fieldRefs[firstErrorField].current.focus();
          }
  
          setError({
            show: true,
            message: Object.values(networkValidation.errors)[0]
          });
          return;
        }
      }

      // 2. 檢查 SD Card 相關
      if (!sdCardHandle) {
        setError({
          show: true,
          message: t('common.error.noSDCardSelected')
        });
        return;
      }  

      // 4. 檢查 SD Card 是否為空
      // setProcessingStatus(t('common.status.checkingSDCard'));
      // const isEmpty = await checkSDCardEmpty(sdCardHandle, true);
      // if (!isEmpty) {
      //   throw new Error(t('common.error.sdCardNotEmpty'));
      // }

      // 3. 檢查特定模式的必要條件
      if (mode === 'auto' || mode === 'nas') {
        if (!imageConfig.images.length) {
          setError({
            show: true,
            message: t('common.error.noImagesSelected')
          });
          return;
        }

        // 空間檢查
        setProcessingStatus(t('common.status.estimatingSpace'));
        const estimatedSize = calculateEstimatedSize(imageConfig.images, mode);
        const shouldContinue = window.confirm(
          t('common.warning.spaceRequirement', { 
            size: Math.ceil(estimatedSize / (1024 * 1024))
          }) + '\n\n' + 
          t('common.warning.spaceConfirmation')
        );

        if (!shouldContinue) {
          return;
        }
      } else if (mode === 'cms') {
        const requiredFields = [];

        if (!networkConfig.ssid.trim()) requiredFields.push('SSID');
        if (!serverURL.trim()) requiredFields.push('CMS Server URL');

        if (['wpa2Personal', 'staticIP'].includes(networkConfig.wifi) && 
            !networkConfig.password.trim()) {
          requiredFields.push('WiFi Password');
        }

        if (networkConfig.wifi === 'staticIP') {
          if (!networkConfig.ip.trim()) requiredFields.push('IP Address');
          if (!networkConfig.netmask.trim()) requiredFields.push('Netmask');
          if (!networkConfig.gateway.trim()) requiredFields.push('Gateway');
          if (!networkConfig.dns.trim()) requiredFields.push('DNS');
        }

        if (requiredFields.length > 0) {
          setError({
            show: true,
            message: t('common.error.requiredFields', { 
              fields: requiredFields.join(', ') 
            })
          });
          return;
        }
      }

      // 4. 所有檢查都通過後，才開始真正的處理流程
      setIsProcessing(true);  // 在這裡設定處理中狀態

      try {
        // 執行實際的檔案處理、設定生成等工作
        setProcessingStatus(t('common.status.creatingFiles'));
        await createEmptyFile(sdCardHandle, 'show_info');

        // 處理圖片（auto 或 nas 模式）
        if (mode === 'auto' || mode === 'nas') {
          setProcessingStatus(t('common.status.creatingDirectory'));
          const imageDir = await createDirectory(sdCardHandle, 'image/slideshow');
          
          try {
            await processImages(
              imageConfig.images,
              imageDir,
              imageConfig.size,
              setProcessingStatus,
              t
            );
          } catch (error) {
            if (isStorageError(error as Error)) {
              setProcessingStatus(t('common.status.cleaningUp'));
              await cleanupSDCard(sdCardHandle, 'storage_error');
              throw new Error(t('common.error.insufficientSpace'));
            }
            throw error;
          }
        }

        // 5. 建立設定檔
        setProcessingStatus(t('common.status.creatingConfig'));
        
        // 在 generateConfig 呼叫時添加
        const internalConfig = generateConfig(
          customer,
          mode,
          powerMode,
          timeZone,
          imageConfig,
          mode === 'cms' || mode === 'nas' ? {
            ...networkConfig,
            serverURL,
            ServerSyncInterval: parseInt(serverSyncInterval, 10)
          } : undefined
        );

        const configFile = convertToConfigFile(internalConfig);
        await createConfigFile(sdCardHandle, configFile);
        setShowSuccess(true);

      } catch (error) {
        // 處理執行期間的錯誤
        console.error('Error during process:', error);
        setProcessingStatus(t('common.status.cleaningUp'));
        await cleanupSDCard(sdCardHandle, 'process_error');
        throw error;
      }
    } catch (error) {
      // 處理整體錯誤
      console.error('Error in handleGenerateConfig:', error);
      setError({
        show: true,
        message: error instanceof Error ? 
          (error.message.includes('儲存空間不足') ? 
            `${error.message}\n${t('common.error.spaceSuggestions')}` : 
            error.message) : 
          t('common.error.generateConfigFailed')
      });
      setIsProcessing(false);
      setProcessingStatus('');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box>
      <PageHeader />
      
      <BasicSettings
        customer={customer}
        setCustomer={handleCustomerChange}
        customerError={customerError}
        mode={mode}
        setMode={setMode}
        powerMode={powerMode}
        setPowerMode={setPowerMode}
        timeZone={timeZone}
        setTimeZone={setTimeZone}
        serverSyncInterval={serverSyncInterval}
        setServerSyncInterval={setServerSyncInterval}
        serverSyncIntervalError={basicErrors.serverSyncInterval}
        onErrorChange={handleBasicError}
      />

      <ImageSettings
        mode={mode}
        config={imageConfig}
        onConfigChange={handleImageConfigChange}
        customer={customer}
        powerMode={powerMode}
        timeZone={timeZone}
      />

      <NetworkSettings
        mode={mode}
        config={networkConfig}
        onConfigChange={handleNetworkConfigChange}
        serverURL={serverURL}
        setServerURL={setServerURL}
        errors={networkErrors}
        onErrorChange={handleNetworkError}
        fieldRefs={fieldRefs}
      />

      <SDCardPathSettings
        sdCardPath={sdCardPath}
        setSdCardPath={setSdCardPath}
        onDirectorySelect={setSdCardHandle}
        disabled={!isSupportedBrowser}
        onError={handleSDCardError}
      />

      <ActionButtons
        mode={mode}
        onGenerateConfig={handleGenerateConfig}
        disabled={!isSupportedBrowser}
      />

      {/* Processing Backdrop */}
      <StyledBackdrop open={isProcessing}>
        <CircularProgress color="inherit" size={60} />
        <Typography variant="h6" component="div">
          {processingStatus || t('common.status.processing')}
        </Typography>
      </StyledBackdrop>

      {/* 瀏覽器警告提示 */}
      <Snackbar 
        open={showBrowserWarning}
        autoHideDuration={6000}
        onClose={() => setShowBrowserWarning(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowBrowserWarning(false)}
          severity="warning" 
          variant="filled"
          sx={{ 
            width: '100%',
            backgroundColor: theme => theme.palette.primary.dark,
          }}
        >
          {t('common.error.browserNotSupported')}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={error.show}
        autoHideDuration={6000}
        onClose={() => setError({ ...error, show: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError({ ...error, show: false })}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error.message}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {t('common.success.configGenerated')}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EPDConfigurationTool;
