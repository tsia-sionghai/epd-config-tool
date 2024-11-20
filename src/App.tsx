import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';
import theme from './theme';
import Layout from './components/Layout/Layout';
import EPDConfigTool from './pages/EPDConfigTool';
import { detectLanguage } from './utils/languageDetector';

// 路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <EPDConfigTool />,
      },
    ],
  },
]);

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // 監聽 cookie 變化
    const checkLanguage = () => {
      const currentLang = detectLanguage();
      if (currentLang !== i18n.language) {
        i18n.changeLanguage(currentLang);
      }
    };

    // 初始檢查
    checkLanguage();

    // 定期檢查 cookie 變化
    const interval = setInterval(checkLanguage, 1000);
    return () => clearInterval(interval);
  }, [i18n]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
