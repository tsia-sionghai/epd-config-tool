import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Paper, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ModeSelector from './ModeSelector';
import PowerModeSelector from './PowerModeSelector';
import TimeZoneSelector from './TimeZoneSelector';
import FormField from './common/FormField';
import SelectorField from './common/SelectorField';
const BasicSettings = ({ customer, setCustomer, customerError, mode, setMode, powerMode, setPowerMode, timeZone, setTimeZone, }) => {
    const { t } = useTranslation();
    return (_jsx(Paper, { sx: { p: 3, mb: 2 }, children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(Typography, { variant: "h6", children: t('common.title.basic') }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(FormField, { label: t('common.label.customer'), value: customer, onChange: setCustomer, error: customerError, placeholder: t('common.placeholder.enterCustomer') }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(SelectorField, { label: t('common.label.mode'), children: _jsx(ModeSelector, { value: mode, onChange: setMode, disabledModes: ['nas'] }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(SelectorField, { label: t('common.label.powerMode'), children: _jsx(PowerModeSelector, { value: powerMode, onChange: setPowerMode }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(SelectorField, { label: t('common.label.timeZone'), children: _jsx(TimeZoneSelector, { value: timeZone, onChange: setTimeZone }) }) })] }) }));
};
export default BasicSettings;
