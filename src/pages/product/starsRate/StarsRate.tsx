import { FC } from 'react';

import StarFull from '@components/icons/StarFull';
import StarEmpty from '@components/icons/StarEmpty';

import { Props } from '@pages/product/starsRate/types';

import styles from '@pages/product/starsRate/StarsRate.module.scss';

const StarsRate: FC<Props> = ({ rating }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <StarFull size={'small'} />
        ) : (
          <StarEmpty size={'small'} />
        )}
      </span>
    );
  });

  return <div className={styles['stars-rate']}> {ratingStar}</div>;
};

export default StarsRate;
