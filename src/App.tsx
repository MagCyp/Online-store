import { FC, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Home from '@pages/home/Home';
import Catalog from '@pages/catalog/Catalog';
import AuthForm from '@components/authForm/AuthForm';
import ProductId from '@pages/productId/ProductId';
import UserAccount from '@pages/userAccount/UserAccount';

import { isAuth } from '@hooks/isAuth/isAuth';
import { useAppDispatch } from '@hooks/redux/redux';

import { cartAdd } from '@store/data/cart/cartThunks';

import { getCartFromLocalStorage } from '@utils/cart/cartOperation';

const privateLocations = ['/account'];

const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [authStatus, setAuthStatus] = useState<boolean | null>(null);
  const [prevLocation, setPrevLocation] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const checkAuth = async () => {
    const authResult = await isAuth();
    setAuthStatus(authResult);

    if (authResult) {
      const cart = getCartFromLocalStorage();
      dispatch(cartAdd(cart));
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location]);

  useEffect(() => {
    if (!authStatus && privateLocations.includes(location.pathname)) {
      setPrevLocation(location.pathname);
      navigate('/');
      setTimeout(() => {
        setShowModal(true);
      }, 1);
    }
  }, [location.pathname]);

  const handleAuthSuccess = async () => {
    setShowModal(false);
    navigate(prevLocation);
    setAuthStatus(true);
    checkAuth();
  };

  return (
    <>
      <Header />
      <main>
        <AuthForm
          onAuthSuccess={handleAuthSuccess}
          isOpen={showModal}
          setIsOpen={setShowModal}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog/:category" element={<Catalog />} />
          <Route path="/catalog/:category/:id" element={<ProductId />} />
          <Route path="/account" element={<UserAccount />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const AppWrapper: FC = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
