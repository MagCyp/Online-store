import { FC } from 'react';

import { generateClassNames } from '@utils/generateClassNames/className';

import { Props } from '@components/iconButton/types';

import styles from '@components/iconButton/IconButton.module.scss';

const IconButton: FC<Props> = ({
  className,
  icon,
  type,
  isDisabled,
  onClick,
}) => {
  const buttonClassNames = generateClassNames(className, styles);

  return (
    <button
      className={buttonClassNames}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon}
    </button>
  );
};

export default IconButton;
