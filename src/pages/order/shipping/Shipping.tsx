import React, { FC } from 'react';

import styles from '@pages/order/shipping/shipping.module.scss';
import UserForm from '@pages/order/shipping/userForm/UserForm';
import SideBar from '@pages/order/shipping/sideBar/SideBar';

interface Props {
  onSubmit: () => void;
}

const Shipping: FC<Props> = ({ onSubmit }) => {
  return (
    <div className={styles['body']}>
      <div className={styles['form-container']}>
        <UserForm onSubmit={onSubmit} />
      </div>
      <div className={styles['side-bar']}>
        <SideBar />
      </div>
    </div>
  );
};

export default Shipping;
