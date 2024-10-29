// src/components/ModeSelector.tsx
import React from 'react';
import { Grid, Tooltip } from '@mui/material';
import SelectableButton from './common/SelectableButton';
import { ModeType } from '../types/common';
import { 
  AutoModeIcon, 
  CMSModeIcon, 
  NASModeIcon 
} from './icons/ModeIcons';
import { useTranslation } from 'react-i18next';

interface ModeSelectorProps {
  value: ModeType;
  onChange: (value: ModeType) => void;
  disabledModes?: ModeType[];  // 新增禁用模式的陣列
}

// src/components/ModeSelector.tsx
const ModeSelector: React.FC<ModeSelectorProps> = ({ 
  value, 
  onChange, 
  disabledModes = [], 
}) => {
  const { t } = useTranslation();
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'auto'}
          onClick={() => onChange('auto')}
          icon={<AutoModeIcon />}
          description={t('mode.auto.description')}
          disabled={disabledModes.includes('auto')}
        >
          {t('mode.auto.title')}
        </SelectableButton>
      </Grid>
      
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'cms'}
          onClick={() => onChange('cms')}
          icon={<CMSModeIcon />}
          description={t('mode.cms.description')}
          disabled={disabledModes.includes('cms')}
        >
          {t('mode.cms.title')}
        </SelectableButton>
      </Grid>
      
      <Grid item xs={4}>
        <Tooltip 
          title={t('common.tooltip.nasNotAvailable')}
          placement="top"
          arrow
        >
          <span>
            <SelectableButton
              selected={value === 'nas'}
              onClick={() => onChange('nas')}
              icon={<NASModeIcon />}
              description={t('mode.nas.description')}
              disabled={disabledModes.includes('nas')}
            >
              {t('mode.nas.title')}
            </SelectableButton>
          </span>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default ModeSelector;
