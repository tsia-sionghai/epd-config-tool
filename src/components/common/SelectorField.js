import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
const LabelContainer = styled(Grid)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '40px',
    paddingRight: '24px',
});
const LabelText = styled(Typography)({
    lineHeight: '40px',
    whiteSpace: 'nowrap',
});
const SelectorField = ({ label, children }) => {
    return (_jsxs(Grid, { container: true, alignItems: "center" // 添加這個屬性
        , spacing: 0, children: [_jsx(LabelContainer, { item: true, xs: 2, children: _jsx(LabelText, { children: label }) }), _jsx(Grid, { item: true, xs: 9, children: children })] }));
};
export default SelectorField;
