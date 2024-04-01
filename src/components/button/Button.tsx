import { FC } from 'react';
import { Link } from 'react-router-dom';

import { generateClassNames } from '@utils/generateClassNames/className';

import { CSSProperties, Props } from '@components/button/types';

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
  fullWidth,
}) => {
  const buttonClassNames = generateClassNames(className, styles);

  const buttonStyles: CSSProperties = {
    visibility: isHidden ? 'hidden' : 'visible',
    width: fullWidth ? '100%' : undefined,
  };

  return (
    <button
      className={buttonClassNames}
      style={buttonStyles}
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
