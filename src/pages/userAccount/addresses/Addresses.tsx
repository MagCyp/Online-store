import { FC, useEffect, useState } from 'react';
import { Props as addressType } from '@pages/userAccount/addresses/addressCard/types';
import AddressCard from './addressCard/AddressCard';
import AddressForm from './addressForm/AddressForm';
import styles from '@pages/userAccount/addresses/addresses.module.scss';

const addresses: addressType[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    number: '+380983516319',
    country: 'USA',
    city: 'New York',
    address: '123 Elm Street',
    code: '10001',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    number: '+380983516319',
    country: 'UK',
    city: 'London',
    address: '456 Oak Avenue',
    code: 'E1 6AN',
  },
  {
    firstName: 'Hans',
    lastName: 'Miller',
    number: '+380983516319',
    country: 'Germany',
    city: 'Berlin',
    address: '789 Pine Road',
    code: '10115',
  },
];

const Addresses: FC = () => {
  const [userAddresses, setUserAddresses] = useState<addressType[] | null>(
    null,
  );
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    setUserAddresses(addresses);
  }, []);

  const handleRemove = (index: number) => {
    if (!userAddresses) return;
    const updatedAddresses = userAddresses.filter((_, i) => i !== index);
    setUserAddresses(updatedAddresses);
    if (active || active === 0 || 0 >= updatedAddresses.length) {
      setActive(null);
    }
  };

  const handleSetActive = (index: number | null) => {
    setActive(index);
  };

  const handleSaveChanges = (address: addressType, index: number | null) => {
    if (userAddresses) {
      if (index !== null) {
        const updatedAddresses = [...userAddresses];
        updatedAddresses[index] = address;
        setUserAddresses(updatedAddresses);
      } else {
        if (userAddresses.length < 3) {
          setUserAddresses([...userAddresses, address]);
        }
      }
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['addresses']}>
        <div className={styles['addresses-header']}>
          <h6 className="bold">Your addresses</h6>
        </div>
        {userAddresses && userAddresses.length > 0 ? (
          <div className={styles['addresses-list']}>
            {userAddresses.map((address, index) => (
              <AddressCard
                key={index}
                {...address}
                selectedItem={index === active}
                setActive={() =>
                  handleSetActive(index === active ? null : index)
                }
                onRemove={() => handleRemove(index)}
              />
            ))}
            <p className="regular s">
              You can add only 3 addresses. Uses {userAddresses.length}/3
              addresses.
            </p>
          </div>
        ) : (
          <div className={styles['addresses-empty']}>
            <h6 className="bold">You don`t have any addresses</h6>
          </div>
        )}
      </div>
      <AddressForm
        active={active}
        addresses={userAddresses}
        onSave={handleSaveChanges}
      />
    </div>
  );
};

export default Addresses;
