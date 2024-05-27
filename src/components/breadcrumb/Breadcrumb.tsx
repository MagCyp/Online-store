import { FC } from 'react';
import { Link } from 'react-router-dom';

import ArrowRight from '@components/icons/ArrowRight';
import Button from '@components/button/Button';

import { Props } from '@components/breadcrumb/types';

import styles from '@components/breadcrumb/Breadcrumb.module.scss';

const Breadcrumb: FC<Props> = ({ category, name, userPage }) => {
  return (
    <div className={styles['container']}>
      {!name && <h2 className="regular">{category || userPage}</h2>}
      <div className={styles['breadcrumbs']}>
        <Button
          className="link-gray small"
          type="button"
          text="Home"
          href="/"
        />
        {category && (
          <>
            <ArrowRight size="small" />
            <Link to={`/catalog/${category}`}>{category}</Link>
          </>
        )}
        {userPage && (
          <>
            <ArrowRight size="small" />
            <Link to={`/catalog/${category}`}>{userPage}</Link>
          </>
        )}
        {name && (
          <>
            <ArrowRight size="small" />
            <span>{name}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
