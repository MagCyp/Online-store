import { FC } from 'react';
import StarsRate from '@pages/product/starsRate/StarsRate';

import styles from '@pages/product/rateBox/RateBox.module.scss';

interface Props {
  rating: number;
  reviewsAmount: number;
}

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
