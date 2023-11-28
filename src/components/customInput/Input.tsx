import { FC } from 'react';

import { TProps } from './types';

import styles from './Input.module.scss';

const CustomInput: FC<TProps> = ({
  containerClass,
  labelClass,
  inputClass,
  type,
  placeholder,
  register,
  name,
  validationSchema,
  label,
}) => {
  return (
    <div className={containerClass && styles[containerClass]}>
      {label && (
        <label className={labelClass && styles[labelClass]} htmlFor={name}>
          {label}:
        </label>
      )}
      <input
        className={inputClass && styles[inputClass]}
        type={type}
        placeholder={placeholder}
        {...(register && register(name as any, validationSchema))}
        name={name && name}
        id={name && name}
      />
    </div>
  );
};

export default CustomInput;
