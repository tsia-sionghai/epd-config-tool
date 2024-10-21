import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

interface RotateSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const RotateSelector: React.FC<RotateSelectorProps> = ({ value, onChange }) => (
  <ToggleButtonGroup
    value={value}
    exclusive
    onChange={(_, newValue) => onChange(newValue)}
    aria-label="rotate"
  >
    {[0, 90, 180, 270].map((degree) => (
      <ToggleButton key={degree} value={degree} aria-label={`${degree} degrees`}>
        {degree}°
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
);

export default RotateSelector;
