import { FC } from 'react';

import styles from '@components/dataLoading/DataLoading.module.scss';

const DataLoading: FC = () => {
  return (
    <div className={styles['data-loading-wrapper']}>
      <h1>Loading...</h1>
    </div>
  );
};

export default DataLoading;
