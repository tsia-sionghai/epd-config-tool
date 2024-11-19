// src/components/common/FormField.tsx
import React from 'react';
import { 
  Grid, 
  TextField, 
  Typography,
  FormHelperText 
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { styled } from '@mui/material/styles';
import { colors } from '../../theme';

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    height: '40px',  // 固定輸入欄位高度
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
      padding: '8px 12px',  // 調整輸入框內距
    }
  },
}));

const ErrorMessage = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: colors.red,
  marginTop: theme.spacing(0.5),
}));

// 重新設計 Label 容器
const LabelContainer = styled(Grid)({
  display: 'flex',
  alignItems: 'center',  // 垂直置中
  justifyContent: 'flex-end',  // 靠右對齊
  height: '40px',  // 與輸入欄位同高
  paddingRight: '24px',  // 增加右側間距
});

// 改進 Label 樣式
const LabelText = styled(Typography)({
  lineHeight: '40px',  // 確保文字垂直置中
  whiteSpace: 'nowrap',  // 防止文字換行
});

export interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  type?: string;  // 加入 type prop 支援
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  inputRef
}) => {
  return (
    <Grid container alignItems="flex-start" spacing={0}>  {/* 移除間距，使用固定padding */}
      <LabelContainer item xs={2}>
        <LabelText>{label}</LabelText>
      </LabelContainer>
      <Grid item xs={9}>  {/* 使用 padding 控制間距 */}
        <StyledTextField
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          error={Boolean(error)}
          placeholder={placeholder}
          inputRef={inputRef}
          variant="outlined"
          size="small"
        />
        {error && (
          <ErrorMessage>
            <ErrorIcon fontSize="small" />
            <FormHelperText error>{error}</FormHelperText>
          </ErrorMessage>
        )}
      </Grid>
    </Grid>
  );
};

export default FormField;
