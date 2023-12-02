import { FC } from 'react';

import { Props } from '@components/button/types';

import styles from '@components/button/Button.module.scss';

const Button: FC<Props> = ({
  className,
  text,
  type,
  isDisabled,
  iconRight,
  iconLeft,
  onClick,
}) => {
  const buttonClassNames = Array.isArray(className)
    ? className.map(name => styles[name]).join(' ')
    : className
        .split(' ')
        .map(name => styles[name])
        .join(' ');

  return (
    <button
      className={buttonClassNames}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {iconLeft && iconLeft}
      <p>{text}</p>
      {iconRight && iconRight}
    </button>
  );
};

export default Button;
