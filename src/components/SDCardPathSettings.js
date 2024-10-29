import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Grid, TextField, Button, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HintMessage from './HintMessage';
import { checkSDCardEmpty } from '../utils/fileSystem';
const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        backgroundColor: 'transparent',
        padding: '8px 12px',
        minWidth: '20px',
        width: 'fit-content',
        height: '40px',
        borderRadius: '20px',
        border: `1px solid ${theme.palette.grey[500]}`, // 使用 darkGray (#A2ABB3)
        '&::before': {
            display: 'none',
        },
        '&::after': {
            display: 'none',
        },
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
        },
        '&.Mui-disabled': {
            border: `1px solid ${theme.palette.grey[500]}`, // disabled 狀態下的 border 顏色
        },
    },
    '& .MuiInputBase-input': {
        padding: 0,
        height: '40px',
        color: theme.palette.text.primary,
        '&.Mui-disabled': {
            WebkitTextFillColor: theme.palette.text.primary,
            color: theme.palette.text.primary,
            cursor: 'default',
        },
    },
}));
const LabelWrapper = styled('span')({
    whiteSpace: 'nowrap', // 防止 SD Card Path 文字斷行
});
const PathSelectionContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2), // 16px 下方邊距
}));
const SDCardPathSettings = ({ sdCardPath, setSdCardPath, onDirectorySelect, disabled = false, onError, }) => {
    const { t } = useTranslation();
    const handleSelectPath = async () => {
        try {
            if ('showDirectoryPicker' in window) {
                const dirHandle = await window.showDirectoryPicker({
                    mode: 'readwrite',
                });
                // 檢查目錄是否為空
                const isEmpty = await checkSDCardEmpty(dirHandle, true);
                if (!isEmpty) {
                    onError?.(t('common.error.sdCardNotEmpty'));
                    return;
                }
                setSdCardPath(dirHandle.name);
                onDirectorySelect(dirHandle);
            }
            else {
                onError?.(t('common.error.browserNotSupported'));
            }
        }
        catch (err) {
            console.error('Error selecting directory:', err);
        }
    };
    return (_jsx(PathSelectionContainer, { sx: { pt: 2, pl: 1, pr: 1 }, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, children: _jsxs(Box, { sx: {
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 2,
                        }, children: [_jsx(LabelWrapper, { children: t('common.label.sdCardPath') }), _jsx(StyledTextField, { variant: "standard", value: sdCardPath, disabled: true }), _jsx(Button, { variant: "basic", onClick: handleSelectPath, disabled: disabled, sx: {
                                    minWidth: 'auto',
                                    textWrap: 'nowrap',
                                }, children: t('common.button.selectPath') })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(HintMessage, { type: "error", message: t('common.hint.sdCardPathCheck'), typographySx: { color: 'text.primary' } }) })] }) }));
};
export default SDCardPathSettings;
