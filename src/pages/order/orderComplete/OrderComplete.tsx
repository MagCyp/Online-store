import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Container from '@components/container/Container';
import Button from '@components/button/Button';

import styles from '@pages/order/orderComplete/orderComplete.module.scss';

interface IItem {
  imageUrl: string;
  count: number;
}

const OrderComplete: FC = () => {
  const location = useLocation();

  const [items, setItems] = useState<IItem[]>([]);
  const [orderDate, setOrderDate] = useState<string | null>('');
  const [total, setTotal] = useState<string | null>('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    setOrderDate(searchParams.get('date'));
    setTotal(searchParams.get('total'));

    const itemIdsArray: string[] = [];
    const itemCountsArray: string[] = [];

    searchParams.getAll('items_id').forEach(id => {
      itemIdsArray.push(id);
    });
    searchParams.getAll('item_count').forEach(count => {
      itemCountsArray.push(count);
    });

    async function getItems() {
      try {
        const response = await axios.get(
          'https://backend-4uug.onrender.com/products/by-ids',
          {
            params: { ids: itemIdsArray.join(',') },
          },
        );

        const productsFromBackend = response.data._embedded.products;

        const combinedItems = productsFromBackend.map(
          (product: IItem, index: number) => ({
            imageUrl: product.imageUrl,
            count: itemCountsArray[index],
          }),
        );
        console.log(combinedItems);

        setItems(combinedItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    if (itemIdsArray.length > 0) {
      getItems();
    }

    //clear cart in future
  }, [location.search]);

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
                style={{ backgroundImage: `url(${item.imageUrl})` }}
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
              <p className="medium s white">{orderDate}</p>
              <p className="medium s white">${total}</p>
              <p className="medium s white">WayForPay</p>
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
