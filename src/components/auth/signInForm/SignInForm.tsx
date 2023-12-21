import { FC, useEffect } from 'react';

import Error from '@components/error/Error';
import CustomInput from '@components/customInput/Input';
import Button from '@components/button/Button';

import useCustomLogin from '@hooks/auth/useSubmitLogin/useSubmitLogin';

import { setUser } from '@store/slices/user/userSlice';

import styles from '@components/auth/signInForm/SignInForm.module.scss';

const SignInForm: FC = () => {
  const {
    loginData,
    emailError,
    handleEmail,
    handlePassword,
    onSubmit,
    authState,
    isError,
    isLoading,
    isSuccess,
    passwordError,
    typedError,
    dispatch,
    navigate,
  } = useCustomLogin();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ token: loginData.jwt }));
      navigate('/');
    } else if (isError) {
      console.log(typedError.error);
    }
  }, [isSuccess, isError]);

  return (
    <form onSubmit={onSubmit} noValidate className={styles['form-container']}>
      {isError && <Error className="default-red" message={typedError.data} />}
      <CustomInput
        error={emailError}
        type="email"
        value={authState.email}
        onChange={handleEmail}
        label="Email"
      />
      {emailError && <Error className="default-red" message={emailError} />}
      <CustomInput
        error={passwordError}
        type="password"
        label="Password"
        value={authState.password}
        onChange={handlePassword}
      />
      {passwordError && (
        <Error className="default-red" message={passwordError} />
      )}
      {isLoading ? (
        <Button className="primary medium" type="submit" text="Loading..." />
      ) : (
        <Button className="primary medium" type="submit" text="Login" />
      )}
    </form>
  );
};

export default SignInForm;
