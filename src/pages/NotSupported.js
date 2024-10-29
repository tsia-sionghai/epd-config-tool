import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
const BrowserNotSupported = () => {
    const { t } = useTranslation();
    return (_jsxs(Box, { sx: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: 3,
            p: 3,
        }, children: [_jsx(Typography, { variant: "h4", component: "h1", color: "primary.dark", children: t('common.error.browserNotSupportedTitle') }), _jsx(Typography, { color: "text.primary", children: t('common.error.browserNotSupportedDesc') }), _jsxs(Box, { sx: { display: 'flex', gap: 2 }, children: [_jsx(Button, { variant: "contained", href: "https://www.google.com/chrome", target: "_blank", rel: "noopener noreferrer", children: t('common.button.downloadChrome') }), _jsx(Button, { variant: "contained", href: "https://www.microsoft.com/edge", target: "_blank", rel: "noopener noreferrer", children: t('common.button.downloadEdge') })] })] }));
};
export default BrowserNotSupported;
