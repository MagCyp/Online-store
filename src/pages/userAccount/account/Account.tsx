import { FC, useState } from 'react';

import CustomInput from '@components/customInput/Input';
import Button from '@components/button/Button';
import Error from '@/components/error/Error';

import {
  validateFirstName,
  validateLastName,
  validatePhone,
  validateEmail,
  validatePassword,
  validateRepeatPassword,
} from '@utils/validation/validation';

import { Props } from '@pages/userAccount/account/types';

import styles from '@pages/userAccount/account/account.module.scss';

const Account: FC<Props> = ({ firstName, lastName, phone, email }) => {
  const [userAccountData, setUserAccountData] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }>({
    firstName: 'vitalii',
    lastName: 'maksymenko',
    phone: '+380259786489',
    email: 'zalupa@gmail.com',
  });

  const [password, setPassword] = useState<{
    password: string;
    newPassword: string;
    repeatPassword: string;
  }>({
    password: '',
    newPassword: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    newPassword: '',
    repeatPassword: '',
  });

  const handleErrorsChange = (field: string, value: string) => {
    setErrors(prevState => ({ ...prevState, [field]: value }));
  };

  const handleUserAccountDataChange = (field: string, value: string) => {
    setUserAccountData(prevState => ({ ...prevState, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPassword(prevState => ({ ...prevState, [field]: value }));
  };

  const infoIsValid =
    errors.firstName && errors.lastName && errors.phone && errors.email;

  const passwordIsValid =
    errors.password && errors.newPassword && errors.repeatPassword;

  const formIsValid = !!infoIsValid || !!passwordIsValid;

  return (
    <div className={styles['account-form']}>
      <h6 className={`bold ${styles['account-form-header']}`}>
        Account Details
      </h6>

      <CustomInput
        type="text"
        value={userAccountData.firstName}
        staticLabel={{ header: 'First name *', label: 'First name' }}
        error={errors.firstName}
        onChange={e => handleUserAccountDataChange('firstName', e.target.value)}
        setError={err => handleErrorsChange('firstName', err)}
        validate={validateFirstName}
      />
      <CustomInput
        type="text"
        value={userAccountData.lastName}
        staticLabel={{ header: 'Last name *', label: 'Last name' }}
        error={errors.lastName}
        validate={validateLastName}
        onChange={e => handleUserAccountDataChange('lastName', e.target.value)}
        setError={err => handleErrorsChange('lastName', err)}
      />
      <CustomInput
        type="text"
        value={userAccountData.phone}
        staticLabel={{ header: 'Phone Number', label: 'Phone Number' }}
        onChange={e => handleUserAccountDataChange('phone', e.target.value)}
        validate={validatePhone}
        setError={err => handleErrorsChange('phone', err)}
      />
      <CustomInput
        type="email"
        value={userAccountData.email}
        staticLabel={{ header: 'Email *', label: 'Email *' }}
        onChange={e => handleUserAccountDataChange('email', e.target.value)}
        validate={validateEmail}
        setError={err => handleErrorsChange('email', err)}
      />
      <h6 className={`bold ${styles['addresses-form-header']}`}>Password</h6>
      <CustomInput
        type="password"
        value={password.password}
        staticLabel={{ header: 'Old password', label: 'Old password' }}
        onChange={e => handlePasswordChange('password', e.target.value)}
        validate={validatePassword}
        setError={err => handleErrorsChange('password', err)}
      />
      <CustomInput
        type="password"
        value={password.newPassword}
        staticLabel={{ header: 'New password', label: 'New password' }}
        onChange={e => handlePasswordChange('newPassword', e.target.value)}
        validate={validatePassword}
        setError={err => handleErrorsChange('newPassword', err)}
      />
      <CustomInput
        type="password"
        value={password.repeatPassword}
        staticLabel={{
          header: 'Repeat new password',
          label: 'Repeat new password',
        }}
        onChange={e => handlePasswordChange('repeatPassword', e.target.value)}
        validate={() =>
          validateRepeatPassword(password.newPassword, password.repeatPassword)
        }
        setError={err => handleErrorsChange('repeatPassword', err)}
      />
      <div className={styles['button-wrapper']}>
        <Button
          type="button"
          text="Save"
          className="primary medium"
          fullWidth={true}
          isDisabled={!formIsValid}
          onClick={() => console.log('AAAAAAAAAAA')}
        />
        <Button
          type="button"
          text="Save"
          className="primary medium"
          fullWidth={true}
          onClick={() => console.log(errors, formIsValid)}
        />
      </div>
    </div>
  );
};

export default Account;
