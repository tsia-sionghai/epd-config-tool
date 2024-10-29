import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/ImageSection.tsx
import { useCallback } from 'react';
import { Grid, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HintMessage from './HintMessage';
import ImageUploader from './ImageUploader';
import CustomButton from './common/CustomButton';
const ImageSection = ({ mode, config, onConfigChange, sx }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const handleImagesChange = useCallback((newImages) => {
        if (typeof newImages === 'function') {
            onConfigChange(prevConfig => ({
                ...prevConfig,
                images: newImages(prevConfig.images)
            }));
        }
        else {
            onConfigChange({ images: newImages });
        }
    }, [onConfigChange]);
    const handleDownloadBinary = useCallback(() => {
        console.log('Downloading binary...');
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Grid, { item: true, container: true, alignItems: "flex-start", spacing: 2, sx: sx, children: _jsx(Grid, { item: true, xs: 12, children: _jsx(ImageUploader, { images: config.images, setImages: handleImagesChange, maxImages: 10, size: config.size, rotate: config.rotate }) }) }), mode === 'nas' && (_jsxs(_Fragment, { children: [_jsxs(Grid, { item: true, container: true, spacing: 2, sx: { mt: 2 }, children: [_jsx(Grid, { item: true, xs: 2 }), _jsx(Grid, { item: true, xs: 10, children: _jsx(CustomButton, { onClick: handleDownloadBinary, fullWidth: true, children: t('common.button.downloadBinary') }) })] }), _jsxs(Grid, { item: true, container: true, spacing: 2, sx: { mt: 1 }, children: [_jsx(Grid, { item: true, xs: 2 }), _jsx(Grid, { item: true, xs: 10, children: _jsx(HintMessage, { type: "error", message: t('common.hint.downloadBinaryToNAS'), typographySx: {
                                        color: theme.palette.text.primary
                                    } }) })] })] }))] }));
};
export default ImageSection;
