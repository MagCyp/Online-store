import { FC, useState } from 'react';

import Button from '@components/button/Button';
import RadioButtonOn from '@components/icons/RadioButtonOn';
import RadioButtonOff from '@components/icons/RadioButtonOff';

import { Props } from '@/pages/userAccount/addresses/addressCard/types';

import styles from '@pages/userAccount/addresses/addressCard/addressCard.module.scss';

const AddressCard: FC<Props> = ({
  address,
  city,
  code,
  country,
  firstName,
  lastName,
  number,
  selectedItem,
  setActive,
  onRemove,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onRemove && onRemove();
  };

  return (
    <div
      className={styles['container']}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={setActive}
    >
      <div className={styles['content']}>
        <p
          className={`bold m ${styles['name']}`}
        >{`${firstName} ${lastName}`}</p>
        <p className="regular s">{number}</p>
        <p className="regular s">{`${code}, ${country}, ${city}`}</p>
        <p className="regular s">{address}</p>
      </div>
      <div className={styles['buttons']}>
        <div className={styles['remove']}>
          <Button
            text="Remove"
            type="button"
            className="link-gray small"
            onClickEvent={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleRemoveClick(e)
            }
          />
        </div>
        <div className={styles['hover']}>
          {isHover || selectedItem ? (
            <RadioButtonOn size="medium" />
          ) : (
            <RadioButtonOff size="medium" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
