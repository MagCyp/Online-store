import { FC } from 'react';

import ArrowRightUp from '@components/icons/ArrowRightUp';
import Badge from '@components/badge/Badge';
import Search from '@components/icons/Search';

import { Props } from '@components/header/dropDownItem/types';

import styles from '@components/header/dropDownItem/DropDownItem.module.scss';

const DropDownItem: FC<Props> = ({ icon, text, href, isNew, listItem }) => {
  return (
    <div
      className={`${styles['drop-down-item']} ${
        listItem ? styles['list-item'] : ''
      }`}
    >
      <div className={styles['text-badge']}>
        {icon ? icon : <Search size="small" />}
        <a href={href} className={styles['text']}>
          {text}
        </a>
        {isNew && <Badge className="success s" text="New" />}
      </div>
      <div className={styles['icon-hovered']}>
        <ArrowRightUp size="medium" />
      </div>
    </div>
  );
};

export default DropDownItem;
