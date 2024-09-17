import { FC } from 'react';

import { Props } from '@pages/product/productDescBox/types';

import styles from '@pages/product/productDescBox/ProductDescBox.module.scss';

const ProductDescBox: FC<Props> = ({ brand, model, shortDescription }) => {
  return (
    <div className={styles['product-desc-box']}>
      <div className={styles['product-title']}>{brand}</div>
      <div className={styles['product-model']}>{model}</div>
      <div className={styles['product-description']}>{shortDescription}</div>
    </div>
  );
};

export default ProductDescBox;
