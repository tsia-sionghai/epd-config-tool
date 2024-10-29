import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, Tooltip } from '@mui/material';
import SelectableButton from './common/SelectableButton';
import { AutoModeIcon, CMSModeIcon, NASModeIcon } from './icons/ModeIcons';
import { useTranslation } from 'react-i18next';
// src/components/ModeSelector.tsx
const ModeSelector = ({ value, onChange, disabledModes = [], }) => {
    const { t } = useTranslation();
    return (_jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 4, children: _jsx(SelectableButton, { selected: value === 'auto', onClick: () => onChange('auto'), icon: _jsx(AutoModeIcon, {}), description: t('mode.auto.description'), disabled: disabledModes.includes('auto'), children: t('mode.auto.title') }) }), _jsx(Grid, { item: true, xs: 4, children: _jsx(SelectableButton, { selected: value === 'cms', onClick: () => onChange('cms'), icon: _jsx(CMSModeIcon, {}), description: t('mode.cms.description'), disabled: disabledModes.includes('cms'), children: t('mode.cms.title') }) }), _jsx(Grid, { item: true, xs: 4, children: _jsx(Tooltip, { title: t('common.tooltip.nasNotAvailable'), placement: "top", arrow: true, children: _jsx("span", { children: _jsx(SelectableButton, { selected: value === 'nas', onClick: () => onChange('nas'), icon: _jsx(NASModeIcon, {}), description: t('mode.nas.description'), disabled: disabledModes.includes('nas'), children: t('mode.nas.title') }) }) }) })] }));
};
export default ModeSelector;
