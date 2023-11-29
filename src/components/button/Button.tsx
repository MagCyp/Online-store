import { FC } from 'react';

import { Props } from '@components/button/types';

import styles from '@components/button/Button.module.scss';

const Button: FC<Props> = ({ className, text, onClick, type }) => {
  return (
    <button className={`${styles[className]}`} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
