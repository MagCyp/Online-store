import { FC, useState, useEffect } from 'react';

import CustomInput from '@components/customInput/Input';
import CheckBox from '@components/checkBox/CheckBox';
import Button from '@components/button/Button';

import { useAppDispatch } from '@hooks/redux/redux';

import { register } from '@store/data/auth/registerThunk';

import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePhone,
} from '@utils/validation/validation';

import { Errors } from '@components/authForm/types';

import styles from '@components/authForm/authForm.module.scss';

interface RegisterFormProps {
  onAuthSuccess: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<Errors>({
    firstNameError: 'err',
    lastNameError: 'err',
    phoneError: 'err',
    emailError: 'err',
    passwordError: 'err',
    repeatPasswordError: 'err',
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (repeatPassword !== password) {
      setError(prev => ({
        ...prev,
        repeatPasswordError: 'Passwords do not match',
      }));
    } else {
      setError(prev => ({ ...prev, repeatPasswordError: '' }));
    }
  }, [repeatPassword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      register({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      }),
    ).then(result => {
      if (result.meta.requestStatus === 'fulfilled' && onAuthSuccess) {
        onAuthSuccess();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        setError={error => setError(prev => ({ ...prev, phoneError: error }))}
        staticLabel={{ header: 'Phone', label: '+380983516319' }}
        validate={validatePhone}
      />
      <CustomInput
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        setError={error => setError(prev => ({ ...prev, emailError: error }))}
        staticLabel={{ header: 'Email', label: 'ivan@ivanov.com' }}
        validate={validateEmail}
      />
      <CustomInput
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        setError={error =>
          setError(prev => ({ ...prev, passwordError: error }))
        }
        staticLabel={{
          header: 'Password (8 characters minimum)',
          label: 'Aa1234.!',
        }}
        validate={validatePassword}
      />
      <CustomInput
        type="password"
        value={repeatPassword}
        onChange={e => setRepeatPassword(e.target.value)}
        error={
          error.repeatPasswordError !== ('err' || '')
            ? error.repeatPasswordError
            : ''
        }
        staticLabel={{
          header: 'Repeat password',
          label: 'previous password',
        }}
        validate={validatePassword}
      />
      <div className={styles['options']}>
        <CheckBox
          label="I agree with Privacy Policy and Terms of Use"
          small
          onChange={() => setChecked(!checked)}
        />
      </div>
      <Button
        type="submit"
        text="Sign up"
        className="primary medium"
        fullWidth
        isDisabled={
          !!error.emailError ||
          !!error.passwordError ||
          !!error.firstNameError ||
          !!error.lastNameError ||
          !!error.repeatPasswordError ||
          !!error.phoneError ||
          !checked
        }
      />
    </form>
  );
};

export default RegisterForm;
