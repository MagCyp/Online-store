import { FC } from 'react';

import quotes from '@/assets/images/clientFeedback/quotes.svg';

import StarFull from '@components/icons/StarFull';
import StarEmpty from '@components/icons/StarEmpty';

import { Props } from '@components/clientFeedback/sliderContent/types';

import styles from '@components/clientFeedback/ClientFeedback.module.scss';

const SliderContent: FC<Props> = ({
  title,
  logo,
  userName,
  yearsExperience,
  rating,
}) => {
  return (
    <div className={styles['slider-wrapper']}>
      <img className={styles['quotes-img']} src={quotes} alt="quotes" />
      <p className={`${styles['comment-description']} regular m`}>{title}</p>
      <div className={styles['rating-wrapper']}>
        <img src={logo} alt="user" />
        <div className={styles['user-wrapper']}>
          <p className={`${styles['user-title']} bold l`}>{userName}</p>
          <p className={`${styles['user-description']} regular s`}>
            {yearsExperience} years of experience
          </p>
        </div>
        <div>
          {[...Array(rating)].map((_, index) => (
            <StarFull key={index} size="small" />
          ))}
          {[...Array(5 - rating)].map((_, index) => (
            <StarEmpty key={index} size="small" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderContent;
