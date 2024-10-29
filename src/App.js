import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout/Layout';
import EPDConfigTool from './pages/EPDConfigTool';
import FormExample from './pages/FormExample';
// 路由配置
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(Layout, {}),
        children: [
            {
                index: true,
                element: _jsx(EPDConfigTool, {}),
            },
            {
                path: 'form-example',
                element: _jsx(FormExample, {}),
            },
        ],
    },
]);
function App() {
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx(RouterProvider, { router: router })] }));
}
export default App;
