import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '@components/shopByCategory/ShopByCategory.module.scss';
import Container from '@components/container/Container';

import Keyboard from '@components/icons/Keyboard';
import Mice from '@components/icons/Mice';
import MouseMats from '@components/icons/MouseMats';
import Joysticks from '@components/icons/Joysticks';
import Headsets from '@components/icons/Headsets';
import Chair from '@components/icons/Chair';

import { IItems } from '@components/shopByCategory/types';

const items: IItems[] = [
  { id: 1, icon: <Keyboard size="extraLarge" />, title: 'Keyboards' },
  { id: 2, icon: <Mice size="extraLarge" />, title: 'Mice' },
  { id: 3, icon: <MouseMats size="extraLarge" />, title: 'Mouse pads' },
  {
    id: 4,
    icon: <Joysticks size="extraLarge" />,
    title: 'Joysticks and controllers',
  },
  { id: 5, icon: <Headsets size="extraLarge" />, title: 'Headsets' },
  { id: 6, icon: <Chair size="extraLarge" />, title: 'Gaming chairs' },
];

const ShopByCategory: FC = () => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = (itemId: number) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  const handleClick = (category: string) => {
    navigate(`/catalog/${category}`);
  };

  return (
    <div className={styles['bg-wrapper']}>
      <Container>
        <h3 className={`${styles.title} regular`}>Shop By Category</h3>
        <div className={styles['items-wrapper']}>
          {items.map(
            item =>
              item.icon && (
                <div
                  key={item.id}
                  className={styles['item']}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(item.title)}
                >
                  {item.id === hoveredItemId
                    ? React.cloneElement(item.icon, { size: 'hover' })
                    : item.icon}
                  <h6 className={`${styles['item-title']} medium`}>
                    {item.title}
                  </h6>
                </div>
              ),
          )}
        </div>
      </Container>
    </div>
  );
};

export default ShopByCategory;
