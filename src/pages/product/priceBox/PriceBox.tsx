import { FC } from 'react';

import { Props } from '@pages/product/priceBox/types';

import styles from '@pages/product/priceBox/PriceBox.module.scss';

const PriceBox: FC<Props> = ({ price, priceWithSale }) => {
  return (
    <div className={styles['product-price-box']}>
      <div className={styles['product-price']}>{`$${price}`}</div>
      {priceWithSale && (
        <>
          <div className={styles['product-sale']}>{`$${priceWithSale}`}</div>
          <div className={styles['sale']}>Sale</div>
        </>
      )}
    </div>
  );
};

export default PriceBox;
