import { FC, useEffect } from 'react';

import Error from '@components/error/Error';
import CustomInput from '@components/customInput/Input';
import Button from '@components/button/Button';

import useCustomRegister from '@hooks/auth/useSubmitRegister/useSubmitRegister';

import { setUser } from '@store/slices/user/userSlice';

import styles from '@components/auth/signUpForm/SignUpForm.module.scss';

const SignUpForm: FC = () => {
  const {
    authState,
    dispatch,
    emailError,
    isError,
    isLoading,
    isSuccess,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    passwordError,
    registrationData,
    typedError,
    firstNameError,
    lastNameError,
    phoneError,
    repeatPasswordError,
    onChangeFirstName,
    onChangeLastName,
    onChangePhone,
    onChangeRepeatPassword,
    navigate,
  } = useCustomRegister();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ token: registrationData.jwt }));
      navigate('/');
    } else if (isError) {
      console.log(typedError.error);
    }
  }, [isSuccess, isError]);

  return (
    <form onSubmit={onSubmit} noValidate className={styles['form-container']}>
      {isError && <Error className="default-red" message={typedError.data} />}
      <CustomInput
        error={firstNameError}
        type="text"
        label="First name"
        value={authState.firstName}
        onChange={onChangeFirstName}
      />
      {firstNameError && (
        <Error className="default-red" message={firstNameError} />
      )}
      <CustomInput
        error={lastNameError}
        type="text"
        label="Last name"
        value={authState.lastName}
        onChange={onChangeLastName}
      />
      {lastNameError && (
        <Error className="default-red" message={lastNameError} />
      )}
      <CustomInput
        error={phoneError}
        type="tel"
        label="Phone number"
        value={authState.phoneNumber}
        onChange={onChangePhone}
      />
      {phoneError && <Error className="default-red" message={phoneError} />}
      <CustomInput
        error={emailError}
        type="email"
        label="Email address"
        value={authState.email}
        onChange={onChangeEmail}
      />
      {emailError && <Error className="default-red" message={emailError} />}
      <CustomInput
        error={passwordError}
        type="password"
        label="Password"
        value={authState.password}
        onChange={onChangePassword}
      />
      {passwordError && (
        <Error className="default-red" message={passwordError} />
      )}
      <CustomInput
        error={repeatPasswordError}
        type="password"
        label="Confirm password"
        value={authState.repeatPassword}
        onChange={onChangeRepeatPassword}
      />
      {repeatPasswordError && (
        <Error className="default-red" message={repeatPasswordError} />
      )}
      {isLoading ? (
        <Button className="primary medium" type="submit" text="Loading..." />
      ) : (
        <Button className="primary medium" type="submit" text="Register" />
      )}
    </form>
  );
};

export default SignUpForm;
