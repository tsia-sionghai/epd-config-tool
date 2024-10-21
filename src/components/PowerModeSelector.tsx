import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

interface PowerModeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const PowerModeSelector: React.FC<PowerModeSelectorProps> = ({ value, onChange }) => (
  <ToggleButtonGroup
    value={value}
    exclusive
    onChange={(_, newValue) => onChange(newValue)}
    aria-label="power mode"
  >
    <ToggleButton value="off" aria-label="off mode">
      Off Mode
    </ToggleButton>
    <ToggleButton value="sleep" aria-label="sleep mode">
      Sleep Mode
    </ToggleButton>
    <ToggleButton value="normal" aria-label="normal mode">
      Normal Mode
    </ToggleButton>
  </ToggleButtonGroup>
);

export default PowerModeSelector;
