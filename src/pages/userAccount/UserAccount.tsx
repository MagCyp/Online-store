import { FC, useState, useEffect, useCallback } from 'react';

import Account from '@pages/userAccount/account/Account';
import Addresses from '@pages/userAccount/addresses/Addresses';
import Breadcrumb from '@components/breadcrumb/Breadcrumb';
import Container from '@components/container/Container';
import Navigation from '@pages/userAccount/navigation/Navigation';

import { isAuth } from '@/hooks/isAuth/isAuth';

import { Props } from '@pages/userAccount/types';

import styles from '@pages/userAccount/userAccount.module.scss';

const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

const UserAccount: FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('account');
  const [userData, setUserData] = useState<Props | null>(null);

  const fetchData = async () => {
    const res = await isAuth();

    if (res && res.data) {
      setUserData(res.data as Props);
    } else {
      console.log('User not authenticated');
      setUserData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [jwt]);

  const updateUserData = (newData: Props) => {
    setUserData(newData);
  };

  const renderContent = useCallback(() => {
    if (!userData) {
      return <div>Loading...</div>;
    }
    switch (currentPage) {
      case 'account':
        return (
          <Account
            firstName={userData.firstName}
            lastName={userData.lastName}
            phoneNumber={userData.phoneNumber}
            email={userData.email}
            onUpdateUserData={updateUserData}
          />
        );
      // case 'orders':
      //   return <Orders />;
      case 'addresses':
        return <Addresses />;
      // case 'favorite':
      //   return <Favorite />;
      default:
        return <Addresses />;
    }
  }, [userData, currentPage]);

  return (
    <Container>
      <div className={styles['account-container']}>
        <Breadcrumb userPage={navigation[currentPage]} />
        <div className={styles['content']}>
          <Navigation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            userName={`${userData?.firstName ?? ''} ${
              userData?.lastName ?? ''
            }`}
            onLogout={() => setUserData(null)}
          />
          {renderContent()}
        </div>
      </div>
    </Container>
  );
};

const navigation: Record<string, string> = {
  account: 'Account',
  orders: 'My orders',
  addresses: 'Addresses',
  favorite: 'Favorite',
};

export default UserAccount;
