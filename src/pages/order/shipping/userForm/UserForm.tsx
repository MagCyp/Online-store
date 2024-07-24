import { FC, useEffect, useState } from 'react';
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validateNullString,
  validatePhone,
} from '@utils/validation/validation';
import RadioButton from '@/components/radioButton/RadioButton';
import CustomInput from '@components/customInput/Input';
import AddressesDropDown from '@/components/addressesDropDown/AddressesDropDown';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';
import Button from '@/components/button/Button';

import styles from '@pages/order/shipping/userForm/userForm.module.scss';
import { setData } from '@/store/slices/payment/paymentSlice';
import { useNavigate } from 'react-router-dom';
// import CryptoJS from 'crypto-js';

interface IUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
}

interface IAddress {
  region: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  postalCode: string;
}

const UserForm: FC = () => {
  const user = useAppSelector(state => state.user.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState<IUserDetails>({
    firstName: 'aaaa',
    lastName: 'aaaa',
    email: 'aaaa@aaaa.aaaa',
    number: '+380000000000',
  });

  const [currentAddress, setCurrentAddress] = useState<IAddress>({
    region: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
    postalCode: '',
  });

  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);
  const [delivery, setDelivery] = useState<number>(0);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setUserDetails({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        number: user?.phoneNumber,
      });
    }
  }, [user]);

  const handleAddressSelect = (index: number, address: IAddress) => {
    setSelectedAddressIndex(index);
    setCurrentAddress(address);
  };

  useEffect(() => {
    dispatch(setData({ delivery: delivery === 0 ? 'express' : 'standard' }));
  }, [delivery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!hasErrors) {
    dispatch(
      setData({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        number: userDetails.number,
        region: currentAddress.region,
        city: currentAddress.city,
        street: currentAddress.street,
        house: currentAddress.house,
        apartment: currentAddress.apartment,
        postalCode: currentAddress.postalCode,
        delivery: delivery === 0 ? 'express' : 'standard',
      }),
    );
    navigate('/order', { state: { currentPage: 'payment' } });
    // }
  };

  const hasErrors = Object.values(errors).some(error => error);

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['form-section']}>
        <h6 className="medium white">Personal Information</h6>
        <div style={{ padding: '12px' }}></div>
        <div className={styles['name-fields']}>
          <CustomInput
            type="text"
            value={userDetails.firstName}
            onChange={e =>
              setUserDetails(prev => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            staticLabel={{
              header: 'First name',
              label: 'Ivan',
            }}
            validate={validateFirstName}
            setError={error =>
              setErrors(prev => ({ ...prev, firstName: error }))
            }
          />
          <CustomInput
            type="text"
            value={userDetails.lastName}
            onChange={e =>
              setUserDetails(prev => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            staticLabel={{
              header: 'Last name',
              label: 'Ivanov',
            }}
            validate={validateLastName}
            setError={error =>
              setErrors(prev => ({ ...prev, lastName: error }))
            }
          />
        </div>
        <CustomInput
          type="email"
          value={userDetails.email}
          onChange={e =>
            setUserDetails(prev => ({
              ...prev,
              email: e.target.value,
            }))
          }
          staticLabel={{
            header: 'Email',
            label: 'gamers_paradise@paradise.com',
          }}
          validate={validateEmail}
          setError={error => setErrors(prev => ({ ...prev, email: error }))}
        />
        <CustomInput
          type="text"
          value={userDetails.number}
          onChange={e =>
            setUserDetails(prev => ({
              ...prev,
              number: e.target.value,
            }))
          }
          staticLabel={{
            header: 'Phone number',
            label: '+380100000000',
          }}
          validate={validatePhone}
          setError={error => setErrors(prev => ({ ...prev, number: error }))}
        />
      </div>
      <div className={styles['form-section']}>
        <h6 className="medium white">Shipping Address</h6>
        <div style={{ padding: '12px' }}></div>
        <AddressesDropDown
          selected={selectedAddressIndex}
          setSelected={handleAddressSelect}
          header="Saved addresses"
          addresses={[
            {
              region: 'aaa',
              apartment: 'aaa',
              city: 'aaa',
              house: 'aaa',
              postalCode: '11231',
              street: '232',
            },
            {
              region: 'a',
              apartment: 'a',
              city: 'a',
              house: 'a',
              postalCode: '11231',
              street: '2',
            },
          ]}
        />
        <div style={{ padding: '12px' }}></div>
        <CustomInput
          type="text"
          value={currentAddress.region}
          onChange={e =>
            setCurrentAddress(prev => ({
              ...prev,
              region: e.target.value,
            }))
          }
          staticLabel={{
            header: 'Region',
            label: 'Region',
          }}
          validate={validateNullString}
          setError={error => setErrors(prev => ({ ...prev, region: error }))}
        />
        <CustomInput
          type="text"
          value={currentAddress.city}
          onChange={e =>
            setCurrentAddress(prev => ({
              ...prev,
              city: e.target.value,
            }))
          }
          staticLabel={{
            header: 'Town/City',
            label: 'Town/City',
          }}
          validate={validateNullString}
          setError={error => setErrors(prev => ({ ...prev, city: error }))}
        />
        <CustomInput
          type="text"
          value={currentAddress.street}
          onChange={e =>
            setCurrentAddress(prev => ({
              ...prev,
              street: e.target.value,
            }))
          }
          staticLabel={{
            header: 'Street Address',
            label: 'Street Address',
          }}
          validate={validateNullString}
          setError={error => setErrors(prev => ({ ...prev, street: error }))}
        />
        <div className={styles['name-fields']}>
          <CustomInput
            type="text"
            value={currentAddress.house}
            onChange={e =>
              setCurrentAddress(prev => ({
                ...prev,
                house: e.target.value,
              }))
            }
            staticLabel={{
              header: 'House',
              label: 'House',
            }}
            validate={validateNullString}
            setError={error => setErrors(prev => ({ ...prev, house: error }))}
          />
          <CustomInput
            type="text"
            value={currentAddress.apartment}
            onChange={e =>
              setCurrentAddress(prev => ({
                ...prev,
                apartment: e.target.value,
              }))
            }
            staticLabel={{
              header: 'Apartment',
              label: 'Apartment',
            }}
            validate={validateNullString}
            setError={error =>
              setErrors(prev => ({ ...prev, apartment: error }))
            }
          />
          <CustomInput
            type="text"
            value={currentAddress.postalCode}
            onChange={e =>
              setCurrentAddress(prev => ({
                ...prev,
                postalCode: e.target.value,
              }))
            }
            staticLabel={{
              header: 'Postal Code',
              label: 'Postal Code',
            }}
            validate={validateNullString}
            setError={error =>
              setErrors(prev => ({ ...prev, postalCode: error }))
            }
          />
        </div>
      </div>
      <div className={styles['form-section']}>
        <h6 className="medium white">Shipping Method</h6>
        <div style={{ padding: '12px' }}></div>
        <div className={styles['radio-section']}>
          <RadioButton
            header="Express delivery"
            text="Delivery time from 1-3 days"
            secondaryHeader="$20.00"
            isActive={delivery === 0}
            setIsActive={() => setDelivery(0)}
          />
          <RadioButton
            header="Standard delivery"
            text="Delivery time from 3-6 days"
            secondaryHeader="$10.00"
            isActive={delivery === 1}
            setIsActive={() => setDelivery(1)}
          />
        </div>
      </div>
      <Button
        type="submit"
        className="primary large"
        text="Continue to Payment"
        // isDisabled={hasErrors}
      />
    </form>
  );
};

export default UserForm;
