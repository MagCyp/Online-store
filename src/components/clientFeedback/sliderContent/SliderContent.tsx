import { FC } from 'react';

import quotes from '@/assets/images/clientFeedback/quotes.svg';

import StarFull from '@components/icons/StarFull';
import StarEmpty from '@components/icons/StarEmpty';

import { Props } from '@components/clientFeedback/sliderContent/types';

import styles from '@components/clientFeedback/ClientFeedback.module.scss';

const SliderContent: FC<Props> = ({ rate, comment, userName, userPhoto }) => {
  return (
    <div className={styles['slider-wrapper']}>
      <img className={styles['quotes-img']} src={quotes} alt="quotes" />
      <p className={`${styles['comment-description']} regular m`}>{comment}</p>
      <div className={styles['rating-wrapper']}>
        <img src={userPhoto} alt="user" />
        <div className={styles['user-wrapper']}>
          <p className={`${styles['user-title']} bold l`}>{userName}</p>
          <p className={`${styles['user-description']} regular s`}>
            {5} years of experience
          </p>
        </div>
        <div>
          {[...Array(rate)].map((_, index) => (
            <StarFull key={index} size="small" />
          ))}
          {[...Array(5 - rate)].map((_, index) => (
            <StarEmpty key={index} size="small" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderContent;
