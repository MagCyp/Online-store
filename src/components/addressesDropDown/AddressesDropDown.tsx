import { FC, useEffect, useRef, useState } from 'react';

import ArrowDown from '@components/icons/ArrowDown';
import ArrowUp from '@components/icons/ArrowUp';

import { IAddress, Props } from '@components/addressesDropDown/types';

import styles from '@components/addressesDropDown/addressesDropDown.module.scss';

const AddressesDropDown: FC<Props> = ({
  header,
  addresses,
  selected,
  setSelected,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleHeaderClick = (direction: string) => {
    if (headerRef.current) {
      if (direction === 'mouse-down') {
        headerRef.current.focus();
      } else {
        headerRef.current.blur();
      }
    }
  };

  const handleSelect = (index: number, address: IAddress) => {
    setSelected(index, address);
    setIsVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles['container']} ref={dropdownRef}>
      <div
        className={styles['dropdown-header']}
        tabIndex={0}
        ref={headerRef}
        onMouseDown={() => handleHeaderClick('mouse-down')}
        onMouseUp={() => handleHeaderClick('mouse-up')}
        onClick={() => setIsVisible(!isVisible)}
      >
        <p>{header}</p>
        {!isVisible ? <ArrowDown size="small" /> : <ArrowUp size="small" />}
      </div>
      <div
        className={styles['items-container']}
        style={{
          visibility: isVisible ? 'visible' : 'hidden',
        }}
      >
        {addresses ? (
          addresses.map((address, index) => (
            <div
              key={index}
              className={`${styles['item-box']} ${
                index === selected ? styles['active'] : ''
              }`}
              onClick={() => handleSelect(index, address)}
            >
              <div className={styles['text']}>
                <p className="medium s">
                  {address.region}; {address.city},
                </p>
                <p className="medium s">
                  {address.street} st. {address.house}, apt. {address.apartment}
                </p>
              </div>
              <div className={styles['postal-code']}>
                <p className="medium s">{address.postalCode}</p>
              </div>
            </div>
          ))
        ) : (
          <div className={styles['item-box']}>
            <p
              className="medium s"
              style={{ textAlign: 'center', width: '100%' }}
            >
              Addresses empty
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressesDropDown;
