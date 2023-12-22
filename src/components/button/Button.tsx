import { FC } from 'react';
import { Link } from 'react-router-dom';

import { generateClassNames } from '@utils/generateClassNames/className';

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
  isHidden,
}) => {
  const buttonClassNames = generateClassNames(className, styles);

  return (
    <button
      className={buttonClassNames}
      style={{ visibility: isHidden ? 'hidden' : 'visible' }}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {iconLeft && iconLeft}
      {href ? <Link to={href}>{text}</Link> : <p>{text}</p>}
      {iconRight && iconRight}
    </button>
  );
};

export default Button;
