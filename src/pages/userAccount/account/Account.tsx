import { FC, useState, useEffect } from 'react';

import CustomInput from '@components/customInput/Input';
import Button from '@components/button/Button';

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
    firstName: firstName || '',
    lastName: lastName || '',
    phone: phone || '',
    email: email || '',
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

  const [userAccountDataErrors, setUserAccountDataErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const [passwordErrors, setPasswordErrors] = useState({
    password: '',
    newPassword: '',
    repeatPassword: '',
  });

  const handleUserAccountDataChange = (field: string, value: string) => {
    setUserAccountData(prevState => ({ ...prevState, [field]: value }));
  };

  const handleUserAccountDataErrorsChange = (field: string, value: string) => {
    setUserAccountDataErrors(prevState => ({ ...prevState, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPassword(prevState => ({ ...prevState, [field]: value }));
  };

  const handlePasswordErrorsChange = (field: string, value: string) => {
    setPasswordErrors(prevState => ({ ...prevState, [field]: value }));
  };

  const infoIsValid = !(
    !!userAccountDataErrors.firstName ||
    !!userAccountDataErrors.lastName ||
    !!userAccountDataErrors.phone ||
    !!userAccountDataErrors.email
  );

  const passwordIsValid = !(
    !!passwordErrors.password ||
    !!passwordErrors.newPassword ||
    !!passwordErrors.repeatPassword
  );

  const passwordIsChanging = !(
    password.password === '' &&
    password.newPassword === '' &&
    password.repeatPassword === ''
  );

  const formIsValid =
    ((infoIsValid && passwordIsValid) ||
      (infoIsValid && !passwordIsChanging)) &&
    password.newPassword === password.repeatPassword;

  return (
    <div className={styles['account-form']}>
      <h6 className={`bold ${styles['account-form-header']}`}>
        Account Details
      </h6>

      <CustomInput
        type="text"
        value={userAccountData.firstName}
        staticLabel={{ header: 'First name *', label: 'First name' }}
        error={userAccountDataErrors.firstName}
        onChange={e => handleUserAccountDataChange('firstName', e.target.value)}
        setError={err => handleUserAccountDataErrorsChange('firstName', err)}
        validate={validateFirstName}
      />
      <CustomInput
        type="text"
        value={userAccountData.lastName}
        staticLabel={{ header: 'Last name *', label: 'Last name' }}
        error={userAccountDataErrors.lastName}
        validate={validateLastName}
        onChange={e => handleUserAccountDataChange('lastName', e.target.value)}
        setError={err => handleUserAccountDataErrorsChange('lastName', err)}
      />
      <CustomInput
        type="text"
        value={userAccountData.phone}
        staticLabel={{ header: 'Phone Number', label: 'Phone Number' }}
        error={userAccountDataErrors.phone}
        onChange={e => handleUserAccountDataChange('phone', e.target.value)}
        validate={validatePhone}
        setError={err => handleUserAccountDataErrorsChange('phone', err)}
      />
      <CustomInput
        type="email"
        value={userAccountData.email}
        staticLabel={{ header: 'Email *', label: 'Email *' }}
        error={userAccountDataErrors.email}
        onChange={e => handleUserAccountDataChange('email', e.target.value)}
        validate={validateEmail}
        setError={err => handleUserAccountDataErrorsChange('email', err)}
      />
      <h6 className={`bold ${styles['addresses-form-header']}`}>Password</h6>
      <CustomInput
        type="password"
        value={password.password}
        staticLabel={{ header: 'Old password', label: '' }}
        error={!passwordIsChanging ? '' : passwordErrors.password}
        onChange={e => handlePasswordChange('password', e.target.value)}
        validate={validatePassword}
        setError={err => handlePasswordErrorsChange('password', err)}
      />
      <CustomInput
        type="password"
        value={password.newPassword}
        staticLabel={{ header: 'New password', label: '' }}
        error={!passwordIsChanging ? '' : passwordErrors.newPassword}
        onChange={e => handlePasswordChange('newPassword', e.target.value)}
        validate={validatePassword}
        setError={err => handlePasswordErrorsChange('newPassword', err)}
      />
      <CustomInput
        type="password"
        value={password.repeatPassword}
        staticLabel={{
          header: 'Repeat new password',
          label: '',
        }}
        error={!passwordIsChanging ? '' : passwordErrors.repeatPassword}
        onChange={e => handlePasswordChange('repeatPassword', e.target.value)}
        validate={() =>
          validateRepeatPassword(password.newPassword, password.repeatPassword)
        }
        setError={err => handlePasswordErrorsChange('repeatPassword', err)}
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
      </div>
    </div>
  );
};

export default Account;
