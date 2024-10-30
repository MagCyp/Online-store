import { FC, useEffect, useRef, useState } from 'react';

import Button from '@components/button/Button';
import Cart from '@components/cart/Cart';
import Container from '@components/container/Container';
import DropDownMenu from '@components/header/dropDownMenu/DropDownMenu';
import DropDownSearch from '@components/header/dropDownSearch/DropDownSearch';
import HeartOpacity from '@components/icons/HeartOpacity';
import IconButton from '@components/iconButton/IconButton';
import Search from '@components/icons/Search';
import ShoppingBag from '@components/icons/ShoppingBag';
import UserCircle from '@components/icons/UserCircle';

import logo from '@assets/images/Logo-wide.svg';

import { isAuth } from '@/hooks/isAuth/isAuth';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';

import { fetchFavorites } from '@store/slices/favoriteCount/favoriteCountSlice';
import { cartGet } from '@store/data/cart/cartThunks';

import { restrictNumberToString } from '@utils/NumberString/restrictNumberToString';

import styles from '@components/header/Header.module.scss';

const Header: FC = () => {
  const [isVisibleSearch, setVisibleSearch] = useState<boolean>(false);
  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const toggleButtonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);
  const favoriteCount = useAppSelector(state => state.favorites.count);

  const handleFavoritesClick = async () => {
    const authResponse = await isAuth();

    if (authResponse) {
      localStorage.setItem('currentPage', 'favorite');
      window.location.href = '/account';
    } else {
      window.location.href = '/account';
    }
  };

  useEffect(() => {
    dispatch(cartGet());
    dispatch(fetchFavorites());
  }, [dispatch]);

  useEffect(() => {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  return (
    <header>
      <Container>
        <div className={styles['header']}>
          <div className={styles['logo']}>
            <a href="/">
              <img src={logo} alt="Logo" />
            </a>
          </div>
          <div className={styles['link-group']}>
            <DropDownMenu />
            <Button
              className="link-gray small"
              type="button"
              text="About us"
              href="/aboutUs"
            />
            <Button
              className="link-gray small"
              type="button"
              text="Support"
              href="/support"
            />
          </div>
          <div className={styles['icons']}>
            <IconButton
              ref={toggleButtonRef}
              type="button"
              className="link-gray large"
              icon={<Search size="medium" />}
              onClick={() => setVisibleSearch(!isVisibleSearch)}
            />
            <IconButton
              type="button"
              className="link-gray large"
              icon={<UserCircle size="medium" />}
              to="/account"
            />
            <div className={styles['icon-container']}>
              <IconButton
                type="button"
                className="link-gray large"
                icon={<HeartOpacity size="medium" />}
                onClick={handleFavoritesClick}
              />
              {favoriteCount > 0 && (
                <span className={styles['count']}>
                  {restrictNumberToString(favoriteCount)}
                </span>
              )}
            </div>
            <div className={styles['icon-container']}>
              <IconButton
                type="button"
                className="link-gray large"
                icon={<ShoppingBag size="medium" />}
                onClick={() => setCartVisible(!isCartVisible)}
              />
              {cartCount > 0 && (
                <span className={styles['count']}>
                  {restrictNumberToString(cartCount)}
                </span>
              )}
            </div>
          </div>
          {isVisibleSearch && (
            <DropDownSearch
              onClick={() => setVisibleSearch(false)}
              isVisible={isVisibleSearch}
              toggleRef={toggleButtonRef}
            />
          )}
        </div>
      </Container>
      {isCartVisible && (
        <Cart isOpened={isCartVisible} onClose={() => setCartVisible(false)} />
      )}
    </header>
  );
};

export default Header;
