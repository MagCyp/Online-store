import { FC, useState } from 'react';

import IconButton from '@/components/iconButton/IconButton';
import ArrowDown from '@components/icons/ArrowDown';

import { Props } from '@/components/dropDown/types';

import styles from '@/components/dropDown/DropDown.module.scss';

const DropDown: FC<Props> = ({ header, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className={styles['container']}>
      <div className={styles['dropdown-header']}>
        <p>{header}</p>
        <IconButton
          className="link-gray"
          type="button"
          icon={<ArrowDown size="small" />}
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

export default DropDown;
