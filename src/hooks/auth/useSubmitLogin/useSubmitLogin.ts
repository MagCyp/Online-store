import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';

import { useLoginUserMutation } from '@store/services/authApi';
import { setLogin } from '@/store/slices/auth/login/loginSlice';

import { validateEmail, validatePassword } from '@utils/validation/validation';

import { LoginState } from '@/store/slices/auth/login/types';
import { CustomError } from '@/models/models';

const useCustomLogin = () => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector(state => state.login);
  const [loginUser, { data: loginData, isSuccess, isError, error, isLoading }] =
    useLoginUserMutation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    const emailErrorResult = validateEmail(authState.email);
    const passwordErrorResult = validatePassword(authState.password);

    setEmailError(emailErrorResult);
    setPasswordError(passwordErrorResult);

    const data = {
      email: authState.email,
      password: authState.password,
    };

    if (!emailErrorResult && !passwordErrorResult) {
      await loginUser(data);

      if (loginData) {
        const clearData: LoginState = {
          email: '',
          password: '',
        };

        dispatch(setLogin(clearData));
      }
    }
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const error = validateEmail(value);
    dispatch(setLogin({ ...authState, email: value }));

    if (formSubmitted) {
      setEmailError(error);
    }
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const error = validatePassword(value);
    dispatch(setLogin({ ...authState, password: value }));

    if (formSubmitted) {
      setPasswordError(error);
    }
  };

  const typedError = error as CustomError;

  return {
    loginData,
    dispatch,
    emailError,
    passwordError,
    onSubmit,
    isSuccess,
    isError,
    isLoading,
    handleEmail,
    handlePassword,
    typedError,
    authState,
    navigate,
  };
};

export default useCustomLogin;
