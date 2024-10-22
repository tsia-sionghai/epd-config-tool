import React from 'react';
import Grid from '@mui/material/Grid';
import SelectableButton from './SelectableButton';

// 導入自定義圖片
import autoModeIcon from '../assets/img_local.png';
import cmsModeIcon from '../assets/img_cms.png';
import nasModeIcon from '../assets/img_nas.png';

interface ModeSelectorProps {
  value: 'auto' | 'cms' | 'nas';
  onChange: (value: 'auto' | 'cms' | 'nas') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ value, onChange }) => {
  const modeOptions = [
    {
      mode: 'auto',
      icon: autoModeIcon,
      title: '單機操作 (離線模式)',
      description: '直接於本機端進行圖片輪播。'
    },
    {
      mode: 'cms',
      icon: cmsModeIcon,
      title: 'CMS控制 (連線模式)',
      description: '透過內容控制系統(CMS)來進行控制及換圖。'
    },
    {
      mode: 'nas',
      icon: nasModeIcon,
      title: 'NAS (連線模式)',
      description: '透過NAS進行換圖。'
    }
  ];

  return (
    <Grid container spacing={2}>
      {modeOptions.map((item) => (
        <Grid item xs={4} key={item.mode}>
          <SelectableButton
            selected={value === item.mode}
            onClick={() => onChange(item.mode)}
            icon={<img src={item.icon} alt={item.title} style={{ width: 48, height: 48 }} />}
            title={item.title}
            description={item.description}
            sx={{ height: '100%' }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ModeSelector;
