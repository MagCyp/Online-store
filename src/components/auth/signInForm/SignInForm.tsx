import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';

import Error from '@components/error/Error';
import CustomInput from '@components/customInput/Input';
import Button from '@components/button/Button';

import { useAppDispatch } from '@hooks/redux/redux';
import { useSignInForm } from '@hooks/auth/useSignInForm/useSignInForm';

import { useLoginUserMutation } from '@store/services/authApi';
import { setUser } from '@store/slices/user/userSlice';

import { isEmail, isPassword } from '@utils/validation/validation';

import { CustomError, UserLoginData } from '@models/models';

import styles from '@components/auth/signInForm/SignInForm.module.scss';

const SignInForm: FC = () => {
  const { errors, handleSubmit, register, reset } = useSignInForm();
  const [loginUser, { data: loginData, isSuccess, isError, error, isLoading }] =
    useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const typedError = error as CustomError;

  const onSubmit: SubmitHandler<UserLoginData> = async data => {
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
      className={styles['form-container']}
    >
      {isError && <Error className="default-red" message={typedError.data} />}
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
      {isLoading ? (
        <Button className="white-button" type="submit" text="Loading..." />
      ) : (
        <Button className="white-button" type="submit" text="Login" />
      )}
    </form>
  );
};

export default SignInForm;
