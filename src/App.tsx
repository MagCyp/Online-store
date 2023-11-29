import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { setUser } from '@store/slices/user/userSlice';

import SignIn from '@pages/auth/signIn/SignIn';
import SignUp from '@pages/auth/signUp/SignUp';
import Home from '@pages/home/Home';

import PrivateRoute from '@utils/privateRoute/PrivateRoute';

import { useGetUser } from '@hooks/getUser/useGetUser';
import { useAppDispatch } from '@hooks/redux/redux';

const App: FC = () => {
  const auth = useGetUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth && auth.token) {
      dispatch(setUser({ token: auth.token }));
    }
  }, [auth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route
          path="/login"
          element={auth ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/register"
          element={auth ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
