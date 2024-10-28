// src/pages/EPDConfigTool.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  createEmptyFile
} from '../utils/fileSystem';

// Styled Backdrop
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const EPDConfigurationTool: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const handleGenerateConfig = async () => {
    try {
      // 清除之前的錯誤訊息
      setCustomerError('');

      // 檢查 Customer 是否有輸入
      if (!customer.trim()) {
        setCustomerError(t('common.error.customerRequired'));
        return;
      }

      // 檢查是否已選擇 SD Card
      if (!sdCardHandle) {
        setError({
          show: true,
          message: t('common.error.noSDCardSelected')
        });
        return;
      }

      // 開始處理，顯示 Backdrop
      setIsProcessing(true);

      // 建立 show_info
      setProcessingStatus(t('common.status.creatingFiles'));
      await createEmptyFile(sdCardHandle, 'show_info');

      // 建立目錄
      setProcessingStatus(t('common.status.creatingDirectory'));
      const imageDir = await createDirectory(sdCardHandle, 'image/slideshow');

      // 複製圖片
      setProcessingStatus(t('common.status.copyingImages'));
      await copyImages(imageConfig.images, imageDir);

      // 建立設定檔
      setProcessingStatus(t('common.status.creatingConfig'));
      const configData = {
        Customer: customer,
        Mode: mode,
        PowerMode: powerMode,
        Interval: imageConfig.interval.toString(),
        WifiSetting: `${networkConfig.ssid}${networkConfig.password ? ',' + networkConfig.password : ''}`,
        TimeZone: timeZone,
        SoftAP: "0",
        Path: "/sdcard/image/slideshow",
        ServerURL: serverURL,
        PackageName: "",
        ActivityName: "",
        ...(networkConfig.ip ? {
          IP_addr: networkConfig.ip,
          Netmask: networkConfig.netmask,
          Gateway: networkConfig.gateway,
          DNS: networkConfig.dns
        } : {})
      };
      
      await createConfigFile(sdCardHandle, configData);

      // 完成處理
      setShowSuccess(true);

    } catch (error) {
      console.error('Error in handleGenerateConfig:', error);
      setError({
        show: true,
        message: t('common.error.generateConfigFailed')
      });
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
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
    rotate: 0,
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
      setImageConfig(prev => ({
        ...prev,
        ...updates
      }));
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
