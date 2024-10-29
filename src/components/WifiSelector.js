import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
const WifiSelector = ({ value, onChange }) => {
    const { t } = useTranslation();
    return (_jsxs(Select, { variant: "outlined", fullWidth: true, value: value, onChange: (e) => onChange(e.target.value), children: [_jsx(MenuItem, { value: "open", children: "Open" }), _jsx(MenuItem, { value: "wpa2Personal", children: "WPA2 Personal" }), _jsx(MenuItem, { value: "staticIP", children: "Static IP" })] }));
};
export default WifiSelector;
