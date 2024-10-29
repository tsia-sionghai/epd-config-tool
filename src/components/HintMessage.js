import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
// 定義每種類型對應的顏色
const typeColors = {
    info: '#A2ABB3', // 灰色 (藍色)
    error: '#FF0000', // 紅色
    warning: '#FFA500' // 橙色
};
// 定義每種類型對應的圖示
const typeIcons = {
    info: InfoIcon,
    error: ErrorIcon,
    warning: WarningIcon
};
const HintMessage = ({ type = 'info', message, icon, containerSx, typographySx }) => {
    const Icon = typeIcons[type];
    const color = typeColors[type];
    return (_jsxs(Box, { sx: {
            display: 'flex',
            alignItems: 'center',
            gap: 0.5, // 改為 0.5 (4px) 或更小的值
            ...containerSx
        }, children: [icon || _jsx(Icon, { sx: { color, fontSize: 20 } }), _jsx(Typography, { variant: "body2", sx: {
                    color,
                    ...typographySx
                }, children: message })] }));
};
export default HintMessage;
