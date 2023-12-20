import { FC } from 'react';

import { Props } from '@components/pagination/paginationButton/types';

import styles from '@components/pagination/paginationButton/PaginationButton.module.scss';

const PaginationButton: FC<Props> = ({ value, onClick, isActive }) => {
  const isDisabled = value === '...';

  return (
    <button
      onClick={() => onClick()}
      className={`${styles['button']} ${isActive && styles['hover']}`}
      disabled={isDisabled}
    >
      {value}
    </button>
  );
};

export default PaginationButton;
