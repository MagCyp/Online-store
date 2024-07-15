import { FC, useState } from 'react';

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
  const [password, setPassword] = useState<{
    password: string;
    newPassword: string;
    repeatPassword: string;
  }>({
    password: '',
    newPassword: '',
    repeatPassword: '',
  });

  return (
    <div className={styles['account-form']}>
      <h6 className={`bold ${styles['account-form-header']}`}>
        Account Details
      </h6>
      <CustomInput
        type="text"
        value={firstName}
        staticLabel={{ header: 'First name *', label: 'First name' }}
        validate={validateFirstName}
      />
      <CustomInput
        type="text"
        value={lastName}
        staticLabel={{ header: 'Last name *', label: 'Last name' }}
        validate={validateLastName}
      />
      <CustomInput
        type="text"
        value={phone}
        staticLabel={{ header: 'Phone Number', label: 'Phone Number' }}
        validate={validatePhone}
      />
      <CustomInput
        type="email"
        value={email}
        staticLabel={{ header: 'Email *', label: 'Email *' }}
        validate={validateEmail}
      />
      <h6 className={`bold ${styles['addresses-form-header']}`}>Password</h6>
      <CustomInput
        type="password"
        value={password.password}
        staticLabel={{ header: 'Old password', label: 'Old password' }}
        validate={validatePassword}
      />
      <CustomInput
        type="password"
        value={password.newPassword}
        staticLabel={{ header: 'New password', label: 'New password' }}
        validate={validatePassword}
      />
      <CustomInput
        type="password"
        value={password.repeatPassword}
        staticLabel={{
          header: 'Repeat new password',
          label: 'Repeat new password',
        }}
        validate={() =>
          validateRepeatPassword(password.newPassword, password.repeatPassword)
        }
      />
      <div className={styles['button-wrapper']}>
        <Button
          type="button"
          text="Save"
          className="primary medium"
          fullWidth={true}
        />
      </div>
    </div>
  );
};

export default Account;
