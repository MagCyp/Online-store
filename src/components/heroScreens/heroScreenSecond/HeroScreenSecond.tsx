import { FC } from 'react';

import Container from '@components/container/Container';
import Button from '@components/button/Button';
import IconButton from '@components/iconButton/IconButton';
import ArrowLeftLine from '@components/icons/ArrowLeftLine';
import ArrowRightLine from '@components/icons/ArrowRightLine';

import img from '@/assets/images/hero-screen-second-img.png';

import { useTimeout } from '@hooks/timeout/useTimeout';

import { Props } from '@components/heroScreens/heroScreenSecond/types';

import styles from '@components/heroScreens/heroScreenSecond/HeroScreenSecond.module.scss';

const HeroScreenSecond: FC<Props> = ({
  onLeftButtonClick,
  onRightButtonClick,
}) => {
  const { timerInformation, timerItems } = useTimeout('December 29, 2024');

  return (
    <div className={styles['bg-wrapper']}>
      <Container>
        <div className={styles['container']}>
          <div className={styles['img-container']}>
            <img src={img} alt="limited-img" />
          </div>
          <div className={styles['limited-edition-container']}>
            <div className={styles['text-container']}>
              <p className={styles['limited-description']}>Limited Edition</p>
              <h4 className={`${styles.title} regular`}>Hurry up! 30% OFF</h4>
              <h6 className={`${styles.prices} regular`}>
                Choose products at the best prices
              </h6>
            </div>
            <div className={styles['offer-container']}>
              <p className={styles['offer-description']}>Offer expires in:</p>
              <div className={styles['timer-container']}>
                {timerItems.map((item, index) => (
                  <span className={styles['timer-clock']} key={index}>
                    <h6>{item.date}</h6>
                  </span>
                ))}
              </div>
              <div className={styles['timer-container']}>
                {timerInformation.map((item, index) => (
                  <span className={styles['timer-item']} key={index}>
                    <p>{item}</p>
                  </span>
                ))}
              </div>
              <Button
                type="button"
                className="primary medium"
                text="Shop the deals"
              />
            </div>
            <div className={styles['buttons-container']}>
              <IconButton
                type="button"
                className="fill"
                icon={<ArrowLeftLine size="large" />}
                onClick={onLeftButtonClick}
              />
              <IconButton
                type="button"
                className="fill"
                icon={<ArrowRightLine size="large" />}
                onClick={onRightButtonClick}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroScreenSecond;
