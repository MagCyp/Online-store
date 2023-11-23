import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useRegistrationUserMutation } from '../../../store/services/authApi';
import { setUser } from '../../../store/slices/user/userSlice';

import Error from '../../error/Error';

import {
  isEmail,
  isFirstName,
  isLastName,
  isPassword,
  isPhone,
} from '../../../utils/validation/validation';

import { useAppDispatch } from '../../../hooks/redux/redux';

import { CustomError, UserData } from './types';

const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<UserData>({
    values: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });
  const [
    registrationUser,
    { data: registrationData, isSuccess, isError, error, isLoading },
  ] = useRegistrationUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const typedError = error as CustomError;
  const password = watch('password');

  const onSubmit: SubmitHandler<UserData> = async data => {
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
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '450px',
        gap: '10px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
    >
      {isError && <Error className="default-red" message={typedError.data} />}
      <input
        type="text"
        placeholder="First Name"
        {...register('firstName', isFirstName)}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '100%',
        }}
      />
      {errors?.firstName && (
        <Error className="default-red" message={errors.firstName.message} />
      )}
      <input
        type="text"
        placeholder="Last Name"
        {...register('lastName', isLastName)}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '100%',
        }}
      />
      {errors?.lastName && (
        <Error className="default-red" message={errors.lastName.message} />
      )}
      <input
        type="tel"
        placeholder="Phone"
        {...register('phoneNumber', isPhone)}
        inputMode="numeric"
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '100%',
        }}
      />
      {errors?.phoneNumber && (
        <Error className="default-red" message={errors.phoneNumber.message} />
      )}
      <input
        type="email"
        placeholder="Email"
        {...register('email', isEmail)}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '100%',
        }}
      />
      {errors?.email && (
        <Error className="default-red" message={errors.email.message} />
      )}
      <input
        type="password"
        placeholder="Password"
        {...register('password', isPassword)}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '100%',
        }}
      />
      {errors?.password && (
        <Error className="default-red" message={errors.password.message} />
      )}
      <input
        type="password"
        placeholder="Confirm Password"
        {...register('repeatPassword', {
          validate: value => value === password || 'Passwords do not match',
          required: 'Passwords do not match',
        })}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '100%',
        }}
      />
      {errors?.repeatPassword && (
        <Error
          className="default-red"
          message={errors.repeatPassword.message}
        />
      )}
      {isLoading ? (
        <button
          type="submit"
          style={{
            background: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Loading...
        </button>
      ) : (
        <button
          type="submit"
          style={{
            background: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Login
        </button>
      )}
    </form>
  );
};

export default SignUpForm;
