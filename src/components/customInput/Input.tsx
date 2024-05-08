import { ChangeEvent, FC, useState } from 'react';

import IconButton from '@components/iconButton/IconButton';
import Eye from '@components/icons/Eye';
import Error from '@components/error/Error';

import { Props, IInputFields } from '@components/customInput/types';

import styles from '@components/customInput/Input.module.scss';

const CustomInput: FC<Props> = ({
  iconLeft,
  iconRight,
  iconButtonLeft,
  iconButtonRight,
  leftIconClassName,
  rightIconClassName,
  leftIconButtonClick,
  rightIconButtonClick,
  value,
  onChange,
  onBlur,
  label,
  staticLabel,
  type,
  setError,
  validate,
  error,
}) => {
  const [inputFields, setInputFields] = useState<IInputFields>({
    focused: false,
    blurred: false,
    error: '',
  });

  const [inputType, setInputType] = useState<string>(type);

  const handleBlur = (val: ChangeEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(val);
    }
    setInputFields({
      focused: false,
      blurred: true,
      error: validate ? validate(val.target.value) : '',
    });
    if (validate) {
      setError && setError(validate(val.target.value));
    }
  };

  const OnChange = (val: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(val);
      setInputFields(prev => ({
        ...prev,
        error: validate ? validate(val.target.value) : '',
      }));

      if (validate) {
        setError && setError(validate(val.target.value));
      }
    }
  };

  const handleFocus = () => {
    setInputFields(prevValue => ({
      ...prevValue,
      blurred: false,
      focused: true,
    }));
  };

  const inputClassNames = `${styles['input']} ${
    iconLeft || iconButtonLeft ? styles['with-icon'] : ''
  } `;

  return (
    <div
      className={styles['input-wrapper']}
      style={
        inputFields.error ? { marginBottom: '0px' } : { marginBottom: '20px' }
      }
    >
      <div className={styles['input-container']}>
        <div className={styles['icon-left']}>
          {iconLeft && iconLeft}
          {iconButtonLeft && (
            <IconButton
              icon={iconButtonLeft}
              type="button"
              className={leftIconClassName ? leftIconClassName : ''}
              onClick={leftIconButtonClick}
            />
          )}
        </div>
        <input
          className={inputClassNames}
          type={inputType}
          value={value}
          onChange={e => OnChange(e)}
          onBlur={e => handleBlur(e)}
          onFocus={handleFocus}
          required
        />
        {label && (
          <label
            className={`${
              inputFields.focused || value !== ''
                ? styles['label-focused']
                : styles['label']
            } ${iconLeft || iconButtonLeft ? styles['with-left-icon'] : ''}`}
          >
            {typeof label === 'string' ? label : label?.value}
          </label>
        )}
        <label className={`${styles['label-focused']}`}>
          {staticLabel?.header}
        </label>
        <label
          className={`${
            inputFields.focused || value !== ''
              ? styles['static-label-focused']
              : styles['label']
          } ${iconLeft || iconButtonLeft ? styles['with-left-icon'] : ''}`}
        >
          {staticLabel?.label}
        </label>
        <div className={styles['icon-right']}>
          {iconRight && iconRight}
          {iconButtonRight && (
            <IconButton
              icon={iconButtonRight}
              type="button"
              className={rightIconClassName ? rightIconClassName : ''}
              onClick={rightIconButtonClick}
            />
          )}
          {type === 'password' && (
            <IconButton
              icon={<Eye size="small" />}
              type="button"
              className="link-gray large"
              onClick={() =>
                inputType === 'password'
                  ? setInputType('text')
                  : setInputType('password')
              }
            />
          )}
        </div>
      </div>
      <Error message={inputFields.error || error} className="default-red" />
    </div>
  );
};

export default CustomInput;
