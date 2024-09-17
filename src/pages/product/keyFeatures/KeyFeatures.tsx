import { FC } from 'react';

import { Props } from '@pages/product/keyFeatures/types';

import styles from '@pages/product/keyFeatures/KeyFeatures.module.scss';

const KeyFeatures: FC<Props> = ({ features }) => {
  return (
    <div className={styles['key-features']}>
      <p>Key features</p>
      <hr />
      <div className={styles['items-wrapper']}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={styles['product-feature']}
            style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
          >
            <div className={styles['gray-block']}>
              <img src={feature.imgSource} alt={feature.title} />
            </div>
            <div
              className={styles['column-feature']}
              style={{
                alignItems: index % 2 === 0 ? 'flex-end' : 'flex-start',
              }}
            >
              <div className={styles['feature-box']}>
                <h1>{feature.title}</h1>
                <p>{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
