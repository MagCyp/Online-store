import { FC, useEffect, useState } from 'react';

import CustomInput from '@components/customInput/Input';
import CheckBox from '@components/checkBox/CheckBox';
import Button from '@components/button/Button';

import { useAppDispatch } from '@hooks/redux/redux';

import { login } from '@store/data/auth/loginThunk';

import { validateEmail, validatePassword } from '@utils/validation/validation';

import { Errors, FormProps } from '@components/authForm/types';

import styles from '@components/authForm/authForm.module.scss';

const LoginForm: FC<FormProps> = ({ onAuthSuccess, reset }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<Errors>({
    emailError: 'err',
    passwordError: 'err',
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password, rememberMe })).then(result => {
      if (result.meta.requestStatus === 'fulfilled' && onAuthSuccess) {
        onAuthSuccess('login');
      }
    });
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
    setRememberMe(false);
    setError({
      emailError: 'err',
      passwordError: 'err',
    });
  }, [reset]);

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        setError={error => setError(prev => ({ ...prev, emailError: error }))}
        staticLabel={{ header: 'Email', label: 'ivanov@ivan.com' }}
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
      <div className={styles['options']}>
        <CheckBox
          label="Remember me"
          small
          onChange={() => setRememberMe(!rememberMe)}
        />
        <Button
          className="link-gray medium"
          text="Forgot password"
          type="button"
        />
      </div>
      <Button
        type="submit"
        text="Sign In"
        className="primary medium"
        fullWidth
        isDisabled={!!error.emailError || !!error.passwordError}
      />
    </form>
  );
};

export default LoginForm;
