import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomButton from './common/CustomButton';
const ActionButtons = ({ mode, onGenerateConfig, disabled = false, // 設定預設值
 }) => {
    const { t } = useTranslation();
    return (_jsx(Grid, { item: true, xs: 12, children: _jsx(Box, { display: "flex", alignItems: "center", children: _jsx(CustomButton, { onClick: onGenerateConfig, disabled: disabled, children: t('common.button.generateConfig') }) }) }));
};
export default ActionButtons;
