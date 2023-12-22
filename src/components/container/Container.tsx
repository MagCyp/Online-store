import { FC } from 'react';

import { Props } from '@components/container/types';

import styles from '@components/container/Container.module.scss';

const Container: FC<Props> = ({ children }) => {
  return <div className={styles['container']}>{children}</div>;
};

export default Container;
