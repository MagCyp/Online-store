import { FC, useEffect, useRef, useState } from 'react';

import Search from '@components/icons/Search';
import CloseBig from '@components/icons/CloseBig';
import DropDownItem from '@components/header/dropDownItem/DropDownItem';
import CustomInput from '@components/customInput/Input';

import { Props } from '@components/header/dropDownSearch/types';

import styles from '@components/header/dropDownSearch/DropDownSearch.module.scss';

const items = [
  {
    text: 'text1',
    href: '/someLink',
  },
  {
    text: 'text1',
    href: '/someLink',
  },
  {
    text: 'text1',
    href: '/someLink',
  },
  {
    text: 'text1',
    href: '/someLink',
  },
  {
    text: 'text1',
    href: '/someLink',
  },
  {
    text: 'text1',
    href: '/someLink',
  },
];

const DropDownSearch: FC<Props> = ({ onClick, isVisible, toggleRef }) => {
  const [value, setValue] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleCloseClick = () => {
    setValue('');
    onClick();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !toggleRef.current?.contains(event.target as Node) &&
        isVisible
      ) {
        handleCloseClick();
      }
    };

    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [containerRef, handleCloseClick, isVisible, toggleRef]);

  return (
    <div
      ref={containerRef}
      className={`${styles['search-container']} ${styles.visible}`}
    >
      <div className={styles['search-header-container']}>
        <CustomInput
          type="text"
          value={value}
          onChange={handleInputChange}
          iconLeft={<Search size="small" />}
          iconButtonRight={<CloseBig size="small" />}
          rightIconClassName="link-gray"
          rightIconButtonClick={() => handleCloseClick()}
          label="Search"
        />
      </div>
      <div className={styles['search-list']}>
        <div className={styles['search-list-header']}>
          <p>{value ? 'Suggestion request' : 'Search history'}</p>
        </div>
        <div className={styles['list']}>
          {items.map((item, index) => (
            <DropDownItem
              key={index}
              text={item.text}
              href={item.href}
              listItem
              onClick={handleCloseClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDownSearch;
