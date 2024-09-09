import { FC } from 'react';

import StarsRate from '@pages/product/starsRate/StarsRate';
import ProgressIndicator from '@/components/progressIndicator/ProgressIndicator';

import styles from '@pages/product/customerReviews/CustormerReviews.module.scss';

import { Props } from '@pages/product/customerReviews/types';

const CustomerReviews: FC<Props> = ({ ratingData }) => {
  return (
    <div className={styles['customer-reviews-container']}>
      <div className={styles['customer-reviews-left']}>
        <h1>Customer Reviews</h1>
        <StarsRate rating={ratingData.overallRating} />
        <p>Based on {ratingData.reviewQuantity} reviews</p>
      </div>

      <div className={styles['customer-reviews-right']}>
        {ratingData.opinions.map((opinion, index) => (
          <div key={index} className={styles['rate-indicator']}>
            <StarsRate rating={opinion.rating} />

            <ProgressIndicator
              width={(opinion.quantity / ratingData.reviewQuantity) * 100}
            />

            <div className={styles['reviews-count']}>{opinion.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
