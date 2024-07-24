import React from 'react';

import styles from './shipping.module.scss';
import UserForm from './userForm/UserForm';
import SideBar from './sideBar/SideBar';

const Shipping = () => {
  return (
    <div className={styles['body']}>
      <div className={styles['form-container']}>
        <UserForm />
      </div>
      <div className={styles['side-bar']}>
        <SideBar />
      </div>
    </div>
  );
};

export default Shipping;
