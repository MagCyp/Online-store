import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { generateClassNames } from '@utils/generateClassNames/className';

import { Props } from '@components/button/types';

import styles from '@components/button/Button.module.scss';

const Button: FC<Props> = ({
  className,
  text,
  type,
  icon,
  isDisabled,
  iconRight,
  iconLeft,
  onClick,
  onClickEvent,
  href,
  isHidden,
  fullWidth,
  style,
}) => {
  const buttonClassNames = generateClassNames(className, styles);

  const buttonStyles: React.CSSProperties = {
    visibility: isHidden ? 'hidden' : 'visible',
    width: fullWidth ? '100%' : undefined,
    ...style,
  };

  return (
    <button
      className={buttonClassNames}
      style={buttonStyles} // add
      type={type}
      onClick={onClick || onClickEvent}
      disabled={isDisabled}
    >
      {icon && icon}
      {iconLeft && iconLeft}
      {href ? <Link to={href}>{text}</Link> : <p>{text}</p>}
      {iconRight && iconRight}
    </button>
  );
};

export default Button;
