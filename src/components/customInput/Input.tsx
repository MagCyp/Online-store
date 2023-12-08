import { FC } from 'react';

import IconButton from '@components/iconButton/IconButton';

import { Props } from '@components/customInput/types';

import styles from '@components/customInput/Input.module.scss';

const CustomInput: FC<Props> = ({
  iconLeft,
  iconRight,
  iconButtonLeft,
  iconButtonRight,
  className,
  value,
  onChange,
  label,
  type,
  error,
}) => {
  const inputClassNames = `${styles['input']} ${
    value !== '' ? styles['has-text'] : ''
  } ${iconLeft || iconButtonLeft ? styles['with-icon'] : ''} ${
    error ? styles['error-border'] : ''
  }`;
  const labelClassNames = `${value !== '' ? styles['label-focused'] : ''} ${
    iconLeft || iconButtonLeft ? styles['with-left-icon'] : ''
  }`;

  return (
    <div className={styles['input-wrapper']}>
      <div className={styles['input-container']}>
        <div className={styles['icon-left']}>
          {iconLeft && iconLeft}
          {iconButtonLeft && (
            <IconButton
              icon={iconButtonLeft}
              type="button"
              className={className ? className : ''}
            />
          )}
        </div>
        <input
          className={inputClassNames}
          type={type}
          value={value}
          onChange={onChange}
          required
        />
        <label className={labelClassNames}>{label}</label>
        <div className={styles['icon-right']}>
          {iconRight && iconRight}
          {iconButtonRight && (
            <IconButton
              icon={iconButtonRight}
              type="button"
              className={className ? className : ''}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomInput;
