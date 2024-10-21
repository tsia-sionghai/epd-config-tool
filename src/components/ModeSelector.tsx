import React from 'react';
import Grid from '@mui/material/Grid';
import SelectableButton from './SelectableButton';
import ComputerIcon from '@mui/icons-material/Computer';
import LanguageIcon from '@mui/icons-material/Language';
import StorageIcon from '@mui/icons-material/Storage';

interface ModeSelectorProps {
  value: 'auto' | 'cms' | 'nas';
  onChange: (value: 'auto' | 'cms' | 'nas') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ value, onChange }) => {
  return (
    <Grid container spacing={2}>
      {[
        {
          mode: 'auto',
          icon: <ComputerIcon />,
          title: '單機操作 (離線模式)',
          description: '直接於本機端進行圖片輪播。'
        },
        {
          mode: 'cms',
          icon: <LanguageIcon />,
          title: 'CMS控制 (連線模式)',
          description: '透過內容控制系統(CMS)來進行控制及換圖。'
        },
        {
          mode: 'nas',
          icon: <StorageIcon />,
          title: 'NAS (連線模式)',
          description: '透過NAS進行換圖。'
        }
      ].map((item) => (
        <Grid item xs={4} key={item.mode}>
          <SelectableButton
            selected={value === item.mode}
            onClick={() => onChange(item.mode as 'auto' | 'cms' | 'nas')}
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

export default ModeSelector;
