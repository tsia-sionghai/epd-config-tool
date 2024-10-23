import React from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import SelectableButton from './SelectableButton';

// 導入自定義圖片
import offPwerModeIcon from '../assets/img_poweroff.png';
import sleepPowerModeIcon from '../assets/img_sleep.png';
import normalPowerModeIcon from '../assets/img_wake.png';

interface ModeSelectorProps {
  value: 'normal' | 'hibernation' | 'off';
  onChange: (value: 'normal' | 'hibernation' | 'off') => void;
}

const PowerModeSelector: React.FC<ModeSelectorProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const modeOptions = [
    {
      mode: 'off',
      icon: offPwerModeIcon,
      title: t('powerMode.off.title'),
      description: t('powerMode.off.description')
    },
    {
      mode: 'hibernation',
      icon: sleepPowerModeIcon,
      title: t('powerMode.hibernation.title'),
      description: t('powerMode.hibernation.description')
    },
    {
      mode: 'normal',
      icon: normalPowerModeIcon,
      title: t('powerMode.normal.title'),
      description: t('powerMode.normal.description')
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

export default PowerModeSelector;
