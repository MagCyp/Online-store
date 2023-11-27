import { FC } from 'react';

import Error from '../error/Error';

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
  errors,
  errorsMessage,
  label,
}) => {
  return (
    <>
      <div className={containerClass ? styles[containerClass] : ''}>
        {label && (
          <label
            className={labelClass ? styles[labelClass] : ''}
            htmlFor={name}
          >
            {label}:
          </label>
        )}
        <input
          className={inputClass ? styles[inputClass] : ''}
          type={type}
          placeholder={placeholder}
          {...register}
          name={name ? name : ''}
          id={name ? name : ''}
        />
      </div>
      {errors && <Error className="default-red" message={errorsMessage} />}
    </>
  );
};

export default CustomInput;
