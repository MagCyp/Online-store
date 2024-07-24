import { FC } from 'react';

import Container from '@components/container/Container';

import styles from '@pages/order/orderComplete/orderComplete.module.scss';
import Button from '@/components/button/Button';

const items: { img: string; count: number }[] = [
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9jFOrrTIHLG30fqFc-rJIRw9PK4SqBvrZjA&usqp=CAU',
    count: 1,
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9jFOrrTIHLG30fqFc-rJIRw9PK4SqBvrZjA&usqp=CAU',
    count: 4,
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9jFOrrTIHLG30fqFc-rJIRw9PK4SqBvrZjA&usqp=CAU',
    count: 2,
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9jFOrrTIHLG30fqFc-rJIRw9PK4SqBvrZjA&usqp=CAU',
    count: 10,
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9jFOrrTIHLG30fqFc-rJIRw9PK4SqBvrZjA&usqp=CAU',
    count: 5,
  },
];

const OrderComplete: FC = () => {
  return (
    <Container>
      <div className={styles['container']}>
        <div className={styles['content']}>
          <h5 className="white bold">Your order has been received 🎉</h5>
          <div className={styles['items-grid']}>
            {items.map((item, index) => (
              <div
                key={index}
                className={styles['item-wrapper']}
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className={styles['count']}>{item.count}</div>
              </div>
            ))}
          </div>
          <div className={styles['order-info']}>
            <div className={styles['info-header']}>
              <p className="medium s gray-100">Order Code:</p>
              <p className="medium s gray-100">Date:</p>
              <p className="medium s gray-100">Total:</p>
              <p className="medium s gray-100">Payment method:</p>
            </div>
            <div className={styles['info-value']}>
              <p className="medium s white">#qad1</p>
            </div>
          </div>
          <div className={styles['buttons-container']}>
            <Button
              type="button"
              text="Back to shopping"
              className="primary medium"
              href="/catalog"
            />
            <Button
              type="button"
              text="Purchase history"
              className="secondary medium"
              href="/account"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderComplete;
