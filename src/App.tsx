import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { setUser } from '@store/slices/user/userSlice';

import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import SignIn from '@pages/auth/signIn/SignIn';
import SignUp from '@pages/auth/signUp/SignUp';
import Home from '@pages/home/Home';
import Catalog from '@pages/catalog/Catalog';

import PrivateRoute from '@utils/privateRoute/PrivateRoute';

import { useGetUser } from '@hooks/getUser/useGetUser';
import { useAppDispatch } from '@hooks/redux/redux';
import ProductId from '@pages/productId/ProductId';

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
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/catalog/:category" element={<Catalog />} />
          <Route path="/catalog/:category/:id" element={<ProductId />} />
          <Route
            path="/login"
            element={auth ? <Navigate to="/" /> : <SignIn />}
          />
          <Route
            path="/register"
            element={auth ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
