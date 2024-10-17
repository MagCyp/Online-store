import { FC } from 'react';

import StarsRate from '@pages/product/starsRate/StarsRate';
import ProgressIndicator from '@/components/progressIndicator/ProgressIndicator';

import { Props } from '@pages/product/customerReviews/types';

import styles from '@pages/product/customerReviews/CustormerReviews.module.scss';

const CustomerReviews: FC<Props> = ({ ratingData }) => {
  const totalReviews = ratingData.length;
  const averageRating =
    ratingData.reduce((sum, rating) => sum + rating, 0) / totalReviews;
  const countRatings = (ratingValue: number) =>
    ratingData.filter(rating => rating === ratingValue).length;

  const ratingChart = {
    reviewQuantity: totalReviews,
    opinions: [
      { rating: 5, quantity: countRatings(5) },
      { rating: 4, quantity: countRatings(4) },
      { rating: 3, quantity: countRatings(3) },
      { rating: 2, quantity: countRatings(2) },
      { rating: 1, quantity: countRatings(1) },
    ],
  };

  return (
    <div className={styles['customer-reviews-container']}>
      <div className={styles['customer-reviews-left']}>
        <h1>Customer Reviews</h1>
        <StarsRate rating={averageRating} />
        <div className={styles['rate']}>{averageRating}</div>
        <p>Based on {totalReviews} reviews</p>
      </div>

      <div className={styles['customer-reviews-right']}>
        {ratingChart.opinions.map((opinion, index) => (
          <div key={index} className={styles['rate-indicator']}>
            <StarsRate rating={opinion.rating} />

            <ProgressIndicator
              width={(opinion.quantity / totalReviews) * 100}
            />

            <div className={styles['reviews-count']}>{opinion.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
