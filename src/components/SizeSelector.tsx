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
  const { t } = useTranslation();

  // 定義尺寸選項和對應的解析度
  const sizeOptions = [
    { value: '13.3', resolution: '1200x1600' },
    { value: '25.3', resolution: '1800x3200' },
    { value: '28.3', resolution: '2160x3060' },
    { value: '31.5', resolution: '1440x2560' },
  ] as const;

  return (
    <Select
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
