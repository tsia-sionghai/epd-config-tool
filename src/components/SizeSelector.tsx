// src/components/SizeSelector.tsx
import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { SizeType } from '../types/common';
import { useTranslation } from 'react-i18next';

interface SizeSelectorProps {
  value: SizeType;
  onChange: (value: SizeType) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ value, onChange }) => {
  useTranslation();

  // 定義尺寸選項和對應的解析度
  const sizeOptions = [
    { value: '13.3', resolution: '1200x1600' },
    { value: '25.3', resolution: '3200x1800' },
    { value: '28.3', resolution: '3060x2160' },
    { value: '31.5', resolution: '2560x1440' },
  ] as const;

  return (
    <Select
      variant="outlined" 
      value={value}
      onChange={(e) => onChange(e.target.value as SizeType)}
    >
      {sizeOptions.map((option) => (
        <MenuItem 
          key={option.value} 
          value={option.value}
          selected={value === option.value}
        >
          {`${option.value}" (${option.resolution})`}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SizeSelector;
