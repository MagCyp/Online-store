import { FC, useState } from 'react';

import IconButton from '@components/iconButton/IconButton';
import Trashcan from '@components/icons/Trashcan';
import Minus from '@components/icons/Minus';
import Plus from '@components/icons/Plus';

import { useAppDispatch } from '@/hooks/redux/redux';

import { cartAdd, cartRemove } from '@/store/data/cart/cartThunks';

import { Props } from '@components/cart/card/types';

import styles from '@components/cart/card/card.module.scss';

const Card: FC<Props> = ({
  id,
  img,
  name,
  property,
  price,
  salePrice,
  quantity,
}) => {
  const [count, setCount] = useState<number>(quantity);
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(cartRemove([{ productId: id, productQuantity: count }]));
  };

  const handleIncrease = () => {
    if (count >= 99) {
      return;
    }

    setCount(count + 1);
    dispatch(cartAdd([{ productId: id, productQuantity: 1 }]));
  };

  const handleDecrease = () => {
    setCount(count - 1);
    dispatch(cartRemove([{ productId: id, productQuantity: 1 }]));
  };

  return (
    <div className={styles['card']}>
      <img src={img} alt={name} className={styles['img']} />
      <div className={styles['left-side']}>
        <div className={styles['text-container']}>
          <p className="bold s">{name}</p>
          <p className="regular xs">{property}</p>
        </div>
        <div className={styles['counter-wrapper']}>
          <IconButton
            className="link-gray extraSmall"
            type="button"
            icon={<Minus size="mediumSmall" />}
            onClick={() => handleDecrease()}
          />
          <p className={`bold xs ${styles['count']}`}>{count}</p>
          <IconButton
            className="link-gray extraSmall"
            type="button"
            icon={<Plus size="mediumSmall" />}
            onClick={() => handleIncrease()}
          />
        </div>
      </div>
      <div className={styles['right-side']}>
        <IconButton
          className="link-gray medium"
          type="button"
          icon={<Trashcan size="small" />}
          onClick={() => handleRemove()}
        />
        {salePrice ? (
          <div className={styles['text-container-left']}>
            <p className="regular xs">${price}</p>
            <p className="bold s">${salePrice}</p>
          </div>
        ) : (
          <div className={styles['text-container-left']}>
            <p className="bold s">${price}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
