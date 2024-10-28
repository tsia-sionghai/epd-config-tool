// src/components/ActionButtons.tsx
import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomButton from './common/CustomButton';
import { ModeType } from '../types/common';

interface ActionButtonsProps {
  mode: ModeType;
  onGenerateConfig: () => void;
  disabled?: boolean;  // 新增 disabled 屬性
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  mode,
  onGenerateConfig,
  disabled = false,  // 設定預設值
}) => {
  const { t } = useTranslation();

  return (
    <Grid item xs={12}>
      <Box display="flex" alignItems="center">
        <CustomButton 
          onClick={onGenerateConfig}
          disabled={disabled}  // 將 disabled 屬性傳給 CustomButton
        >
          {t('common.button.generateConfig')}
        </CustomButton>
      </Box>
    </Grid>
  );
};

export default ActionButtons;
