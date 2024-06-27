import { FC } from 'react';

import { generateClassNames } from '@/utils/generateClassNames/className';

import { Props } from '@/components/badge/types';

import styles from '@/components/badge/Badge.module.scss';
import StarFull from '../icons/StarFull';

const Badge: FC<Props> = ({ text, className, isRating, icon }) => {
  const buttonClassNames = generateClassNames(className, styles);

  if (isRating) {
    return (
      <p className={`${styles['badge']}`}>
        {' '}
        {icon ? icon : <StarFull size="small" />} {text}
      </p>
    );
  }

  return <p className={`${styles['badge']} ${buttonClassNames}`}>{text}</p>;
};

export default Badge;
