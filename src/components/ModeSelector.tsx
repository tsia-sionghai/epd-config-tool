// src/components/ModeSelector.tsx
import React from 'react';
import { Grid } from '@mui/material';
import SelectableButton from './common/SelectableButton';
import { ModeType } from '../types/common';
import { 
  AutoModeIcon, 
  CMSModeIcon, 
  NASModeIcon 
} from './icons/ModeIcons';

interface ModeSelectorProps {
  value: ModeType;
  onChange: (value: ModeType) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ value, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'auto'}
          onClick={() => onChange('auto')}
          icon={<AutoModeIcon />}
          description="直接於本機端進行圖片輪播。"
        >
          單機操作 (離線模式)
        </SelectableButton>
      </Grid>
      
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'cms'}
          onClick={() => onChange('cms')}
          icon={<CMSModeIcon />}
          description="透過內容控制系統(CMS)來進行控制及換圖。"
        >
          CMS控制 (連線模式)
        </SelectableButton>
      </Grid>
      
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'nas'}
          onClick={() => onChange('nas')}
          icon={<NASModeIcon />}
          description="透過NAS進行換圖。"
        >
          NAS (連線模式)
        </SelectableButton>
      </Grid>
    </Grid>
  );
};

export default ModeSelector;
