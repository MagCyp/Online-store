import { FC } from 'react';

import Container from '@components/container/Container';
import Button from '@components/button/Button';
import IconButton from '@components/iconButton/IconButton';
import ArrowLeftLine from '@components/icons/ArrowLeftLine';
import ArrowRightLine from '@components/icons/ArrowRightLine';

import { Props } from '@components/heroScreens/heroScreenFirst/types';

import styles from '@components/heroScreens/heroScreenFirst/HeroScreenFirst.module.scss';

const HeroScreenFirst: FC<Props> = ({
  onLeftButtonClick,
  onRightButtonClick,
  onClick,
}) => {
  return (
    <div className={styles['bg-wrapper']}>
      <Container>
        <div className={styles['content-wrapper']}>
          <h1 className={`${styles.title} regular`}>
            Elevate Your Gaming Experience
          </h1>
          <Button
            text="Go to shopping"
            className="primary large"
            type="button"
            onClick={() => onClick()}
          />
          <div className={styles['slider']}>
            <div className={styles['discount-content']}>
              <p className={styles['discount-title']}>From $39</p>
              <p className={styles['description']}>
                Welcome to EpicGear Haven, your ultimate destination for premium
                gaming peripherals!
              </p>
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

export default HeroScreenFirst;
