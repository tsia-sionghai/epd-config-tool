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

interface PowerModeSelectorProps {
  value: PowerModeType;
  onChange: (value: PowerModeType) => void;
}

const PowerModeSelector: React.FC<PowerModeSelectorProps> = ({ value, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'off'}
          onClick={() => onChange('off')}
          icon={<OffModeIcon />}
          description="畫面刷新後，機台將會關機。"
        >
          Off Mode
        </SelectableButton>
      </Grid>
      
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'hibernation'}
          onClick={() => onChange('hibernation')}
          icon={<SleepModeIcon />}
          description="畫面刷新後，機台將會進入睡眠模式。"
        >
          Sleep Mode
        </SelectableButton>
      </Grid>
      
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'normal'}
          onClick={() => onChange('normal')}
          icon={<NormalModeIcon />}
          description="畫面刷新後，機台將會持續醒著。"
        >
          Normal Mode
        </SelectableButton>
      </Grid>
    </Grid>
  );
};

export default PowerModeSelector;
