// src/components/UpdateIntervalField.tsx
import React from 'react';
import { TextField, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface UpdateIntervalFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const UpdateIntervalField: React.FC<UpdateIntervalFieldProps> = ({
  value,
  onChange,
  error,
  disabled,
  inputRef
}) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // 只允許數字輸入
    if (newValue === '' || /^\d{0,4}$/.test(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <TextField
        value={value}
        onChange={handleChange}
        error={!!error}
        helperText={error}
        disabled={disabled}
        inputRef={inputRef}
        type="text"
        placeholder={t('common.placeholder.serverSyncInterval')}
        inputProps={{
          min: 5,
          max: 1440,
          'aria-label': t('common.label.serverSyncInterval')
        }}
        sx={{ width: 200 }}
      />
      <Box sx={{ 
        color: error ? 'error.main' : 'text.secondary',
        minWidth: '50px'
      }}>
        {t('common.unit.minutes')}
      </Box>
    </Box>
  );
};

export default UpdateIntervalField;
