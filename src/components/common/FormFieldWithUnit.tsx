// src/components/common/FormFieldWithUnit.tsx
import React from 'react';
import { 
  Grid, 
  TextField, 
  Typography,
  FormHelperText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../theme';
import hintIcon from '../../assets/ic_hint.png';

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'width',
})<{ width?: number | string }>(({ width }) => ({
  width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : '100%',
  '& .MuiOutlinedInput-root': {
    height: '40px',
    '&.Mui-error': {
      backgroundColor: colors.red20,
      '& fieldset': {
        borderColor: colors.red,
      },
      '&:hover fieldset': {
        borderColor: colors.red,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.red,
      },
    },
    '& input': {
      padding: '8px 12px',
    }
  },
}));

const LabelContainer = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '40px',
  paddingRight: '24px',
});

const LabelText = styled(Typography)({
  lineHeight: '40px',
  whiteSpace: 'nowrap',
});

const UnitContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginLeft: '8px',
});

const HintText = styled(Typography)({
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: colors.darkGray,
});

const HintIcon = styled('img')({
  width: '16px',
  height: '16px',
});

interface FormFieldWithUnitProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  unit: string;
  hintMessage?: string;
  maxValue?: number;
  minValue?: number;
  width?: number | string;
}

const FormFieldWithUnit: React.FC<FormFieldWithUnitProps> = ({
  label,
  value,
  onChange,
  error,
  unit,
  hintMessage,
  maxValue,
  minValue,
  width
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // 只允許數字輸入
    if (newValue === '' || /^\d+$/.test(newValue)) {
      const numValue = Number(newValue);
      if (
        (maxValue === undefined || numValue <= maxValue) &&
        (minValue === undefined || numValue >= minValue)
      ) {
        onChange(newValue);
      }
    }
  };

  return (
    <Grid container alignItems="flex-start" spacing={0}>
      <LabelContainer item xs={2}>
        <LabelText>{label}</LabelText>
      </LabelContainer>
      <Grid item xs={10}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledTextField
            width={width}
            value={value}
            onChange={handleChange}
            error={Boolean(error)}
            variant="outlined"
            size="small"
            type="text"
            slotProps={{
              htmlInput: {
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }
            }}
          />
          <UnitContainer>
            <Typography>{unit}</Typography>
            {hintMessage && (
              <HintText>
                <HintIcon src={hintIcon} alt="hint" />
                {hintMessage}
              </HintText>
            )}
          </UnitContainer>
        </div>
        {error && (
          <FormHelperText error>{error}</FormHelperText>
        )}
      </Grid>
    </Grid>
  );
};

export default FormFieldWithUnit;
