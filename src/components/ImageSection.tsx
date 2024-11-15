// src/components/ImageSection.tsx
import React, { useCallback, useMemo, useState } from 'react';
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
import FileHandler from './dialogs/FileHandler';
import { useTranslation } from 'react-i18next';
import { createEPosterPackage } from '../utils/zipUtils';

// Styled Backdrop - 保持原有樣式
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
  const [progress, setProgress] = useState(0);
  const [showFileHandler, setShowFileHandler] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [preparedData, setPreparedData] = useState<{ zipBlob: Blob; md5sum: string } | null>(null);
  // const [downloadData, setDownloadData] = useState<{ zipBlob: Blob; md5sum: string } | null>(null);

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

  const configData = useMemo(() => ({
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
  }), [customer, mode, powerMode, timeZone, config.size, config.rotate, config.interval]);

  const handleDownload = useCallback(async (overwrite = false) => {
    try {
      if (!config.images.length) {
        setError(t('common.error.noImagesSelected'));
        return;
      }

      // 如果已經有準備好的資料且要覆蓋
      if (overwrite && preparedData) {
        console.log('使用已準備的資料進行儲存');
        try {
          const zipHandle = await window.showSaveFilePicker({
            suggestedName: 'ePoster.zip',
            types: [{
              description: 'ZIP files',
              accept: { 'application/zip': ['.zip'] }
            }]
          });

          const writable = await zipHandle.createWritable();
          await writable.write(preparedData.zipBlob);
          await writable.close();

          if (preparedData.md5sum) {
            const md5Handle = await window.showSaveFilePicker({
              suggestedName: 'ePoster.zip.md5',
              types: [{
                description: 'MD5 files',
                accept: { 'text/plain': ['.md5'] }
              }]
            });

            const md5Writable = await md5Handle.createWritable();
            await md5Writable.write(preparedData.md5sum);
            await md5Writable.close();
          }

          setShowSuccess(true);
          setPreparedData(null);
          return;
        } catch (e) {
          if (e.name === 'AbortError') {
            return;
          }
          throw e;
        }
      }

      // 如果是第一次點擊下載
      if (!overwrite) {
        setIsProcessing(true);
        setError(null);
        setProgress(0);
        setProcessingStatus(t('common.status.preparing'));

        const result = await createEPosterPackage(
          configData, 
          config.images,
          (status, params) => setProcessingStatus(
            t(status, params ? { ...params, interpolation: { escapeValue: false } } : undefined)
          )
        );

        setPreparedData(result);
        setShowFileHandler(true);
        setIsProcessing(false);
        return;
      }

    } catch (err) {
      console.error('下載失敗:', err);
      setError(t('common.error.downloadFailed'));
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
      setProgress(0);
    }
  }, [config.images, configData, t, preparedData]);

  const handleOverwrite = useCallback(() => {
    setShowFileHandler(false);
    handleDownload(true);
  }, [handleDownload]);

  const handleCancel = useCallback(() => {
    setShowFileHandler(false);
    setPreparedData(null);
  }, []);

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
                onClick={() => handleDownload(false)}
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
                  color: 'primary.light',
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

          <FileHandler 
            isOpen={showFileHandler}
            onOverwrite={handleOverwrite}
            onCancel={handleCancel}
          />

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
