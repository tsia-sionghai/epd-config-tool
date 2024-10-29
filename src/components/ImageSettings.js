import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SizeSelector from './SizeSelector';
import RotateSelector from './RotateSelector';
import IntervalSelector from './IntervalSelector';
import ImageSection from './ImageSection';
import SelectorField from './common/SelectorField';
const ImageSettings = ({ mode, config = {
    size: '13.3',
    rotate: 0,
    interval: 180,
    images: []
}, onConfigChange, }) => {
    const { t } = useTranslation();
    return (_jsx(_Fragment, { children: mode !== 'cms' && (_jsx(Paper, { sx: { p: 3, mb: 2 }, children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(Typography, { variant: "h6", children: mode === 'auto' ? t('common.title.auto') : t('common.title.nasBinary') }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(SelectorField, { label: t('common.label.size'), children: _jsx(SizeSelector, { value: config.size, onChange: (size) => onConfigChange({ size }) }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(SelectorField, { label: t('common.label.rotate'), children: _jsx(RotateSelector, { value: config.rotate, onChange: (rotate) => onConfigChange({ rotate }) }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(SelectorField, { label: t('common.label.interval'), children: _jsx(IntervalSelector, { value: config.interval, onChange: (interval) => onConfigChange({ interval }), min: 180, max: 3600 }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(SelectorField, { label: t('common.label.selectImage'), children: _jsx(ImageSection, { mode: mode, config: config, onConfigChange: onConfigChange }) }) })] }) })) }));
};
export default ImageSettings;
