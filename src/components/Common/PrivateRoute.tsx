import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  if (!isLoggedIn) return <Navigate to="/" />;

  return <Outlet />;
};
