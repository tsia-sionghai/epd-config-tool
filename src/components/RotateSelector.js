import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button, Box, styled } from '@mui/material';
const RotateButton = styled(Button)(({ theme, selected }) => ({
    minWidth: '60px',
    height: '40px',
    borderRadius: '18px',
    padding: '6px 16px',
    margin: '0 4px',
    backgroundColor: selected ? theme.palette.action.selected : theme.palette.background.paper,
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: selected ? theme.palette.action.selected : theme.palette.action.hover,
    },
    border: `1px solid ${theme.palette.divider}`,
}));
const RotateSelector = ({ value, onChange }) => (_jsx(Box, { display: "flex", justifyContent: "flex-start", children: [0, 90, 180, 270].map((degree) => (_jsxs(RotateButton, { onClick: () => onChange(degree), selected: value === degree, variant: "outlined", children: [degree, "\u00B0"] }, degree))) }));
export default RotateSelector;
