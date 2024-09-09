import { FC } from 'react';

import styles from '@pages/product/priceBox/PriceBox.module.scss';

interface Props {
  price: number;
  priceWithSale?: number;
}

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
