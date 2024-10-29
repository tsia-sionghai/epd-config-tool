import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { Typography, Box, Container } from '@mui/material';
const Layout = () => {
    return (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', minHeight: '100vh' }, children: [_jsx(Container, { maxWidth: "lg", sx: { flex: 1, py: 3 }, children: _jsx(Outlet, {}) }), _jsx(Box, { component: "footer", sx: {
                    py: 2,
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderTop: 1,
                    borderColor: 'divider'
                }, children: _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Copyright \u00A9 2024 Netronix, Inc. All rights reversed." }) })] }));
};
export default Layout;
