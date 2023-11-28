import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { ValidationSchema } from '../../utils/validation/types';

import { UserLoginData } from '../../models/models';
import { UserRegisterData } from '../../models/models';

type CombinedRegisterType = UseFormRegister<UserLoginData | UserRegisterData>;

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
