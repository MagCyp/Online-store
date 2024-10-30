import { FC, useState } from 'react';
import axios, { AxiosError } from 'axios';

import CustomInput from '@components/customInput/Input';
import Button from '@components/button/Button';
import ModalWindow from '@/components/modalWindow/ModalWindow';

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

const path = '/account';
const baseURL = process.env.REACT_APP_API_URL;

const Account: FC<Props> = ({
  firstName,
  lastName,
  phoneNumber,
  email,
  onUpdateUserData,
}) => {
  const [userAccountData, setUserAccountData] = useState<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  }>({
    firstName: firstName || '',
    lastName: lastName || '',
    phoneNumber: phoneNumber || '',
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

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

  const onSave = async () => {
    try {
      const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

      const params = new URLSearchParams();
      Object.keys(userAccountData).forEach(key => {
        params.append(
          key,
          userAccountData[key as keyof typeof userAccountData],
        );
      });

      if (passwordIsChanging && passwordIsValid) {
        params.append('oldPassword', password.password);
        params.append('newPassword', password.newPassword);
      }

      const response = await axios.put(`${baseURL}${path}`, params, {
        headers: {
          Authorization: `${jwt}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('User data updated successfully:', response.data);

      onUpdateUserData({
        firstName: userAccountData.firstName,
        lastName: userAccountData.lastName,
        phoneNumber: userAccountData.phoneNumber,
        email: userAccountData.email,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          setModalMessage('The current password was entered incorrectly.');
          setIsModalOpen(true);
        } else {
          console.error('Error updating user data:', axiosError.message);
        }
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

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
        value={userAccountData.phoneNumber}
        staticLabel={{ header: 'Phone Number', label: 'Phone Number' }}
        error={userAccountDataErrors.phone}
        onChange={e =>
          handleUserAccountDataChange('phoneNumber', e.target.value)
        }
        validate={validatePhone}
        setError={err => handleUserAccountDataErrorsChange('phoneNumber', err)}
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
          onClick={onSave}
        />
      </div>
      <ModalWindow
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        header="Error"
        message={modalMessage}
        type="error"
        firstButtonText="OK"
        firstButtonClose={true}
      />
    </div>
  );
};

export default Account;
