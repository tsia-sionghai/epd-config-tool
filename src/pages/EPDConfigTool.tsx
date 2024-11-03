// src/pages/EPDConfigTool.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
import PageHeader from '../components/PageHeader';
import BasicSettings from '../components/BasicSettings';
import NetworkSettings from '../components/NetworkSettings';
import ImageSettings from '../components/ImageSettings';
import SDCardPathSettings from '../components/SDCardPathSettings';
import ActionButtons from '../components/ActionButtons';
import { 
  createConfigFile, 
  createDirectory, 
  copyImages,
  createEmptyFile,
  checkSDCardEmpty,
  cleanupSDCard} from '../utils/fileSystem';
import { uploadImageToBin } from '../services/api';

// Styled Backdrop
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

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

// isStorageError helper function
const isStorageError = (error: Error): boolean => {
  return error.name === 'QuotaExceededError' || 
         error.message.includes('quota') || 
         error.message.includes('space');
};

// 在文件頂部 import 區域加入
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

const EPDConfigurationTool: React.FC = () => {
  const { t } = useTranslation();

  // 檢查是否是支援的瀏覽器
  const isSupportedBrowser = useMemo(() => checkBrowserSupport(), []);

  // States for UI feedback
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

  useEffect(() => {
    if (!isSupportedBrowser) {
      setShowBrowserWarning(true);
    }
  }, [isSupportedBrowser]);

  // Basic settings state
  const [customer, setCustomer] = useState('');
  const [customerError, setCustomerError] = useState<string>('');
  const [mode, setMode] = useState<ModeType>('auto');
  const [powerMode, setPowerMode] = useState<PowerModeType>('hibernation');
  const [timeZone, setTimeZone] = useState<TimeZoneType>('GMT+08:00');
  const [sdCardPath, setSdCardPath] = useState('');

  // processImages 需放在 handleGenerateConfig 之前
  const processImages = async (
    images: ImageConfig['images'],
    imageDir: FileSystemDirectoryHandle,
    size: string,
    setStatus: (status: string) => void
  ) => {
    console.log('Starting processImages:', { 
      imageCount: images.length, 
      size 
    });
  
    try {
      // 先複製並重命名所有圖片，保留原始副檔名
      setStatus(t('common.status.copyingImages'));
      for (const [index, image] of images.entries()) {
        try {
          // 取得原始檔案的副檔名
          const extension = image.name.split('.').pop() || '';
          const newFileName = `${(index + 1).toString()}.${extension}`;
          await copyImages([{ ...image, name: newFileName, order: index }], imageDir);
          console.log(`Copied and renamed image to ${newFileName}`);
        } catch (error) {
          // 檢查是否為儲存空間錯誤
          if (isStorageError(error as Error)) {
            console.error('Storage error while copying images:', error);
            throw new Error(t('common.error.insufficientSpace'));
          }
          throw error;
        }
      }
  
      // 然後使用重命名後的圖片進行轉換
      for (let index = 0; index < images.length; index++) {
        try {
          // 使用原始圖片的副檔名
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
  
          // 取得重命名後的圖片檔案
          const fileHandle = await imageDir.getFileHandle(newFileName);
          const file = await fileHandle.getFile();
  
          // 記錄檔案資訊以便偵錯
          console.log('Uploading file:', {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified
          });
  
          const result = await uploadImageToBin(file, size);
          console.log('Upload result:', result);
  
          if (result.bin_url && result.bin_url.length > 0) {
            const downloadStatus = t('common.status.downloadingBinFiles', { 
              current: index + 1, 
              total: images.length 
            });
            console.log(downloadStatus);
            setStatus(downloadStatus);
  
            for (const url of result.bin_url) {
              try {
                console.log('Downloading bin file:', url);
                const response = await fetch(url);
                
                if (!response.ok) {
                  throw new Error(`Failed to download bin file: ${url}`);
                }
                
                const blob = await response.blob();
                const fileName = url.split('/').pop() || `${(index + 1).toString()}.bin`;
                
                // 寫入 bin 檔案時也檢查儲存空間錯誤
                try {
                  await writeFile(imageDir, fileName, blob);
                  console.log('Saved bin file:', fileName);
                } catch (error) {
                  if (isStorageError(error as Error)) {
                    console.error('Storage error while saving bin file:', error);
                    throw new Error(t('common.error.insufficientSpace'));
                  }
                  throw error;
                }
              } catch (error) {
                console.error(`Error processing bin file ${url}:`, error);
                throw error;
              }
            }
          }
  
        } catch (error) {
          console.error(`Error processing image ${(index + 1).toString()}:`, error);
          // 如果是儲存空間錯誤，使用特定的錯誤訊息
          if (isStorageError(error as Error)) {
            throw new Error(t('common.error.insufficientSpace'));
          }
          // 其他錯誤則使用一般的錯誤訊息
          throw new Error(t('common.error.imageProcessingFailed', { 
            name: `${(index + 1).toString()}`
          }));
        }
      }
    } catch (error) {
      console.error('Error in processImages:', error);
      throw error; // 向上傳遞錯誤，讓 handleGenerateConfig 處理清理工作
    }
  };  

  const handleGenerateConfig = async () => {
    try {
      // 清除之前的錯誤訊息
      setCustomerError('');
  
      // 1. 檢查共同必填項目: Customer
      if (!customer.trim()) {
        setCustomerError(t('common.error.customerRequired'));
        return;
      }
  
      // 2. 檢查 SD Card 是否已選擇
      if (!sdCardHandle) {
        setError({
          show: true,
          message: t('common.error.noSDCardSelected')
        });
        return;
      }
  
      // 3. 檢查 SD Card 是否為空
      setProcessingStatus(t('common.status.checkingSDCard'));
      const isEmpty = await checkSDCardEmpty(sdCardHandle, true);
      if (!isEmpty) {
        throw new Error(t('common.error.sdCardNotEmpty'));
      }
  
      // 4. 檢查模式相關的必填欄位
      if (mode === 'auto' || mode === 'nas') {  // 修改判斷條件
        if (!imageConfig.images.length) {
          setError({
            show: true,
            message: t('common.error.noImagesSelected')
          });
          return;
        }
      
        // 空間檢查（在任何需要處理圖片的模式下進行）
        setProcessingStatus(t('common.status.estimatingSpace'));
        const estimatedSize = calculateEstimatedSize(imageConfig.images, mode);  // 傳入 mode 參數
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
        const errors = [];

        if (!networkConfig.ssid.trim()) errors.push('SSID');
        if (!serverURL.trim()) errors.push('CMS Server URL');
  
        if (['wpa2Personal', 'staticIP'].includes(networkConfig.wifi) && 
            !networkConfig.password.trim()) {
          errors.push('WiFi Password');
        }
  
        if (networkConfig.wifi === 'staticIP') {
          if (!networkConfig.ip.trim()) errors.push('IP Address');
          if (!networkConfig.netmask.trim()) errors.push('Netmask');
          if (!networkConfig.gateway.trim()) errors.push('Gateway');
          if (!networkConfig.dns.trim()) errors.push('DNS');
        }
  
        if (errors.length > 0) {
          throw new Error(t('common.error.requiredFields', { 
            fields: errors.join(', ') 
          }));
        }
      }

      // 開始處理，顯示 Loading
      setIsProcessing(true);
  
      try {
        // 5. 建立必要檔案和目錄
        setProcessingStatus(t('common.status.creatingFiles'));
        await createEmptyFile(sdCardHandle, 'show_info');
  
        // 6. 處理圖片（如果是 auto 模式）
        if (mode === 'auto' || mode === 'nas') {
          setProcessingStatus(t('common.status.creatingDirectory'));
          console.log('Creating image directory...');
          const imageDir = await createDirectory(sdCardHandle, 'image/slideshow');
          console.log('Image directory created');
  
          try {
            console.log('Starting image processing...');
            await processImages(
              imageConfig.images,
              imageDir,
              imageConfig.size,
              (status) => {
                console.log('Status update:', status);
                setProcessingStatus(status);
              }
            );
            console.log('Image processing completed');
          } catch (error) {
            // 處理圖片過程中的錯誤
            if (isStorageError(error as Error)) {
              setProcessingStatus(t('common.status.cleaningUp'));
              await cleanupSDCard(sdCardHandle, 'storage_error');
              throw new Error(t('common.error.insufficientSpace'));
            }
            throw error;
          }
        }
  
        // 7. 建立設定檔
        setProcessingStatus(t('common.status.creatingConfig'));
        const configData = {
          Customer: customer,
          Mode: mode,
          PowerMode: powerMode,
          TimeZone: timeZone,
          SoftAP: "0",
          Path: "/sdcard/image/slideshow",
          
          ...(mode === 'cms' ? {
            Interval: "180",
            WifiSetting: `${networkConfig.ssid}${networkConfig.password ? ',' + networkConfig.password : ''}`,
            ServerURL: serverURL,
            ...(networkConfig.wifi === 'staticIP' ? {
              IP_addr: networkConfig.ip,
              Netmask: networkConfig.netmask,
              Gateway: networkConfig.gateway,
              DNS: networkConfig.dns
            } : {})
          } : {
            Interval: imageConfig.interval.toString(),
            WifiSetting: "",
            ServerURL: "",
          }),
  
          PackageName: "",
          ActivityName: "",
        };
        
        await createConfigFile(sdCardHandle, configData);
        setShowSuccess(true);

      } catch (error) {
        // 如果在處理過程中發生錯誤，進行清理
        console.error('Error during process:', error);
        setProcessingStatus(t('common.status.cleaningUp'));
        await cleanupSDCard(sdCardHandle, 'process_error');
        throw error;
      }

    } catch (error) {
      console.error('Error in handleGenerateConfig:', error);
      setError({
        show: true,
        message: error instanceof Error ? 
          (error.message.includes('儲存空間不足') ? 
            `${error.message}\n${t('common.error.spaceSuggestions')}` : 
            error.message) : 
          t('common.error.generateConfigFailed')
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // 當 customer 值改變時清除錯誤訊息
  const handleCustomerChange = (value: string) => {
    setCustomer(value);
    if (customerError) {
      setCustomerError('');
    }
  };

  // Network settings state
  const [networkConfig, setNetworkConfig] = useState<NetworkConfig>({
    wifi: 'wpa2Personal',
    ssid: '',
    password: '',
    ip: '',
    netmask: '',
    gateway: '',
    dns: '',
  });

  // Image settings state
  const [imageConfig, setImageConfig] = useState<ImageConfig>({
    size: '13.3',
    rotate: 90,  // 13.3" 的預設值為 90 度
    interval: 180,
    images: []
  });

  // Additional settings state
  const [serverURL, setServerURL] = useState('https://api.ezread.com.tw/schedule');
  const [nasURL, setNasURL] = useState('');

  const handleNetworkConfigChange = (updates: Partial<NetworkConfig>) => {
    setNetworkConfig(prev => ({ ...prev, ...updates }));
  };

  const handleImageConfigChange = (
    updates: Partial<ImageConfig> | ((prev: ImageConfig) => ImageConfig)
  ) => {
    if (typeof updates === 'function') {
      setImageConfig(updates);
    } else {
      setImageConfig(prev => {
        // 只在 size 變更時處理預設的 rotate 值
        if (updates.size) {
          return {
            ...prev,
            ...updates,
            // 如果是切換到 13.3"，則預設為 90 度
            // 如果是切換到其他尺寸，則預設為 0 度
            rotate: updates.size === '13.3' ? 90 : 0
          };
        }
        // 其他更新（包括手動調整 rotate）維持原樣
        return { ...prev, ...updates };
      });
    }
  };

  const handleSDCardError = (message: string) => {
    setError({
      show: true,
      message
    });
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
      />

      <ImageSettings
        mode={mode}
        config={imageConfig}
        onConfigChange={handleImageConfigChange}
      />

      <NetworkSettings
        mode={mode}
        config={networkConfig}
        onConfigChange={handleNetworkConfigChange}
        serverURL={serverURL}
        setServerURL={setServerURL}
        nasURL={nasURL}
        setNasURL={setNasURL}
      />

      <SDCardPathSettings
        sdCardPath={sdCardPath}
        setSdCardPath={setSdCardPath}
        onDirectorySelect={setSdCardHandle}
        disabled={!isSupportedBrowser}
        onError={handleSDCardError}  // 新增錯誤處理函數
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
        onClose={(_event, reason) => {
          setError({ ...error, show: false });
          // 如果是點擊關閉按鈕且錯誤訊息是 customerRequired
          if (
            reason === 'clickaway' || 
            error.message !== t('common.error.customerRequired')
          ) {
            return;
          }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => {
            setError({ ...error, show: false });
          }}
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
