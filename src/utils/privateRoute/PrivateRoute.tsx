import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useGetUser } from '../../hooks/getUser/useGetUser';

const PrivateRoute: FC = () => {
  const auth = useGetUser();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
