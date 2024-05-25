import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { setUser } from '@store/slices/user/userSlice';

import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Home from '@pages/home/Home';
import Catalog from '@pages/catalog/Catalog';
import AuthModal from '@components/authForm/AuthForm';
import ProductId from '@pages/productId/ProductId';

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
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/catalog/:category" element={<Catalog />} />
          <Route path="/catalog/:category/:id" element={<ProductId />} />
          <Route path="/login" element={<AuthModal isOpen />} />
          <Route path="/register" element={<AuthModal register isOpen />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
