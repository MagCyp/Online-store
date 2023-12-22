import { FC } from 'react';
import { Link } from 'react-router-dom';

import ArrowRight from '@components/icons/ArrowRight';
import Button from '@components/button/Button';

import { Props } from '@components/breadcrumb/types';

import styles from '@components/breadcrumb/Breadcrumb.module.scss';

const list: Record<string, string> = {
  mice: 'Mouse',
  mouseMats: 'Mouse mats',
  keyboards: 'Keyboard',
  joysticks: 'Joystick and controller',
  headsets: 'Headsets',
  gamingChairs: 'Gaming chairs',
};

const Breadcrumb: FC<Props> = ({ category, name }) => {
  const convertCategory = (category: string): string => {
    if (category in list) {
      return list[category];
    } else {
      return category;
    }
  };

  const newCat = convertCategory(category);

  return (
    <div className={styles['container']}>
      {!name && <h2 className="regular">{newCat}</h2>}
      <div className={styles['breadcrumbs']}>
        <Button
          className="link-gray small"
          type="button"
          text="Home"
          href="/"
        />
        <ArrowRight size="small" />
        <Link to={`/catalog/${category}`}>{newCat}</Link>
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
