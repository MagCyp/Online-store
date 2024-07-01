import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/button/Button';
import userImg from '@assets/images/image.png';

import { Props } from '@pages/userAccount/navigation/types';

import styles from '@pages/userAccount/navigation/navigation.module.scss';

const userInfo = {
  name: 'Aria Evergreen',
  image: userImg,
};

const navigation: Record<string, string> = {
  account: 'Account',
  orders: 'My orders',
  addresses: 'Addresses',
  favorite: 'Favorite',
};

const Navigation: FC<Props> = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  return (
    <div className={styles['user-navigation']}>
      <div className={styles['image-block']}>
        <img src={userInfo.image} alt="image" />
        <h6>{userInfo.name}</h6>
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
          onClick={() => handleLogOut()}
        />
      </div>
    </div>
  );
};

export default Navigation;
