import { FC } from 'react';

import { Props } from './types';

import styles from './Error.module.scss';

const Error: FC<Props> = ({ className, message }) => {
  return <div className={styles[className]}>{message}</div>;
};

export default Error;
