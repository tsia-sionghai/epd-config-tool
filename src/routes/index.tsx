import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import EPDConfigTool from '../pages/EPDConfigTool';
import FormExample from '../pages/FormExample';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <EPDConfigTool />,
      },
      {
        path: 'form-example',
        element: <FormExample />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
