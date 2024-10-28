// src/components/EPDConfigTool.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Backdrop, Box, CircularProgress, Snackbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';  // 加入這行
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
import { checkSDCardEmpty, copyImage, createDirectory } from '../utils/fileSystem';

// 自定義 Backdrop 樣式
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
  const [sdCardHandle, setSdCardHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [processingStatus, setProcessingStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // 檢查瀏覽器支援
    if (!checkBrowserSupport()) {
      // 可以選擇直接導向到錯誤頁面
      navigate('/browser-not-supported');
      // 或者顯示警告訊息
      alert(t('common.error.browserNotSupported'));
      // 或者顯示 Snackbar 提示
      setShowBrowserWarning(true);
    }
  }, [navigate, t]);

  const [showBrowserWarning, setShowBrowserWarning] = useState(false);

  // Basic settings state
  const [customer, setCustomer] = useState('');
  const [mode, setMode] = useState<ModeType>('auto');
  const [powerMode, setPowerMode] = useState<PowerModeType>('hibernation');
  const [timeZone, setTimeZone] = useState<TimeZoneType>('GMT+08:00');
  const [sdCardPath, setSdCardPath] = useState('');

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

  // 修改 imageConfig 的初始化和更新
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

  const handleGenerateConfig = async () => {
    try {
      if (!sdCardHandle) {
        throw new Error(t('common.error.noSDCard'));
      }
  
      console.log('Checking SD card path:', sdCardPath);
      
      // 檢查目錄是否為空
      const isEmpty = await checkSDCardEmpty(sdCardHandle, true);  // true 表示忽略系統檔案
      console.log('Is directory empty?', isEmpty);
      
      if (!isEmpty) {
        throw new Error('SD Card 不是空的，請手動清空後再試一次');
      }
  
      // 建立目錄
      const imageDir = await createDirectory(sdCardHandle, 'image/slideshow');
      console.log('Created directory:', imageDir);

      // ... 其餘代碼
  
      // 複製圖片
      // await copyImage('image-url', imageDir, '1.png');
  
    } catch (error) {
      console.error('Error in handleGenerateConfig:', error);
      // 這裡可以添加更友善的錯誤訊息顯示
    }
  };

  return (
    <Box>
      <PageHeader />
      
      <BasicSettings
        customer={customer}
        setCustomer={setCustomer}
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
        onDirectorySelect={(handle) => setSdCardHandle(handle)}  // 新增這行
      />

      <ActionButtons
        mode={mode}
        onGenerateConfig={handleGenerateConfig}
      />

      {/* 瀏覽器警告提示 */}
      <Snackbar 
        open={showBrowserWarning}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
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

      {/* Processing Mask */}
      <StyledBackdrop open={isProcessing}>
        <CircularProgress color="inherit" size={60} />
        <Typography variant="h6" component="div">
          {processingStatus || t('common.status.processing')}
        </Typography>
      </StyledBackdrop>
    </Box>
  );
};

export default EPDConfigurationTool;
