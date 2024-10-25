// src/components/icons/PowerModeIcons.tsx
import React from 'react';
import imgPowerOff from '../../assets/icons/img_power_off.png';
import imgPowerSleep from '../../assets/icons/img_power_sleep.png';
import imgPowerNormal from '../../assets/icons/img_power_normal.png';

interface IconProps {
  width?: number;
  height?: number;
}

export const OffModeIcon: React.FC<IconProps> = ({ width = 62, height = 61 }) => (
  <img
    src={imgPowerOff}
    alt="Off Mode"
    style={{ width, height }}
  />
);

export const SleepModeIcon: React.FC<IconProps> = ({ width = 62, height = 61 }) => (
  <img
    src={imgPowerSleep}
    alt="Sleep Mode"
    style={{ width, height }}
  />
);

export const NormalModeIcon: React.FC<IconProps> = ({ width = 62, height = 61 }) => (
  <img
    src={imgPowerNormal}
    alt="Normal Mode"
    style={{ width, height }}
  />
);
