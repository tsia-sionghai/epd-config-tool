// src/components/PowerModeSelector.tsx
import React from 'react';
import { Grid } from '@mui/material';
import SelectableButton from './common/SelectableButton';
import { PowerModeType } from '../types/common';
import { 
  OffModeIcon, 
  SleepModeIcon, 
  NormalModeIcon 
} from './icons/PowerModeIcons';
import { useTranslation } from 'react-i18next';

interface PowerModeSelectorProps {
  value: PowerModeType;
  onChange: (value: PowerModeType) => void;
}

const PowerModeSelector: React.FC<PowerModeSelectorProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'off'}
          onClick={() => onChange('off')}
          icon={<OffModeIcon />}
          description={t('powerMode.off.description')}
        >
          {t('powerMode.off.title')}
        </SelectableButton>
      </Grid>
      
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'hibernation'}
          onClick={() => onChange('hibernation')}
          icon={<SleepModeIcon />}
          description={t('powerMode.hibernation.description')}
        >
          {t('powerMode.hibernation.title')}
        </SelectableButton>
      </Grid>
      
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'normal'}
          onClick={() => onChange('normal')}
          icon={<NormalModeIcon />}
          description={t('powerMode.normal.description')}
        >
          {t('powerMode.normal.title')}
        </SelectableButton>
      </Grid>
    </Grid>
  );
};

export default PowerModeSelector;
