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
import ModalWindow from '@components/modalWindow/ModalWindow';
import AuthForm from '@components/authForm/AuthForm';
import Home from '@pages/home/Home';
import Catalog from '@pages/catalog/Catalog';
import Product1 from '@pages/product/Product1';
import UserAccount from '@pages/userAccount/UserAccount';
import Verify from '@pages/verify/Verify';
import Order from '@pages/order/Order';
import OrderComplete from '@pages/order/orderComplete/OrderComplete';

import { isAuth } from '@hooks/isAuth/isAuth';
import { useAppDispatch } from '@hooks/redux/redux';

import { fetchUserDataSuccess } from '@store/slices/user/userSlice';
import { cartAdd } from '@store/data/cart/cartThunks';

import { fetchData } from './utils/wakeUpBack/wakeUpBack';
import { getCartFromLocalStorage } from '@utils/cart/cartOperation';

const privateLocations = ['/account'];

const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [authStatus, setAuthStatus] = useState<boolean | null>(null);
  const [prevLocation, setPrevLocation] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  const checkAuth = async () => {
    const authResult = await isAuth();
    return authResult;
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 600000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setAuthChecking(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    checkAuth().then((res: any) => {
      setAuthStatus(!!res);
      setAuthChecking(false);

      dispatch(fetchUserDataSuccess(res.data));

      const cart = getCartFromLocalStorage();
      if (res) {
        dispatch(cartAdd(cart)).then(res => {
          if (res.meta.requestStatus === 'fulfilled') {
            localStorage.removeItem('cart');
          }
        });
      }
    });
  }, [location.pathname]);

  useEffect(() => {
    if (
      !authStatus &&
      !authChecking &&
      privateLocations.includes(location.pathname)
    ) {
      setPrevLocation(location.pathname);
      navigate('/');
      setShowModal(true);
    }
  }, [location.pathname, authStatus, authChecking]);

  const handleAuthSuccess = async (formName: string) => {
    setShowModal(false);

    if (formName === 'register') {
      setShowMessageModal(true);
      await checkAuth();

      return;
    }

    setAuthStatus(true);
    await checkAuth();
    navigate(prevLocation);
  };

  return (
    <>
      <Header />
      <main>
        <AuthForm
          onAuthSuccess={formName => handleAuthSuccess(formName)}
          isOpen={showModal}
          setIsOpen={setShowModal}
        />
        <ModalWindow
          isOpen={showMessageModal}
          setIsOpen={setShowMessageModal}
          firstButtonText="Close"
          firstButtonClose
          header="Registration Success"
          message="Verify message was sent to your email"
          type="success"
        />
        <ModalWindow
          isOpen={showErrorModal}
          setIsOpen={setShowErrorModal}
          firstButtonClose
          firstButtonText="Close"
          header="Something went wrong"
          message="Please try again later or contact technical support"
          type="error"
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog/:category" element={<Catalog />} />
          <Route path="/account" element={<UserAccount />} />
          <Route path="/product/:id" element={<Product1 />} />
          <Route
            path="/verify"
            element={
              <Verify
                setIsOpen={setShowModal}
                setIsOpenError={setShowErrorModal}
              />
            }
          />
          <Route path="/order" element={<Order />} />
          <Route path="/complete" element={<OrderComplete />} />
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
