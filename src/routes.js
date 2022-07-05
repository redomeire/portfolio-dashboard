import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

// ----------------------------------------------------------------------

const PrivateRoute = () => {
  if(localStorage.getItem("Authorization"))
  return <Outlet/>
  
  return <Navigate to="/login"/>
}

const AuthRoute = () => {
  if(localStorage.getItem("Authorization"))
  return <Navigate to="/dashboard/app"/>

  return <Outlet/>
}

export default function Router() {
  return useRoutes([
    {
      element: <PrivateRoute/>,
      children: [
      { path: '/dashboard', element: <DashboardLayout />, children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],},
    ]
    },
    {
      element: <AuthRoute/>,
      children: [
        {
          path: '/', element: <LogoOnlyLayout/>, children: [
            { path: '/', element: <Navigate to="/dashboard/app" /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: '404', element: <NotFound /> },
            { path: '*', element: <Navigate to="/404" /> },
          ],
        }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

export {PrivateRoute, AuthRoute};
