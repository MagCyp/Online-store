import { useForm } from 'react-hook-form';

import { UserLoginData } from '@models/models';

export const useSignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginData>({
    values: {
      email: '',
      password: '',
    },
  });

  return {
    register,
    handleSubmit,
    reset,
    errors,
  };
};
