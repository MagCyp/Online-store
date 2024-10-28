import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/button/Button';
import Swap from '@components/icons/Swap';
// import userImg from '@assets/images/image.png';
import userImg from '@assets/images/no-profile-picture.svg';

import { Props } from '@pages/userAccount/navigation/types';

import styles from '@pages/userAccount/navigation/navigation.module.scss';

const userInfo = {
  image: userImg,
};

const navigation: Record<string, string> = {
  account: 'Account',
  addresses: 'Addresses',
  favorite: 'Favorite',
};

const Navigation: FC<Props> = ({
  currentPage,
  setCurrentPage,
  userName,
  onLogout,
}) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    sessionStorage.removeItem('jwt');
    onLogout?.();
    navigate('/');
  };

  return (
    <div className={styles['user-navigation']}>
      <div className={styles['image-block']}>
        <img src={userInfo.image} alt="image" />
        <div className={styles['button-wrapper']}></div>
        <h6>{userName}</h6>
      </div>
      <div className={styles['navigation']}>
        {Object.keys(navigation).map(item => (
          <div
            key={item}
            className={`${styles['menu-item']} ${
              item === currentPage ? styles['active'] : ''
            }`}
          >
            <Button
              text={navigation[item]}
              type="button"
              className="link-gray medium"
              onClick={() => setCurrentPage(item)}
            />
          </div>
        ))}
        <Button
          text="Log out"
          type="button"
          className="link-gray medium"
          style={{ justifyContent: 'start' }}
          onClick={handleLogOut}
        />
      </div>
    </div>
  );
};

export default Navigation;
