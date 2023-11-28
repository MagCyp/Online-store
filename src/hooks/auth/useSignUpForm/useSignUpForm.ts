import { useForm } from 'react-hook-form';

import { UserRegisterData } from '../../../models/models';

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<UserRegisterData>({
    values: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const password = watch('password');

  return {
    errors,
    handleSubmit,
    register,
    reset,
    password,
  };
};
