import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import Error from '../../error/Error';

import { isEmail, isPassword } from '../../../utils/validation/validation';

import { UserData } from './types';

const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>({
    values: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<UserData> = data => {
    console.log(data);
    reset();
  };

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
      {errors?.email && <Error message={errors.email.message} />}
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
      {errors?.password && <Error message={errors.password.message} />}
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
    </form>
  );
};

export default SignInForm;
