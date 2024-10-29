import { jsx as _jsx } from "react/jsx-runtime";
import { Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
const SizeSelector = ({ value, onChange }) => {
    const { t } = useTranslation();
    // 定義尺寸選項和對應的解析度
    const sizeOptions = [
        { value: '13.3', resolution: '1200x1600' },
        { value: '25.3', resolution: '1800x3200' },
        { value: '28.3', resolution: '2160x3060' },
        { value: '31.5', resolution: '1440x2560' },
    ];
    return (_jsx(Select, { variant: "outlined", value: value, onChange: (e) => onChange(e.target.value), children: sizeOptions.map((option) => (_jsx(MenuItem, { value: option.value, selected: value === option.value, children: `${option.value}" (${option.resolution})` }, option.value))) }));
};
export default SizeSelector;
