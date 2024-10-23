import React from 'react';
import { Grid, Typography, Button, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HintMessage from './HintMessage';
import ImageUploader from './ImageUploader';

interface ImageSectionProps {
  mode: 'auto' | 'nas';
  images: any[];
  setImages: (images: any[]) => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({ mode, images, setImages }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleDownloadBinary = () => {
    console.log('Downloading config...');
  };

  return (
    <>
      <Grid item container alignItems="flex-start" spacing={2}>
        <Grid item xs={2}>
          <Typography align="right">{t('common.label.selectImage')}</Typography>
        </Grid>
        <Grid item xs={10}>
          <ImageUploader images={images} setImages={setImages} />
        </Grid>
      </Grid>

      {mode === 'nas' && (
        <>
          <Grid item container spacing={2}>
            <Grid item xs={2} />
            <Grid item xs={10}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleDownloadBinary}
                sx={{
                  backgroundColor: '#F9A965',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#e89959',
                  }
                }}
              >
                {t('common.button.downloadBinary')}
              </Button>
            </Grid>
          </Grid>

          <Grid item container spacing={0.5}>
            <Grid item xs={2} />
            <Grid item xs={10}>
              <HintMessage
                type="error"
                message={t('common.hint.downloadBinaryToNAS')}
                containerSx={{ mt: 0}}
                typographySx={{ color: theme.palette.text.primary }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ImageSection;
