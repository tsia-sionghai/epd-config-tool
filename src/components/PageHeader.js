import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Box, Typography, styled } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import settingsIcon from '../assets/img_set.png';
const BrowserNote = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.primary.dark,
}));
const StyledAlert = styled(Alert)(({ theme }) => ({
    padding: 0,
    backgroundColor: 'transparent',
    alignItems: 'flex-start', // 改善對齊
    '& .MuiAlert-icon': {
        padding: 0,
        marginRight: '4px',
        marginTop: '3px', // 微調圖示垂直位置
        '& svg': {
            width: 18,
            height: 18,
        }
    },
    '& .MuiAlert-message': {
        padding: 0,
    }
}));
const PageHeader = () => {
    const { t } = useTranslation();
    return (_jsx(Box, { display: "flex", justifyContent: "center", alignItems: "center", mb: 2, children: _jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx("img", { src: settingsIcon, alt: "Settings", style: {
                        marginRight: '8px',
                        width: '80px',
                        height: '80px'
                    } }), _jsxs(Box, { children: [_jsx(Typography, { variant: "h6", component: "h6", sx: { mb: 0, fontWeight: 'bold' }, children: t('common.title.main') }), _jsx(StyledAlert, { severity: "info", children: _jsx(BrowserNote, { children: _jsx(Trans, { i18nKey: "common.note.browserSupport", components: {
                                        1: _jsx("strong", {}, "chrome"),
                                    } }) }) })] })] }) }));
};
export default PageHeader;
