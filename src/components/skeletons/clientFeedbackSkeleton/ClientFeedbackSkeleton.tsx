import { FC } from 'react';

import Container from '@components/container/Container';

import styles from '@components/skeletons/clientFeedbackSkeleton/ClientFeedbackSkeleton.module.scss';

const ClientFeedbackSkeleton: FC = () => {
  return (
    <Container>
      <div className={styles['skeleton-wrapper']}>
        <div className={styles['reviews-wrapper']}>
          <div className={styles['title-skeleton']}></div>
          <div className={styles['description-skeleton']}></div>
          <div className={styles['description-skeleton']}></div>
          <div className={styles['icons-skeleton']}></div>
          <div className={styles['rating-skeleton']}></div>
        </div>
        <div>
          <div className={styles['quotes-skeleton']}></div>
          <div className={styles['comment-skeleton']}></div>
          <div className={styles['user-skeleton-wrapper']}>
            <div className={styles['skeleton-icon']}></div>
            <div className={styles['text-skeleton-wrapper']}>
              <div className={styles['name-skeleton']}></div>
              <div className={styles['experiance-skeleton']}></div>
            </div>
            <div className={styles['rating-wrapper']}>
              <div className={styles['skeleton-star']}></div>
              <div className={styles['skeleton-star']}></div>
              <div className={styles['skeleton-star']}></div>
              <div className={styles['skeleton-star']}></div>
              <div className={styles['skeleton-star']}></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ClientFeedbackSkeleton;
