import { FC } from 'react';

import styles from '@components/dataError/DataError.module.scss';

const DataError: FC = () => {
  return (
    <div className={styles['data-error-wrapper']}>
      <h1>Something went wrong...</h1>
    </div>
  );
};

export default DataError;
