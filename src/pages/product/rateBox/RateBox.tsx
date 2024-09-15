import { FC } from 'react';
import StarsRate from '@pages/product/starsRate/StarsRate';

import { Props } from '@pages/product/rateBox/types';

import styles from '@pages/product/rateBox/RateBox.module.scss';

const RateBox: FC<Props> = ({ rating, reviewsAmount }) => {
  return (
    <div className={styles['rate-box']}>
      <StarsRate rating={rating} />
      <div className={styles['rate-and-reviews']}>
        <div className={styles['rate']}>{rating}</div>
        <div className={styles['reviews']}>({`${reviewsAmount} Revievs`})</div>
      </div>
    </div>
  );
};

export default RateBox;
