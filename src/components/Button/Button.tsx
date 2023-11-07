import { FC } from 'react';
import { Props } from './types';

const Button: FC<Props> = ({ text, onClick, type }) => {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
