import { FC } from 'react';

import ProductDropDown from '@/components/productDropDown/ProductDropDown';

import { Props } from '@pages/product/dropDownsSection/types';

import styles from '@pages/product/dropDownsSection/DropDownSection.module.scss';

const DropDownSection: FC<Props> = ({ options }) => {
  return (
    <div className={styles['dropDown-box']}>
      {options.map((option, index) => (
        <ProductDropDown header={option.header} key={index}>
          <p className={styles['characteristics-p']}>{option.content}</p>
        </ProductDropDown>
      ))}
    </div>
  );
};
export default DropDownSection;
