import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/redux/redux';

import { useRegistrationUserMutation } from '@store/services/authApi';
import { setRegister } from '@store/slices/auth/register/registerSlice';

import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePhone,
  validateRepeatPassword,
} from '@utils/validation/validation';

import { RegisterState } from '@store/slices/auth/register/types';
import { CustomError } from '@models/models';

const useCustomRegister = () => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector(state => state.register);
  const [
    registrationUser,
    { data: registrationData, isSuccess, isError, error, isLoading },
  ] = useRegistrationUserMutation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    const emailErrorResult = validateEmail(authState.email);
    const passwordErrorResult = validatePassword(authState.password);
    const firstNameErrorResult = validateFirstName(authState.firstName);
    const lastNameErrorResult = validateLastName(authState.lastName);
    const phoneErrorResult = validatePhone(authState.phoneNumber);
    const repeatPasswordErrorResult = validateRepeatPassword(
      authState.password,
      authState.repeatPassword,
    );

    setEmailError(emailErrorResult);
    setPasswordError(passwordErrorResult);
    setFirstNameError(firstNameErrorResult);
    setLastNameError(lastNameErrorResult);
    setPhoneError(phoneErrorResult);
    setRepeatPasswordError(repeatPasswordErrorResult);

    const data = {
      email: authState.email,
      password: authState.password,
      firstName: authState.firstName || '',
      lastName: authState.lastName || '',
      phoneNumber: authState.phoneNumber || '',
      repeatPassword: authState.repeatPassword || '',
    };

    if (
      !emailErrorResult &&
      !passwordErrorResult &&
      !firstNameErrorResult &&
      !lastNameErrorResult &&
      !phoneErrorResult &&
      !repeatPasswordErrorResult
    ) {
      await registrationUser(data);

      if (registrationData) {
        const clearData: RegisterState = {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          repeatPassword: '',
        };

        dispatch(setRegister(clearData));
      }
    }
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const error = validateEmail(value);

    dispatch(setRegister({ ...authState, email: value }));

    if (formSubmitted) {
      setEmailError(error);
    }
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const error = validatePassword(value);

    dispatch(setRegister({ ...authState, password: value }));

    if (formSubmitted) {
      setPasswordError(error);
    }
  };

  const onChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const error = validateFirstName(value);

    dispatch(setRegister({ ...authState, firstName: value }));

    if (formSubmitted) {
      setFirstNameError(error);
    }
  };

  const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const error = validateLastName(value);

    dispatch(setRegister({ ...authState, lastName: value }));

    if (formSubmitted) {
      setLastNameError(error);
    }
  };

  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const error = validatePhone(value);

    dispatch(setRegister({ ...authState, phoneNumber: value }));

    if (formSubmitted) {
      setPhoneError(error);
    }
  };

  const onChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const error = validateRepeatPassword(authState.password, value);

    dispatch(setRegister({ ...authState, repeatPassword: value }));

    if (formSubmitted) {
      setRepeatPasswordError(error);
    }
  };

  const typedError = error as CustomError;

  return {
    registrationData,
    dispatch,
    emailError,
    passwordError,
    firstNameError,
    lastNameError,
    phoneError,
    repeatPasswordError,
    onSubmit,
    isSuccess,
    isError,
    isLoading,
    onChangeEmail,
    onChangePassword,
    typedError,
    authState,
    onChangeFirstName,
    onChangeLastName,
    onChangePhone,
    onChangeRepeatPassword,
    navigate,
  };
};

export default useCustomRegister;
