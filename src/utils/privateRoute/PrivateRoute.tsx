import { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: FC = () => {
  const auth = false;
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
