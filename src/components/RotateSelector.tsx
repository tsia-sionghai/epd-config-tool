import React from 'react';
import { Button, Box, styled } from '@mui/material';

interface RotateSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const RotateButton = styled(Button)(({ theme, selected }) => ({
  minWidth: '60px',
  height: '40px',
  borderRadius: '18px',
  padding: '6px 16px',
  margin: '0 4px',
  backgroundColor: selected ? theme.palette.action.selected : theme.palette.background.paper,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: selected ? theme.palette.action.selected : theme.palette.action.hover,
  },
  border: `1px solid ${theme.palette.divider}`,
}));

const RotateSelector: React.FC<RotateSelectorProps> = ({ value, onChange }) => (
  <Box display="flex" justifyContent="flex-start">
    {[0, 90, 180, 270].map((degree) => (
      <RotateButton
        key={degree}
        onClick={() => onChange(degree)}
        selected={value === degree}
        variant="outlined"
      >
        {degree}°
      </RotateButton>
    ))}
  </Box>
);

export default RotateSelector;