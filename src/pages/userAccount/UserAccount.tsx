import { FC, useState } from 'react';

import Container from '@components/container/Container';
import Breadcrumb from '@components/breadcrumb/Breadcrumb';
import Navigation from '@pages/userAccount/navigation/Navigation';
import Account from './account/Account';
// import Addresses from '@pages/userAccount/addresses/Addresses';

import styles from '@pages/userAccount/userAccount.module.scss';

const UserAccount: FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('addresses');

  const renderContent = () => {
    // switch (currentPage) {
    //   case 'account':
    //     return <Account />;
    //   case 'orders':
    //     return <Orders />;
    //   case 'addresses':
    //     return <Addresses />;
    //   case 'favorite':
    //     return <Favorite />;
    //   default:
    //     return <Account />;
    // }
    // return <Addresses />;
    return (
      <Account
        firstName=""
        lastName=""
        phone=""
        email=""
        oldPass=""
        newPass=""
        repNewPass=""
      />
    );
  };

  return (
    <Container>
      <div className={styles['account-container']}>
        <Breadcrumb userPage="My Account" />
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
