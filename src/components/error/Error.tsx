import { FC } from 'react';

import { Props } from '@components/error/types';

import styles from '@components/error/Error.module.scss';

const Error: FC<Props> = ({ className, message }) => {
  return <div className={styles[className]}>{message}</div>;
};

export default Error;
