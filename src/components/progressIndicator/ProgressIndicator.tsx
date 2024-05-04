import { FC } from 'react';
import { Props } from '@components/progressIndicator/types';
import styles from '@components/progressIndicator/ProgressIndicator.module.scss';

const ProgressIndicator: FC<Props> = ({ width }) => {
  return (
    <div className={styles['progressBar']}>
      <div className={styles['progress']} style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default ProgressIndicator;