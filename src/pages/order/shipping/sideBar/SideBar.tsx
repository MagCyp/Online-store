import { FC, useEffect, useMemo, useState } from 'react';

import Card from '@components/cart/card/Card';
import CustomInput from '@components/customInput/Input';
import Button from '@components/button/Button';
import Discount from '@components/icons/Discount';

import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';

import { setData } from '@store/slices/payment/paymentSlice';

import { ICartItem } from '@/store/data/cart/types';

import styles from '@pages/order/shipping/sideBar/sideBar.module.scss';

interface IDiscount {
  name: string;
  amount: number;
}

const possibleDiscounts: IDiscount[] = [
  {
    name: 'Promo1',
    amount: 10,
  },
  {
    name: 'Promo2',
    amount: 10.1,
  },
];

const SideBar: FC = () => {
  const cart = useAppSelector(state => state.cart.items);
  const paymentInfo = useAppSelector(state => state.payment);

  const [sortedCart, setSortedCart] = useState<ICartItem[]>([]);

  const dispatch = useAppDispatch();

  const [promoCode, setPromoCode] = useState<string>('');
  const [discounts, setDiscounts] = useState<IDiscount[]>([]);
  const shipping = paymentInfo.delivery === 'express' ? 20 : 10;

  const totalItemsPrice = useMemo(() => {
    return cart.reduce(
      (acc, item) =>
        acc +
        item.quantity *
          (item.product.salePrice
            ? item.product.salePrice
            : item.product.price),
      0,
    );
  }, [cart]);

  const totalPromo = useMemo(() => {
    return discounts.reduce((acc, promo) => acc + promo.amount, 0);
  }, [discounts]);

  const handleApplyPromoCode = () => {
    const matchedPromo = possibleDiscounts.find(
      promo => promo.name === promoCode,
    );
    if (matchedPromo && !discounts.includes(matchedPromo)) {
      setDiscounts(prevDiscounts => [...prevDiscounts, matchedPromo]);
    }
  };

  const totalAmount = useMemo(() => {
    const total = totalItemsPrice - totalPromo + shipping;

    dispatch(setData({ total: total.toString() }));

    return total;
  }, [totalItemsPrice, totalPromo, shipping]);

  useEffect(() => {
    const sorted = cart
      .slice()
      .sort((a, b) => a.product.name.localeCompare(b.product.name));

    setSortedCart(sorted);
  }, [cart]);

  return (
    <div className={styles['container']}>
      <h5 className="bold white">Order summary</h5>
      <div className={styles['cart-list']}>
        {sortedCart?.map(item => (
          <Card
            key={item.id}
            id={item.product.id}
            quantity={item.quantity}
            img={item.product.imageUrl}
            name={item.product.name}
            price={item.product.price}
            property="Color: Black"
            salePrice={item.product.salePrice}
          />
        ))}
      </div>
      <div className={styles['note']}>
        <CustomInput
          type="text"
          value={promoCode}
          onChange={e => setPromoCode(e.target.value)}
          staticLabel={{ header: '', label: 'Enter promo here' }}
          iconLeft={<Discount />}
        />
        <Button
          type="button"
          text="Apply"
          className="primary medium"
          onClick={handleApplyPromoCode}
          style={{ height: '44px', marginTop: '24.9px' }}
        />
      </div>

      <div className={`${styles['text-container']} ${styles['border']}`}>
        {discounts?.map(discount => (
          <div className={styles['text']} key={discount.name}>
            <p className="regular m white">{discount.name}</p>
            <p className="bold m white">-${discount.amount.toFixed(2)}</p>
          </div>
        ))}

        <div className={styles['text']}>
          <p className="regular m white">Order amount</p>
          <p className="bold m white">${totalItemsPrice.toFixed(2)}</p>
        </div>
        <div className={styles['text']}>
          <p className="regular m white">Shipping</p>
          <p className="bold m white">${shipping.toFixed(2)}</p>
        </div>
      </div>

      <div className={styles['text-container']}>
        <div className={styles['text']}>
          <h6 className="white">Total</h6>
          <h6 className="bold white">${totalAmount.toFixed(2)}</h6>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
