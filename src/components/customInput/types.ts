import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { UserLoginData } from '../../models/models';
import { UserRegisterData } from '../../models/models';

type CombinedRegisterType = UseFormRegister<UserLoginData | UserRegisterData>;

export type ValidationSchema = {
  validate?: (value: string) => boolean | string;
  required: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
};

export type TProps = {
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  register?: CombinedRegisterType | undefined;
  validationSchema: ValidationSchema;
  label?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
};
