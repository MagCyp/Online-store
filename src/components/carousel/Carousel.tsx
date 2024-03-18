import { FC, useState } from 'react';

import styles from './Carousel.module.scss';
import Container from '../container/Container';
import IconButton from '../iconButton/IconButton';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import ProductCard from '../productCard/ProductCard';
import Circle from '../icons/Circle';

const Carousel: FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: string[] = ['New', 'Best sellers', 'Recommended'];

  return (
    <div className={styles['bg-wrapper']}>
      <Container>
        <div className={styles['categories-wrapper']}>
          {tabs.map((item, index) => (
            <p
              className={`${styles.category} regular l ${
                activeTab === index ? `${styles['active-category']} bold l` : ''
              }`}
              key={index}
              onClick={() => setActiveTab(index)}
            >
              {item}
            </p>
          ))}
        </div>
      </Container>
      <div className={styles['cards-wrapper']}>
        <div className={styles['left-icon']}>
          <IconButton
            type="button"
            className="outline"
            icon={<ArrowLeft size="large" />}
            // onClick={onLeftButtonClick}
          />
        </div>
        <div className={styles['card']}>
          <ProductCard
            topLabel="new"
            bottomLabel="old"
            brand="Guchi"
            name="trusilya"
            shortDescription="about this shit"
            price={45}
            salePrice={30}
            imageUrl="https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg"
            id="1"
          />
          <ProductCard
            topLabel="new"
            bottomLabel="old"
            brand="Guchi"
            name="trusilya"
            shortDescription="about this shit"
            price={45}
            salePrice={30}
            imageUrl="https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg"
            id="1"
          />
          <ProductCard
            topLabel="new"
            bottomLabel="old"
            brand="Guchi"
            name="trusilya"
            shortDescription="about this shit"
            price={45}
            salePrice={30}
            imageUrl="https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg"
            id="1"
          />
          <ProductCard
            topLabel="new"
            bottomLabel="old"
            brand="Guchi"
            name="trusilya"
            shortDescription="about this shit"
            price={45}
            salePrice={30}
            imageUrl="https://mywowo.net/media/images/cache/dubai_img_worlds_of_adventure_01_presentazione_jpg_1200_630_cover_85.jpg"
            id="1"
          />
        </div>
        <div className={styles['right-icon']}>
          <IconButton
            type="button"
            className="outline"
            icon={<ArrowRight size="large" />}
            // onClick={onLeftButtonClick}
          />
        </div>
      </div>
      <div>
        <Circle size="large" />
      </div>
    </div>
  );
};

export default Carousel;
