import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, TextField, Typography, FormHelperText } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { styled } from '@mui/material/styles';
import { colors } from '../../theme';
const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        height: '40px', // 固定輸入欄位高度
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
            padding: '8px 12px', // 調整輸入框內距
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
    alignItems: 'center', // 垂直置中
    justifyContent: 'flex-end', // 靠右對齊
    height: '40px', // 與輸入欄位同高
    paddingRight: '24px', // 增加右側間距
});
// 改進 Label 樣式
const LabelText = styled(Typography)({
    lineHeight: '40px', // 確保文字垂直置中
    whiteSpace: 'nowrap', // 防止文字換行
});
const FormField = ({ label, value, onChange, error, placeholder, inputRef }) => {
    return (_jsxs(Grid, { container: true, alignItems: "flex-start", spacing: 0, children: ["  ", _jsx(LabelContainer, { item: true, xs: 2, children: _jsx(LabelText, { children: label }) }), _jsxs(Grid, { item: true, xs: 9, children: ["  ", _jsx(StyledTextField, { fullWidth: true, value: value, onChange: (e) => onChange(e.target.value), error: Boolean(error), placeholder: placeholder, inputRef: inputRef, variant: "outlined", size: "small" }), error && (_jsxs(ErrorMessage, { children: [_jsx(ErrorIcon, { fontSize: "small" }), _jsx(FormHelperText, { error: true, children: error })] }))] })] }));
};
export default FormField;
