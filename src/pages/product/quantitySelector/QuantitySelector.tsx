import { FC, useState } from 'react';

import { Props } from '@pages/product/quantitySelector/types';

import styles from '@pages/product/quantitySelector/QuantitySelector.module.scss';

const QuantitySelector: FC<Props> = ({
  min = 1,
  max = 10,
  initialQuantity = 1,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleDecrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className={styles['quantity-box']}>
      <button
        className={styles['button']}
        onClick={handleDecrement}
        disabled={quantity === min}
      >
        -
      </button>
      <span className={styles['quantity']}>{quantity}</span>
      <button
        className={styles['button']}
        onClick={handleIncrement}
        disabled={quantity === max}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;

// div className={styles['quantity-box']}>
//                 <div className={styles['row']}>
//                   <input className={styles['input-field']} type="number" />
//                   <button className={styles['favorite']}>
//                     <div className={styles['favorite-content']}>
//                       <HeartOpacity size={'small'} />
//                       Favorite
//                     </div>
//                   </button>
//                 </div>
