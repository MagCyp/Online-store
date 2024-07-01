import React from 'react';
import { Link } from 'react-router-dom';

import { generateClassNames } from '@utils/generateClassNames/className';

import { Props } from '@components/iconButton/types';

import styles from '@components/iconButton/IconButton.module.scss';

const IconButton = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  Props
>(({ className, icon, type, isDisabled, onClick, to }, ref) => {
  const buttonClassNames = generateClassNames(className, styles);

  if (to) {
    return (
      <Link
        to={to}
        className={buttonClassNames}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {icon}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={buttonClassNames}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon}
    </button>
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;
