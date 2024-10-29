import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid } from '@mui/material';
import SelectableButton from './common/SelectableButton';
import { OffModeIcon, SleepModeIcon, NormalModeIcon } from './icons/PowerModeIcons';
import { useTranslation } from 'react-i18next';
const PowerModeSelector = ({ value, onChange }) => {
    const { t } = useTranslation();
    return (_jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 4, children: _jsx(SelectableButton, { selected: value === 'off', onClick: () => onChange('off'), icon: _jsx(OffModeIcon, {}), description: t('powerMode.off.description'), children: t('powerMode.off.title') }) }), _jsx(Grid, { item: true, xs: 4, children: _jsx(SelectableButton, { selected: value === 'hibernation', onClick: () => onChange('hibernation'), icon: _jsx(SleepModeIcon, {}), description: t('powerMode.hibernation.description'), children: t('powerMode.hibernation.title') }) }), _jsx(Grid, { item: true, xs: 4, children: _jsx(SelectableButton, { selected: value === 'normal', onClick: () => onChange('normal'), icon: _jsx(NormalModeIcon, {}), description: t('powerMode.normal.description'), children: t('powerMode.normal.title') }) })] }));
};
export default PowerModeSelector;
