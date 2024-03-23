import { FC, useEffect, useState } from 'react';

import IconButton from '@components/iconButton/IconButton';
import ArrowDown from '@components/icons/ArrowDown';
import ArrowUp from '@components/icons/ArrowUp';

import { Props } from '@components/inputDropDown/types';

import styles from '@components/inputDropDown/InputDropDown.module.scss';

const InputDropDown: FC<Props> = ({ options, setSortedBy }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>();

  useEffect(() => {
    setSortedBy(options[0].sortBy);
    setSelectedOption(options[0].name);
  }, []);

  const handleChooseSort = (option: { name: string; sortBy: string }) => {
    setSortedBy(option.sortBy);
    setSelectedOption(option.name);
    setIsVisible(false);
  };

  return (
    <div className={styles['container']}>
      <div
        className={styles['header']}
        onClick={() => setIsVisible(!isVisible)}
      >
        <p
          className={`${styles['header-text']} ${
            isVisible ? styles['visible'] : styles['hidden']
          }`}
        >
          {selectedOption}
        </p>
        <IconButton
          className="link-gray"
          type="button"
          icon={
            !isVisible ? <ArrowDown size="small" /> : <ArrowUp size="small" />
          }
        />
      </div>
      <div
        className={styles['item-list']}
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      >
        {options.map(option => (
          <div
            key={option.name}
            className={styles['item']}
            onClick={() => handleChooseSort(option)}
          >
            <p>{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputDropDown;
