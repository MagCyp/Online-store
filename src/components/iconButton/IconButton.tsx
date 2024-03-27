import React from 'react';

import { generateClassNames } from '@utils/generateClassNames/className';

import { Props } from '@components/iconButton/types';

import styles from '@components/iconButton/IconButton.module.scss';

const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, icon, type, isDisabled, onClick }, ref) => {
    const buttonClassNames = generateClassNames(className, styles);

    return (
      <button
        ref={ref}
        className={buttonClassNames}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
      >
        {icon}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
