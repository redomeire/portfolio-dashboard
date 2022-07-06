import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
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
  if (localStorage.getItem("Authorization"))
    return <Outlet />

  return <Navigate to="/login" />
}

const AuthRoute = () => {
  if (localStorage.getItem("Authorization"))
    return <Navigate to="/dashboard/app" />

  return <Outlet />
}

export default function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/app" element={<DashboardApp />} />
          <Route path="/dashboard/user" element={<User />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/blog" element={<Blog />} />
          <Route path="/dashboard/project" element={<Navigate to="/dashboard/app"/>} />
          <Route path="/dashboard/*" element={<Navigate to="/404" />} />
        </Route>
      </Route>
      <Route element={<AuthRoute />}>
        <Route path='/' element={<Navigate to="/dashboard/app" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
      <Route path='/404' element={<NotFound />} />
      <Route path='/*' element={<Navigate to="/404" />} />
    </Routes>
  );
}

export { PrivateRoute, AuthRoute };
