import React, { FC, useState } from 'react';
import styles from '@components/productDropDown/ProductDropDown.module.scss';
import IconButton from '@components/iconButton/IconButton';
import { Props } from '@components/productDropDown/types';
import Plus from '@components/icons/Plus';
import Minus from '@components/icons/Minus';

const ProductDropDown: FC<Props> = ({ header, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className={styles['container']}>
      <div className={styles['dropdown-header']}>
        <p>{header}</p>
        <IconButton
          className="link-gray"
          type="button"
          icon={!isVisible ? <Plus size={'small'} /> : <Minus size="small" />}
          onClick={() => setIsVisible(!isVisible)}
        />
      </div>
      <div
        className={styles['items-container']}
        style={{
          visibility: isVisible ? 'visible' : 'hidden',
          position: isVisible ? 'relative' : 'absolute',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ProductDropDown;
