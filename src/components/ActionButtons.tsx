// src/components/ActionButtons.tsx
import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomButton from './common/CustomButton';
import { ModeType } from '../types/common';

interface ActionButtonsProps {
  mode: ModeType;
  onGenerateConfig: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  mode,
  onGenerateConfig,
}) => {
  const { t } = useTranslation();

  return (
    <Grid item xs={12}>
      <Box display="flex" alignItems="center">
        <CustomButton onClick={onGenerateConfig}>
          {t('common.button.generateConfig')}
        </CustomButton>
      </Box>
    </Grid>
  );
};

export default ActionButtons;
