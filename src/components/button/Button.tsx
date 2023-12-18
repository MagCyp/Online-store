import { FC } from 'react';

import { generateClassNames } from '@/utils/generateClassNames/className';

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
  href,
  isVisible,
}) => {
  const buttonClassNames = generateClassNames(className, styles);

  return (
    <button
      className={buttonClassNames}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {iconLeft && iconLeft}
      <a href={href && href}>{text}</a>
      {iconRight && iconRight}
    </button>
  );
};

export default Button;
