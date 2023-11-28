import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';

import Error from '../../error/Error';
import CustomInput from '../../customInput/Input';
import Button from '../../button/Button';

import { useAppDispatch } from '../../../hooks/redux/redux';
import { useSignUpForm } from '../../../hooks/auth/useSignUpForm/useSignUpForm';

import { useRegistrationUserMutation } from '../../../store/services/authApi';
import { setUser } from '../../../store/slices/user/userSlice';

import {
  isEmail,
  isFirstName,
  isLastName,
  isPassword,
  isPhone,
} from '../../../utils/validation/validation';

import { CustomError, UserRegisterData } from '../../../models/models';

import styles from './SignUpForm.module.scss';

const SignUpForm: FC = () => {
  const { errors, handleSubmit, register, reset, password } = useSignUpForm();
  const [
    registrationUser,
    { data: registrationData, isSuccess, isError, error, isLoading },
  ] = useRegistrationUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const typedError = error as CustomError;

  const onSubmit: SubmitHandler<UserRegisterData> = async data => {
    await registrationUser(data);

    if (registrationData) {
      reset();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ token: registrationData.jwt }));
      navigate('/');
    } else if (isError) {
      console.log(typedError.error);
    }
  }, [isSuccess, isError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={styles['form-container']}
    >
      {isError && <Error className="default-red" message={typedError.data} />}
      <CustomInput
        type="text"
        placeholder="First Name"
        register={register}
        name="firstName"
        validationSchema={isFirstName}
        containerClass="default-input"
        inputClass="default-input"
        labelClass="default-input"
      />
      {errors?.firstName && (
        <Error className="default-red" message={errors.firstName.message} />
      )}
      <CustomInput
        type="text"
        placeholder="Last Name"
        register={register}
        name="lastName"
        validationSchema={isLastName}
        containerClass="default-input"
        inputClass="default-input"
        labelClass="default-input"
      />
      {errors?.lastName && (
        <Error className="default-red" message={errors.lastName.message} />
      )}
      <CustomInput
        type="tel"
        placeholder="Phone"
        register={register}
        name="phoneNumber"
        validationSchema={isPhone}
        containerClass="default-input"
        inputClass="default-input"
        labelClass="default-input"
      />
      {errors?.phoneNumber && (
        <Error className="default-red" message={errors.phoneNumber.message} />
      )}
      <CustomInput
        type="email"
        placeholder="Email"
        register={register}
        name="email"
        validationSchema={isEmail}
        containerClass="default-input"
        inputClass="default-input"
        labelClass="default-input"
      />
      {errors?.email && (
        <Error className="default-red" message={errors.email.message} />
      )}
      <CustomInput
        type="password"
        placeholder="Password"
        register={register}
        name="password"
        validationSchema={isPassword}
        containerClass="default-input"
        inputClass="default-input"
        labelClass="default-input"
      />
      {errors?.password && (
        <Error className="default-red" message={errors.password.message} />
      )}
      <CustomInput
        type="password"
        placeholder="Confirm Password"
        register={register}
        name="repeatPassword"
        validationSchema={{
          validate: value => value === password || 'Passwords do not match',
          required: 'Passwords do not match',
        }}
        containerClass="default-input"
        inputClass="default-input"
        labelClass="default-input"
      />
      {errors?.repeatPassword && (
        <Error
          className="default-red"
          message={errors.repeatPassword.message}
        />
      )}
      {isLoading ? (
        <Button className="white-button" type="submit" text="Loading..." />
      ) : (
        <Button className="white-button" type="submit" text="Register" />
      )}
    </form>
  );
};

export default SignUpForm;
