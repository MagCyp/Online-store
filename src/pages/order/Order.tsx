import { FC, useState } from 'react';

import Container from '@components/container/Container';
import Shipping from '@pages/order/shipping/Shipping';
import Payment from '@pages/order/payment/Payment';

import { useAppSelector } from '@hooks/redux/redux';

import styles from '@pages/order/order.module.scss';

const progressSteps = [
  { step: 'shipping', label: 'Shipping' },
  { step: 'payment', label: 'Payment' },
  { step: 'complete', label: 'Order complete' },
];

const Order: FC = () => {
  const user = useAppSelector(state => state.user.userData);

  const [currentProgressSteps, setCurrentProgressSteps] = useState<
    'shipping' | 'payment'
  >('shipping');

  const renderStepComponent = () => {
    switch (currentProgressSteps) {
      case 'shipping':
        return <Shipping onSubmit={() => setCurrentProgressSteps('payment')} />;
      case 'payment':
        return <Payment />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <div className={styles['wrapper']}>
        <div className={styles['header']}>
          <h2 className="regular white">Welcome back, {user?.firstName}</h2>
          <h6 className="regular white">
            Use your saved payment methods and addresses for faster checkout!
          </h6>
        </div>
        <div className={styles['progress']}>
          {progressSteps.map(({ step, label }, index) => (
            <div
              key={step}
              className={`${styles['progress-section']} ${
                currentProgressSteps === step ? styles['with-border'] : ''
              }`}
            >
              <div
                className={`${styles['number']}  ${
                  currentProgressSteps === step ? styles['active'] : ''
                }`}
              >
                <p className="bold m ">{index + 1}</p>
              </div>
              <p
                className={`bold m white ${
                  currentProgressSteps === step ? styles.active : ''
                }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
        {renderStepComponent()}
      </div>
    </Container>
  );
};

export default Order;
