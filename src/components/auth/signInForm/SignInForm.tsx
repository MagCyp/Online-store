import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import Error from '../../error/Error';

import { useAppDispatch } from '../../../hooks/redux/redux';

import { useLoginUserMutation } from '../../../store/services/authApi';
import { setUser } from '../../../store/slices/user/userSlice';

import { isEmail, isPassword } from '../../../utils/validation/validation';

import { CustomError, UserData } from './types';

const SignInForm: FC = () => {
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
  const [loginUser, { data: loginData, isSuccess, isError, error, isLoading }] =
    useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const typedError = error as CustomError;

  const onSubmit: SubmitHandler<UserData> = async data => {
    await loginUser(data);

    if (loginData) {
      reset();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ token: loginData.jwt }));
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

export default SignInForm;
