import { FC, useEffect, useState, useRef } from 'react';

import IconButton from '@components/iconButton/IconButton';
import CloseBig from '@components/icons/CloseBig';
import Card from '@components/cart/card/Card';
import Button from '@components/button/Button';

import { useAppSelector } from '@/hooks/redux/redux';

import { Props } from '@components/cart/types';

import styles from '@components/cart/cart.module.scss';

const Cart: FC<Props> = ({ isOpened, onClose }) => {
  const [opened, setOpened] = useState<boolean>(isOpened);

  const [total, setTotal] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [sortedCart, setSortedCart] = useState<any[]>([]);

  const cart = useAppSelector(state => state.cart.items);

  const cartRef = useRef<HTMLDivElement | null>(null);

  const calcSubtotal = () => {
    let sum = 0;
    cart.forEach(item => {
      sum += item.product.salePrice || item.product.price * item.quantity;
    });

    setSubtotal(sum);
  };

  const calcTotal = () => {
    const calculatedTotal = subtotal;
    setTotal(calculatedTotal);
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      calcSubtotal();
    }
  }, [cart]);

  useEffect(() => {
    calcTotal();
  }, [subtotal]);

  useEffect(() => {
    setOpened(isOpened);
    if (isOpened) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpened]);

  useEffect(() => {
    const sorted = cart
      .slice()
      .sort((a, b) => a.product.name.localeCompare(b.product.name));

    setSortedCart(sorted);
  }, [cart]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (opened) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [opened, onClose]);

  return (
    <div className={`${styles['wrapper']} ${opened ? styles['open'] : ''}`}>
      <div className={styles['cart']} ref={cartRef}>
        <div className={styles['body']}>
          <div className={styles['header']}>
            <h4 className="regular">Cart</h4>
            <IconButton
              className="link-gray"
              type="button"
              icon={<CloseBig size="small" />}
              onClick={onClose}
            />
          </div>
          <div className={styles['item-list']}>
            {sortedCart.length > 0 ? (
              sortedCart?.map(card => (
                <Card
                  key={card?.id}
                  id={card.product.id}
                  img={card.product.imageUrl}
                  name={card.product.name}
                  property="Color: Black"
                  quantity={card.quantity}
                  price={card.product.price}
                  salePrice={card.product.salePrice}
                />
              ))
            ) : (
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h4 className="regular">cart is empty</h4>
              </div>
            )}
          </div>
          <div className={styles['checkout']}>
            <div className={styles['total']}>
              <p className="bold m">Subtotal</p>
              <p className="bold m">${subtotal.toFixed(2)}</p>
            </div>
            <div className={styles['total']}>
              <h6>Total</h6>
              <h6>${total.toFixed(2)}</h6>
            </div>
          </div>
          <Button
            className="primary medium"
            type="button"
            text="Checkout"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
