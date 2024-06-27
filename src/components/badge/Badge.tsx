import { FC } from 'react';

import { generateClassNames } from '@/utils/generateClassNames/className';

import { Props } from '@/components/badge/types';

import styles from '@/components/badge/Badge.module.scss';

const Badge: FC<Props> = ({ text, className, isRating }) => {
  const buttonClassNames = generateClassNames(className, styles);

  if (isRating) {
    return <p className={`${styles['badge']}`}> icon {text}</p>;
  }

  return <p className={`${styles['badge']} ${buttonClassNames}`}>{text}</p>;
};

export default Badge;
