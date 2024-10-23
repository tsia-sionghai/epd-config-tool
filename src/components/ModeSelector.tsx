import React from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const modeOptions = [
    {
      mode: 'auto',
      icon: autoModeIcon,
      title: t('mode.auto.title'),
      description: t('mode.auto.description')
    },
    {
      mode: 'cms',
      icon: cmsModeIcon,
      title: t('mode.cms.title'),
      description: t('mode.cms.description')
    },
    {
      mode: 'nas',
      icon: nasModeIcon,
      title: t('mode.nas.title'),
      description: t('mode.nas.description')
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
