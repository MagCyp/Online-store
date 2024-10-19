import { FC, useState } from 'react';

import { Props } from '@pages/userAccount/orders/types';

import styles from '@pages/userAccount/orders/orders.module.scss';

const Orders: FC<Props> = ({ content = 'favorite' }) => {
  return <div>{content}</div>;
};

export default Orders;
