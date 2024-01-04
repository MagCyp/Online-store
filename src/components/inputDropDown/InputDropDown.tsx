import { FC, useState } from 'react';

import IconButton from '@components/iconButton/IconButton';
import ArrowDown from '@components/icons/ArrowDown';
import ArrowUp from '@components/icons/ArrowUp';

import { useAppDispatch, useAppSelector } from '@hooks/redux/redux';

import { setSortBy } from '@store/slices/catalog/catalogSlice';

import { Props } from '@components/inputDropDown/types';

import styles from '@components/InputDropDown/inputDropDown.module.scss';

const InputDropDow: FC<Props> = ({ options, sort }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const sortBy =
    sort === 'review'
      ? useAppSelector(state => state.catalog.sortBy)
      : useAppSelector(state => state.catalog.sortBy);

  const handleChooseSort = (option: string) => {
    if (sort === 'review') {
      dispatch(setSortBy(option));
    } else if (sort === 'product') {
      dispatch(setSortBy(option));
    }
    setIsVisible(false);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <p
          className={`${styles['header-text']} ${
            isVisible ? styles['visible'] : styles['hidden']
          }`}
        >
          {sortBy}
        </p>
        <IconButton
          className="link-gray"
          type="button"
          icon={
            !isVisible ? <ArrowDown size="small" /> : <ArrowUp size="small" />
          }
          onClick={() => setIsVisible(!isVisible)}
        />
      </div>
      <div
        className={styles['item-list']}
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      >
        {options.map(option => (
          <div
            key={option}
            className={styles['item']}
            onClick={() => handleChooseSort(option)}
          >
            <p>{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputDropDow;
