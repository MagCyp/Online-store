import { FC } from 'react';
import Error from '../error/Error';
import { TProps } from './types';

const CustomInput: FC<TProps> = ({
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
      <div>
        <label htmlFor={name}>{label}: </label>
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          name={name}
          id={name}
        />
      </div>
      {errors && <Error message={errorsMessage} />}
    </>
  );
};

export default CustomInput;
