import { FC, useState } from 'react';

import DropDownItem from '@components/header/dropDownItem/DropDownItem';
import Keyboard from '@components/icons/Keyboard';
import Mice from '@components/icons/Mice';
import Headsets from '@components/icons/Headsets';
import MouseMats from '@components/icons/MouseMats';
import Joysticks from '@components/icons/Joysticks';
import Chair from '@components/icons/Chair';

import styles from '@components/header/dropDownMenu/DropDownMenu.module.scss';

const items = [
  {
    text: 'Mice',
    href: 'catalog/Mice',
    icon: <Mice size="medium" />,
    isNew: true,
  },
  {
    text: 'Keyboards',
    href: 'catalog/Keyboards',
    icon: <Keyboard size="medium" />,
    isNew: false,
  },
  {
    text: 'Headsets',
    href: 'catalog/Headsets',
    icon: <Headsets size="medium" />,
    isNew: true,
  },
  {
    text: 'Mouse mats',
    href: 'catalog/Mouse mats',
    icon: <MouseMats size="medium" />,
    isNew: false,
  },
  {
    text: 'Joysticks and controllers',
    href: 'catalog/Joysticks and controllers',
    icon: <Joysticks size="medium" />,
    isNew: true,
  },
  {
    text: 'Gaming chairs',
    href: 'catalog/Gaming Chairs',
    icon: <Chair size="medium" />,
    isNew: false,
  },
];

const DropDownMenu: FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const items1 = items.slice(0, Math.ceil(items.length / 2));
  const items2 = items.slice(Math.ceil(items.length / 2));

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div
      className={styles['menu']}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p>Shop By Category</p>
      <div
        className={styles['dropdown-menu']}
        style={{ visibility: isDropdownVisible ? 'visible' : 'hidden' }}
      >
        <div className={styles['container']}>
          {items1.map((item, index) => (
            <DropDownItem
              key={index}
              text={item.text}
              href={item.href}
              icon={item.icon}
              isNew={item.isNew}
            />
          ))}
        </div>
        <div className={styles['container']}>
          {items2.map((item, index) => (
            <DropDownItem
              key={index}
              text={item.text}
              href={item.href}
              icon={item.icon}
              isNew={item.isNew}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
