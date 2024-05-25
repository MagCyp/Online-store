import { FC } from 'react';

import AlertCircle from '@components/icons/AlertCircle';

import { Props } from '@components/error/types';

import styles from '@components/error/Error.module.scss';

const Error: FC<Props> = ({ className, message, bigError }) => {
  if (bigError) {
    return (
      <div className={styles['container']}>
        <AlertCircle size="medium" />
        <p className="regular m">{message}</p>
      </div>
    );
  }
  return <div className={className && styles[className]}>{message}</div>;
};

export default Error;
