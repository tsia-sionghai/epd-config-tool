// src/components/icons/ModeIcons.tsx
import React from 'react';
import imgAuto from '../../assets/icons/img_auto.png';
import imgCms from '../../assets/icons/img_cms.png';
import imgNas from '../../assets/icons/img_nas.png';

interface IconProps {
  width?: number;
  height?: number;
}

export const AutoModeIcon: React.FC<IconProps> = ({ width = 62, height = 61 }) => (
  <img
    src={imgAuto}
    alt="Auto Mode"
    style={{ width, height }}
  />
);

export const CMSModeIcon: React.FC<IconProps> = ({ width = 62, height = 61 }) => (
  <img
    src={imgCms}
    alt="CMS Mode"
    style={{ width, height }}
  />
);

export const NASModeIcon: React.FC<IconProps> = ({ width = 62, height = 61 }) => (
  <img
    src={imgNas}
    alt="NAS Mode"
    style={{ width, height }}
  />
);
