// src/components/WifiSelector.tsx
import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { WifiType } from '../types/common';
import { useTranslation } from 'react-i18next';

interface WifiSelectorProps {
  value: WifiType;
  onChange: (value: WifiType) => void;
}

const WifiSelector: React.FC<WifiSelectorProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <Select
      variant="outlined"
      fullWidth={true} 
      value={value}
      onChange={(e) => onChange(e.target.value as WifiType)}
    >
      <MenuItem value="open">Open</MenuItem>
      <MenuItem value="wpa2Personal">WPA2 Personal</MenuItem>
      <MenuItem value="staticIP">Static IP</MenuItem>
    </Select>
  );
};

export default WifiSelector;
