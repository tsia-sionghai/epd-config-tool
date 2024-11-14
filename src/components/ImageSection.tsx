// src/components/ImageSection.tsx
import React, { useCallback, useState } from 'react';
import { 
  Grid, 
  useTheme, 
  SxProps, 
  Theme,
  Backdrop,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HintMessage from './HintMessage';
import ImageUploader from './ImageUploader';
import CustomButton from './common/CustomButton';
import { ModeType, ImageConfig, ImageFile, PowerModeType, TimeZoneType } from '../types/common';
import { createEPosterPackage } from '../utils/zipUtils';
import { useTranslation } from 'react-i18next';

// Styled Backdrop - 與 EPDConfigTool 相同的樣式
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

interface ImageSectionProps {
  mode: ModeType;
  config: ImageConfig;
  onConfigChange: (updates: Partial<ImageConfig> | ((prev: ImageConfig) => ImageConfig)) => void;
  sx?: SxProps<Theme>;
  customer: string;
  powerMode: PowerModeType;
  timeZone: TimeZoneType;
}

const ImageSection: React.FC<ImageSectionProps> = ({ 
  mode, 
  config,
  onConfigChange,
  sx,
  customer,
  powerMode,
  timeZone
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>(t('common.status.preparing'));
  const [progress, setProgress] = useState(0);  // 新增 progress 狀態
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImagesChange = useCallback((newImages: ImageFile[] | ((prev: ImageFile[]) => ImageFile[])) => {
    if (typeof newImages === 'function') {
      onConfigChange(prevConfig => ({
        ...prevConfig,
        images: newImages(prevConfig.images)
      }));
    } else {
      onConfigChange({ images: newImages });
    }
  }, [onConfigChange]);

  // src/components/ImageSection.tsx
  const handleDownloadBinary = useCallback(async () => {
    try {
      if (!config.images.length) {
        setError(t('common.error.noImagesSelected'));
        return;
      }
  
      setIsProcessing(true);
      setError(null);
      setProgress(0);
      setProcessingStatus(t('common.status.preparing'));
  
      const configData = {
        Customer: customer,
        Mode: mode,
        PowerMode: powerMode,
        TimeZone: timeZone,
        SoftAP: "0",
        Path: "/sdcard/image/slideshow",
        Size: config.size,
        Rotate: config.rotate.toString(),
        Interval: config.interval.toString(),
        WifiSetting: "",
        ServerURL: "",
        PackageName: "",
        ActivityName: ""
      };
  
      const result = await createEPosterPackage(
        configData, 
        config.images,
        (status, params) => setProcessingStatus(
          t(status, params ? { ...params, interpolation: { escapeValue: false } } : undefined)
        )
      );
  
      // 下載 ZIP 檔案
      const zipUrl = URL.createObjectURL(result.zipBlob);
      const zipLink = document.createElement('a');
      zipLink.href = zipUrl;
      zipLink.download = 'ePoster.zip';
      document.body.appendChild(zipLink);
      zipLink.click();
      document.body.removeChild(zipLink);
      URL.revokeObjectURL(zipUrl);
  
      // 下載 MD5 檔案
      const md5Blob = new Blob([result.md5], { type: 'text/plain' });
      const md5Url = URL.createObjectURL(md5Blob);
      const md5Link = document.createElement('a');
      md5Link.href = md5Url;
      md5Link.download = 'ePoster.zip.md5';
      document.body.appendChild(md5Link);
      md5Link.click();
      document.body.removeChild(md5Link);
      URL.revokeObjectURL(md5Url);
  
      setShowSuccess(true);
  
    } catch (err) {
      console.error('Download failed:', err);
      setError(t('common.error.downloadFailed'));
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
      setProgress(0);
    }
  }, [config, customer, mode, powerMode, timeZone, t]);

  return (
    <>
      <Grid 
        item 
        container 
        alignItems="flex-start" 
        spacing={2}
        sx={sx}
      >
        <Grid item xs={12}>
          <ImageUploader 
            images={config.images}
            setImages={handleImagesChange}
            maxImages={10}
            size={config.size}
            rotate={config.rotate}
          />
        </Grid>
      </Grid>

      {mode === 'nas' && (
        <>
          <Grid item container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <CustomButton 
                onClick={handleDownloadBinary}
                fullWidth
                disabled={isProcessing}
              >
                {t('common.button.downloadBinary')}
              </CustomButton>
            </Grid>
          </Grid>

          <Grid item container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <HintMessage
                type="error"
                message={t('common.hint.downloadBinaryToNAS')}
                typographySx={{ 
                  color: theme.palette.text.primary
                }}
              />
            </Grid>
          </Grid>

          {/* Processing Backdrop */}
          <StyledBackdrop open={isProcessing}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={progress}
                size={80}
                thickness={4}
                sx={{
                  color: 'primary.light',  // 外圈顏色
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="white"
                  sx={{ fontSize: '1rem' }}
                >{`${Math.round(progress)}%`}</Typography>
              </Box>
            </Box>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {processingStatus}
            </Typography>
          </StyledBackdrop>

          {/* Error Snackbar */}
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => setError(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={() => setError(null)}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              {error}
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
              {t('common.success.downloadSuccess')}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

export default ImageSection;
