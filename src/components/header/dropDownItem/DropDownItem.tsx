import { FC } from 'react';
import { Link } from 'react-router-dom';

import ArrowRightUp from '@components/icons/ArrowRightUp';
import Badge from '@components/badge/Badge';
import Search from '@components/icons/Search';

import { Props } from '@components/header/dropDownItem/types';

import styles from '@components/header/dropDownItem/DropDownItem.module.scss';

const DropDownItem: FC<Props> = ({
  icon,
  text,
  href,
  isNew,
  listItem,
  onClick,
}) => {
  return (
    <Link
      to={href}
      className={`${styles['drop-down-item']} ${
        listItem ? styles['list-item'] : ''
      }`}
      onClick={onClick}
    >
      <div className={styles['text-badge']}>
        {icon ? icon : <Search size="small" />}
        <p className={styles['text']}>{text}</p>
        {isNew && <Badge className="success s" text="New" />}
      </div>
      <div className={styles['icon-hovered']}>
        <ArrowRightUp size="medium" />
      </div>
    </Link>
  );
};

export default DropDownItem;
