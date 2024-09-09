import { FC, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Container from '@components/container/Container';
import Breadcrumb from '@components/breadcrumb/Breadcrumb';
import Navigation from '@pages/userAccount/navigation/Navigation';
import Account from '@pages/userAccount/account/Account';
import Addresses from '@pages/userAccount/addresses/Addresses';

import styles from '@pages/userAccount/userAccount.module.scss';
import { isAuth } from '@/hooks/isAuth/isAuth';

const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
// const path = '/auth/me';
// const baseURL = process.env.REACT_APP_API_URL;

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const UserAccount: FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('account');
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchData = async () => {
    const res = await isAuth();
    if (res && res.data) {
      setUserData(res.data as UserData);
    } else {
      console.log('User not authenticated');
      setUserData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [jwt]);

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
            phone={userData.phone}
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
  }, [userData, currentPage]);

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

// const fetchUserData = async (): Promise<UserData | null> => {
//   try {
//     const response = await axios.get(`${baseURL}${path}`, {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data', error);
//     return null;
//   }
// };
