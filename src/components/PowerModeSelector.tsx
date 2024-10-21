import React from 'react';
import Grid from '@mui/material/Grid';
import SelectableButton from './SelectableButton';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

interface ModeSelectorProps {
  value: 'normal' | 'hibernation' | 'off';
  onChange: (value: 'normal' | 'hibernation' | 'off') => void;
}

const PowerModeSelector: React.FC<ModeSelectorProps> = ({ value, onChange }) => {
  return (
    <Grid container spacing={2}>
      {[
        {
          mode: 'off',
          icon: <PowerOffIcon />,
          title: 'Off Mode',
          description: '畫面刷新後，機台將會關機。'
        },
        {
          mode: 'hibernation',
          icon: <BedtimeIcon />,
          title: 'Sleep Mode',
          description: '畫面刷新後，機台將會進入睡眠模式。'
        },
        {
          mode: 'normal',
          icon: <AutoFixNormalIcon />,
          title: 'Normal Mode',
          description: '畫面刷新後，機台將會持續醒著。'
        },
      ].map((item) => (
        <Grid item xs={4} key={item.mode}>
          <SelectableButton
            selected={value === item.mode}
            onClick={() => onChange(item.mode as 'normal' | 'hibernation' | 'off')}
            icon={item.icon}
            title={item.title}
            description={item.description}
            sx={{ height: '100%' }}  // 確保每個按鈕填滿 Grid item 的高度
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PowerModeSelector;
