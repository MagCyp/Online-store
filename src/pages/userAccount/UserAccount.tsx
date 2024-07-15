import { FC, useState } from 'react';

import Container from '@components/container/Container';
import Breadcrumb from '@components/breadcrumb/Breadcrumb';
import Navigation from '@pages/userAccount/navigation/Navigation';
import Account from '@pages/userAccount/account/Account';
import Addresses from '@pages/userAccount/addresses/Addresses';

import styles from '@pages/userAccount/userAccount.module.scss';

const navigation: Record<string, string> = {
  account: 'Account',
  orders: 'My orders',
  addresses: 'Addresses',
  favorite: 'Favorite',
};

const UserAccount: FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('account');

  const renderContent = () => {
    switch (currentPage) {
      case 'account':
        return <Account firstName="" lastName="" phone="" email="" />;
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
          />
          {renderContent()}
        </div>
      </div>
    </Container>
  );
};

export default UserAccount;
