import { FC, useState, useEffect } from 'react';
import axios from 'axios';

import Container from '@components/container/Container';
import Breadcrumb from '@components/breadcrumb/Breadcrumb';
import Navigation from '@pages/userAccount/navigation/Navigation';
import Account from '@pages/userAccount/account/Account';
import Addresses from '@pages/userAccount/addresses/Addresses';

import styles from '@pages/userAccount/userAccount.module.scss';

const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
const path = '/auth/me';
const baseURL = process.env.REACT_APP_API_URL;

interface UserData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

const UserAccount: FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('account');
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseURL}${path}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchUserData();
  }, []);

  const renderContent = () => {
    if (!userData) {
      return <div>Loading...</div>;
    }
    switch (currentPage) {
      case 'account':
        return (
          <Account
            firstName={userData.firstName}
            lastName={userData.lastName}
            phone={userData.phoneNumber}
            email={userData.email}
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
  };

  return (
    <Container>
      <div className={styles['account-container']}>
        <Breadcrumb userPage={navigation[currentPage]} />
        <div className={styles['content']}>
          <Navigation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            userName={`${userData?.firstName ?? '...'} ${
              userData?.lastName ?? '...'
            }`}
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
