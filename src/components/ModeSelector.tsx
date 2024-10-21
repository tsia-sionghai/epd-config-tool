import React from 'react';
import Grid from '@mui/material/Grid';
import SelectableButton from './SelectableButton';
import ComputerIcon from '@mui/icons-material/Computer';
import LanguageIcon from '@mui/icons-material/Language';

interface ModeSelectorProps {
  value: 'offline' | 'online';
  onChange: (value: 'offline' | 'online') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ value, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <SelectableButton
          selected={value === 'offline'}
          onClick={() => onChange('offline')}
          icon={<ComputerIcon sx={{ fontSize: 40, color: '#4B5563' }} />}
          title="單機操作 (離線模式)"
          description="直接於本機端進行圖片輪播。"
        />
      </Grid>
      <Grid item xs={6}>
        <SelectableButton
          selected={value === 'online'}
          onClick={() => onChange('online')}
          icon={<LanguageIcon sx={{ fontSize: 40, color: '#4B5563' }} />}
          title="CMS控制 (連線模式)"
          description="透過內容控制系統(CMS)來進行控制及換圖。"
        />
      </Grid>
    </Grid>
  );
};

export default ModeSelector;
