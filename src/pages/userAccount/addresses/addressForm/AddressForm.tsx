import { FC, useState, useEffect } from 'react';

import CustomInput from '@/components/customInput/Input';
import Button from '@components/button/Button';

import {
  validateFirstName,
  validateLastName,
  validateNullString,
  validatePhone,
} from '@/utils/validation/validation';

import { Props as addressType } from '@pages/userAccount/addresses/addressCard/types';
import { Props } from '@pages/userAccount/addresses/addressForm/types';

import styles from '@pages/userAccount/addresses/addressForm/addressForm.module.scss';

const AddressForm: FC<Props> = ({ active, addresses, onSave }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const [error, setError] = useState({
    firstNameError: '',
    lastNameError: '',
    phoneError: '',
    countryError: '',
    cityError: '',
    addressError: '',
    codeError: '',
  });

  useEffect(() => {
    if (active !== null && addresses) {
      const address = addresses[active];
      setFirstName(address.firstName);
      setLastName(address.lastName);
      setPhone(address.number);
      setCountry(address.country);
      setCity(address.city);
      setAddress(address.address);
      setCode(address.code);
    } else {
      setFirstName('');
      setLastName('');
      setPhone('');
      setCountry('');
      setCity('');
      setAddress('');
      setCode('');
    }
  }, [active, addresses]);

  const formHasErrors = () => {
    const isErr = Object.values(error).every(err => err === '');
    return isErr;
  };

  const formEqualAddresses = () => {
    if (!addresses || addresses.length === 0) {
      return false;
    }

    if (active !== null) {
      return true;
    }

    const isEqual = addresses.some(addr => {
      return (
        firstName === addr.firstName &&
        lastName === addr.lastName &&
        phone === addr.number &&
        country === addr.country &&
        city === addr.city &&
        address === addr.address &&
        code === addr.code
      );
    });

    return isEqual;
  };

  const handleSaveChanges = () => {
    const newAddress: addressType = {
      firstName,
      lastName,
      number: phone,
      country,
      city,
      address,
      code,
    };
    onSave(newAddress, active);
  };

  return (
    <div className={styles['addresses-form']}>
      <h6 className={`bold ${styles['addresses-form-header']}`}>
        {formEqualAddresses() ? 'Change address' : 'Add new addresses'}
      </h6>
      <CustomInput
        type="text"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        setError={error =>
          setError(prev => ({ ...prev, firstNameError: error }))
        }
        staticLabel={{ header: 'First name', label: 'Ivan' }}
        validate={validateFirstName}
      />
      <CustomInput
        type="text"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        setError={error =>
          setError(prev => ({ ...prev, lastNameError: error }))
        }
        staticLabel={{ header: 'Last name', label: 'Ivanov' }}
        validate={validateLastName}
      />
      <CustomInput
        type="text"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        setError={error => setError(prev => ({ ...prev, phoneError: error }))}
        staticLabel={{ header: 'Contact Number', label: '+380983516319' }}
        validate={validatePhone}
      />
      <CustomInput
        type="text"
        value={country}
        onChange={e => setCountry(e.target.value)}
        setError={error => setError(prev => ({ ...prev, countryError: error }))}
        staticLabel={{ header: 'Country', label: 'Ukraine' }}
        validate={validateNullString}
      />
      <CustomInput
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        setError={error => setError(prev => ({ ...prev, cityError: error }))}
        staticLabel={{ header: 'City', label: 'Kyiv' }}
        validate={validateNullString}
      />
      <CustomInput
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
        setError={error => setError(prev => ({ ...prev, addressError: error }))}
        staticLabel={{ header: 'Address', label: 'Stepana Bandery 2/15' }}
        validate={validateNullString}
      />
      <CustomInput
        type="text"
        value={code}
        onChange={e => setCode(e.target.value)}
        setError={error => setError(prev => ({ ...prev, codeError: error }))}
        staticLabel={{ header: 'Postcode', label: '1234' }}
        validate={validateNullString}
      />
      <div style={{ height: error.codeError ? '24px' : '0px' }}></div>
      <Button
        type="button"
        text={formEqualAddresses() ? 'Save Changes' : 'Add new'}
        className="primary large"
        onClick={handleSaveChanges}
        isDisabled={!formHasErrors()}
      />
    </div>
  );
};

export default AddressForm;
