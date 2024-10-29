import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Select, MenuItem, FormControl, InputLabel, Alert, } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../theme';
// 使用自定義樣式的卡片
const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    boxShadow: 'none',
    border: `1px solid ${colors.lightGray}`,
}));
// 自定義標題區域
const HeaderSection = styled(Box)(({ theme }) => ({
    backgroundColor: colors.purple20,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
}));
const FormExample = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        type: '',
        hasError: false,
    });
    return (_jsxs(Box, { sx: { maxWidth: 600, mx: 'auto', p: 3 }, children: [_jsxs(HeaderSection, { children: [_jsx(Typography, { variant: "h6", color: "primary", children: "\u7CFB\u7D71\u8A2D\u5B9A" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "\u8ACB\u586B\u5BEB\u4EE5\u4E0B\u8CC7\u6599\u4EE5\u5B8C\u6210\u8A2D\u5B9A" })] }), _jsx(StyledCard, { children: _jsx(CardContent, { children: _jsxs(Box, { component: "form", sx: { display: 'flex', flexDirection: 'column', gap: 3 }, children: [_jsx(TextField, { variant: "outlined", fullWidth: true, label: "\u4F7F\u7528\u8005\u540D\u7A31", value: formState.username, onChange: (e) => setFormState({ ...formState, username: e.target.value }) }), _jsx(TextField, { variant: "outlined", fullWidth: true, label: "\u96FB\u5B50\u90F5\u4EF6", error: formState.hasError, helperText: formState.hasError ? "請輸入有效的電子郵件地址" : "", value: formState.email, onChange: (e) => setFormState({ ...formState, email: e.target.value }) }), _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "\u985E\u578B" }), _jsxs(Select, { variant: "outlined", fullWidth: true, value: formState.type, label: "\u985E\u578B", onChange: (e) => setFormState({ ...formState, type: e.target.value }), children: [_jsx(MenuItem, { value: "type1", children: "\u985E\u578B\u4E00" }), _jsx(MenuItem, { value: "type2", children: "\u985E\u578B\u4E8C" }), _jsx(MenuItem, { value: "type3", children: "\u985E\u578B\u4E09" })] })] }), _jsxs(Box, { sx: { display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }, children: [_jsx(Button, { variant: "outlined", sx: {
                                            color: colors.darkGray,
                                            borderColor: colors.darkGray,
                                            '&:hover': {
                                                borderColor: colors.black,
                                                backgroundColor: 'transparent',
                                            },
                                        }, children: "\u53D6\u6D88" }), _jsx(Button, { variant: "contained", sx: {
                                            backgroundColor: colors.primaryPurple,
                                            '&:hover': {
                                                backgroundColor: colors.brightPurple,
                                            },
                                        }, children: "\u78BA\u8A8D" })] })] }) }) }), _jsx(Box, { sx: { mt: 2 }, children: _jsx(Alert, { severity: "error", sx: { backgroundColor: colors.red20, color: colors.red }, children: "\u9019\u662F\u4E00\u500B\u932F\u8AA4\u63D0\u793A\u8A0A\u606F" }) }), _jsxs(Box, { sx: { mt: 3 }, children: [_jsx(Typography, { variant: "subtitle1", color: "text.secondary", children: "\u6A19\u984C\u6587\u5B57 (subtitle1)" }), _jsx(Typography, { variant: "body1", children: "\u4E00\u822C\u5167\u6587 (body1)\uFF0C\u5C55\u793A\u9810\u8A2D\u7684\u6587\u5B57\u6A23\u5F0F\u3002" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "\u6B21\u8981\u5167\u6587 (body2)\uFF0C\u7528\u65BC\u88DC\u5145\u8AAA\u660E\u6216\u9644\u8A3B\u3002" })] })] }));
};
export default FormExample;
