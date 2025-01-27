// src/components/IntervalSelector.tsx
import React from 'react';
import { Box, TextField, IconButton, styled } from '@mui/material';
import increaseIcon from '../assets/btn_increase.png';
import decreaseIcon from '../assets/btn_decrease.png';
import HintMessage from './HintMessage';
import theme from '../theme';
import { useTranslation } from 'react-i18next';

const StyledIconButton = styled(IconButton)({
  width: 32,
  height: 32,
  padding: 0,
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    height: 40,
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#b0b0b0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 14px',
  },
});

interface IntervalSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const IntervalSelector: React.FC<IntervalSelectorProps> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
}) => {
  const { t } = useTranslation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <StyledTextField
        value={value}
        onChange={handleInputChange}
        type="number"
        inputProps={{  // 改用 inputProps 而不是 slotProps
          min,
          max,
          style: { textAlign: 'center' }
        }}
        sx={{ width: 100 }}
      />
      <StyledIconButton 
        onClick={() => onChange(Math.max(min, value - 1))} 
        disabled={value <= min} 
        sx={{ ml: 1 }}
      >
        <img src={decreaseIcon} alt="Decrease" width={32} height={32} />
      </StyledIconButton>
      <StyledIconButton 
        onClick={() => onChange(Math.min(max, value + 1))} 
        disabled={value >= max} 
        sx={{ ml: 1 }}
      >
        <img src={increaseIcon} alt="Increase" width={32} height={32} />
      </StyledIconButton>
      <HintMessage
        type="info"
        message={t('common.hint.intervalMin')}
        containerSx={{ ml: 2 }}
        typographySx={{ color: theme.palette.text.secondary }}
      />
    </Box>
  );
};

export default IntervalSelector;
