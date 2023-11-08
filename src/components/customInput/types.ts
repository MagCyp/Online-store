import { HTMLInputTypeAttribute } from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { UserData } from '../auth/signUpForm/types';

export type TProps = {
  register?: UseFormRegisterReturn<string>;
  label?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  errors: FieldErrors<UserData> | undefined;
  errorsMessage?: string | undefined;
};
