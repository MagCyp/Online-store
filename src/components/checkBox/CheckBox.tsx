import { FC, useState } from 'react';

import { Props } from '@components/checkBox/types';

import styles from '@components/checkBox/CheckBox.module.scss';

const CheckBox: FC<Props> = ({
  onChange,
  label,
  supportingText,
  small,
  large,
  disabled,
  id,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = () => {
    onChange && onChange();
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={
        (small && styles['checkbox-container-small']) ||
        (large && styles['checkbox-container-large'])
      }
    >
      <div className={styles['checkbox-container']}>
        <input
          className={styles['checkbox']}
          type="checkbox"
          id={id ? id : label}
          onChange={() => handleChange()}
          checked={isChecked}
          disabled={disabled}
        />
      </div>
      <div className={styles['text-container']}>
        <label className={styles['label']} htmlFor={id ? id : label}>
          {label}
        </label>
        {supportingText && (
          <span className={styles['supporting-text']}>{supportingText}</span>
        )}
      </div>
    </div>
  );
};

export default CheckBox;
