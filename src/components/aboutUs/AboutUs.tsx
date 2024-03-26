import { FC } from 'react';

import Container from '@components/container/Container';

import item1 from '@/assets/images/aboutUs/item1.png';
import item2 from '@/assets/images/aboutUs/item2.png';
import item3 from '@/assets/images/aboutUs/item3.png';

import { IItems } from '@components/aboutUs/types';

import styles from '@components/aboutUs/AboutUs.module.scss';

const items: IItems[] = [
  {
    id: 1,
    img: item1,
    title: 'Our Passion for Gaming',
    description: `Embark on gaming adventures with us at [Your Store Name].
    We're gamers passionate about elevating your experience. Explore our curated selection for unrivaled performance
    in every virtual realm.`,
  },
  {
    id: 2,
    img: item2,
    title: 'The our store Difference',
    description: `Discover excellence at our store. We meticulously select top-tier peripherals, ensuring innovation, 
    durability, and customer satisfaction. Your gaming journey deserves the best, and we're here to provide it.`,
  },
  {
    id: 3,
    img: item3,
    title: 'Elevate Your Setup',
    description: `Revamp your gaming setup with our store. Unleash your potential with cutting-edge peripherals and accessories designed for style, comfort, and peak performance.
    Your victory begins here.`,
  },
];

const AboutUs: FC = () => {
  return (
    <div className={styles['bg-wrapper']}>
      <Container>
        {items.map((item, index) => (
          <div key={item.id} className={styles['items-wrapper']}>
            {index % 2 === 0 ? (
              <>
                <img
                  className={styles['item-img']}
                  src={item.img}
                  alt={item.title}
                />
                <div>
                  <h5 className={`${styles.title} regular`}>{item.title}</h5>
                  <p className={`${styles.description} regular m`}>
                    {item.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h5 className={`${styles.title} regular`}>{item.title}</h5>
                  <p className={`${styles.description} regular m`}>
                    {item.description}
                  </p>
                </div>
                <img
                  className={styles['item-img']}
                  src={item.img}
                  alt={item.title}
                />
              </>
            )}
          </div>
        ))}
      </Container>
    </div>
  );
};

export default AboutUs;
