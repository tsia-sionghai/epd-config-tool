import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WifiSelector from './WifiSelector';
import FormField from './common/FormField';
import SelectorField from './common/SelectorField';
const NetworkSettings = ({ mode, config, onConfigChange, serverURL, setServerURL, nasURL, setNasURL, errors = {}, fieldRefs = {}, }) => {
    const { t } = useTranslation();
    if (mode === 'auto')
        return null;
    const handleFieldChange = (field, value) => {
        onConfigChange({ ...config, [field]: value });
    };
    return (_jsx(Paper, { sx: { p: 3, mb: 2 }, children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(Typography, { variant: "h6", children: mode === 'cms' ? t('common.title.cms') : t('common.title.nas') }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(SelectorField, { label: t('common.label.wifiSetting'), children: _jsx(WifiSelector, { value: config.wifi, onChange: (value) => onConfigChange({ ...config, wifi: value }) }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(FormField, { label: t('common.label.ssid'), value: config.ssid, onChange: (value) => handleFieldChange('ssid', value), error: errors.ssid, placeholder: t('common.placeholder.ssid'), inputRef: fieldRefs.ssid }) }), (config.wifi === 'wpa2Personal' || config.wifi === 'staticIP') && (_jsx(Grid, { item: true, xs: 12, children: _jsx(FormField, { label: t('common.label.password'), value: config.password, onChange: (value) => handleFieldChange('password', value), error: errors.password, placeholder: t('common.placeholder.password'), inputRef: fieldRefs.password }) })), config.wifi === 'staticIP' && (_jsxs(_Fragment, { children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(FormField, { label: t('common.label.ip'), value: config.ip, onChange: (value) => handleFieldChange('ip', value), error: errors.ip, placeholder: t('common.placeholder.ip'), inputRef: fieldRefs.ip }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(FormField, { label: t('common.label.netmask'), value: config.netmask, onChange: (value) => handleFieldChange('netmask', value), error: errors.netmask, placeholder: t('common.placeholder.netmask'), inputRef: fieldRefs.netmask }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(FormField, { label: t('common.label.gateway'), value: config.gateway, onChange: (value) => handleFieldChange('gateway', value), error: errors.gateway, placeholder: t('common.placeholder.gateway'), inputRef: fieldRefs.gateway }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(FormField, { label: t('common.label.dns'), value: config.dns, onChange: (value) => handleFieldChange('dns', value), error: errors.dns, placeholder: t('common.placeholder.dns'), inputRef: fieldRefs.dns }) })] })), mode === 'cms' && (_jsx(Grid, { item: true, xs: 12, children: _jsx(FormField, { label: t('common.label.serverURL'), value: serverURL, onChange: setServerURL, error: errors.serverURL, placeholder: t('common.placeholder.serverURL'), inputRef: fieldRefs.serverURL }) }))] }) }));
};
export default NetworkSettings;