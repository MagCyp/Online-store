import { FC } from 'react';

import ProductDropDown from '@/components/productDropDown/ProductDropDown';

import { Props } from '@pages/product/dropDownsSection/types';

import styles from '@pages/product/dropDownsSection/DropDownSection.module.scss';

const DropDownSection: FC<Props> = ({ characteristics }) => {
  return (
    <div className={styles['dropDown-box']}>
      {Object.entries(characteristics).map(([key, value], index) => (
        <ProductDropDown header={key} key={index}>
          <p className={styles['characteristics-p']}>{value}</p>
        </ProductDropDown>
      ))}
    </div>
  );
};

export default DropDownSection;
