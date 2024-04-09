import { FC } from 'react';

import styles from '@components/skeletons/productCardSkeleton/ProductCardSkeleton.module.scss';

const ProductCardSkeleton: FC = () => {
  return (
    <div>
      <div className={styles['skeleton-img']}></div>
      <div className={styles['skeleton-brand']}></div>
      <div className={styles['skeleton-name']}></div>
      <div className={styles['skeleton-description']}></div>
      <div className={styles['skeleton-additional']}></div>
      <div className={styles['price-wrapper']}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
