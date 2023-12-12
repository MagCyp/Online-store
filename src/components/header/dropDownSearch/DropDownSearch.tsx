import { FC, useState } from 'react';

import Search from '@/components/icons/Search';
import CloseBig from '@/components/icons/CloseBig';
import DropDownItem from '@components/header/dropDownItem/DropDownItem';
import CustomInput from '@/components/customInput/Input';

import { Props } from '@/components/header/dropDownSearch/types';

import styles from '@/components/header/dropDownSearch/DropDownSearch.module.scss';

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

const DropDownSearch: FC<Props> = ({ onClick, isVisible }) => {
  const [value, setValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleCloseClick = () => {
    setValue('');
    onClick();
  };

  return (
    <div
      className={`${styles['search-container']} ${
        isVisible ? styles.visible : ''
      }`}
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDownSearch;
