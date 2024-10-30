/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@components/button/Button';
import RoundSuccess from '@components/icons/RoundSuccess';
import RoundAlert from '@components/icons/RoundAlert';
import RoundError from '@components/icons/RoundError';

import { Props } from '@components/modalWindow/types';

import styles from '@components/modalWindow/modalWindow.module.scss';

const ModalWindow: FC<Props> = ({
  isOpen,
  setIsOpen,
  header,
  message,
  type,
  firstButtonText,
  firstButtonHref,
  firstButtonVoidClick,
  firstButtonReturnClick,
  firstButtonClose,
  secondButtonText,
  secondButtonHref,
  secondButtonVoidClick,
  secondButtonReturnClick,
  secondButtonClose,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  const handleButtonClick = (
    buttonClick?: () => void,
    returnClick?: (value: any) => void,
    href?: string,
    shouldClose?: boolean,
  ) => {
    if (buttonClick) {
      buttonClick();
    }
    if (returnClick) {
      returnClick(null);
    }
    if (href) {
      navigate(href);
    }
    if (shouldClose) {
      setIsOpen(false);
    }
  };

  const handleIcon = () => {
    switch (type) {
      case 'success':
        return <RoundSuccess size="fiftyTwo" />;
      case 'alert':
        return <RoundAlert size="fiftyTwo" />;
      case 'error':
        return <RoundError size="fiftyTwo" />;
    }
  };

  return (
    <div
      className={styles['wrapper']}
      style={isOpen ? { display: 'flex' } : { display: 'none' }}
    >
      <div className={styles['container']}>
        <div className={styles['content']}>
          {handleIcon()}
          <div className={styles['content-text']}>
            <h6 className="bold">{header}</h6>
            <p className="regular s">{message}</p>
          </div>
        </div>

        <div className={styles['button-group']}>
          {firstButtonText && (
            <Button
              type="button"
              className="secondary small"
              onClick={() =>
                handleButtonClick(
                  firstButtonVoidClick,
                  firstButtonReturnClick,
                  firstButtonHref,
                  firstButtonClose,
                )
              }
              text={firstButtonText}
            />
          )}
          {secondButtonText && (
            <Button
              type="button"
              className="primary small"
              onClick={() =>
                handleButtonClick(
                  secondButtonVoidClick,
                  secondButtonReturnClick,
                  secondButtonHref,
                  secondButtonClose,
                )
              }
              text={secondButtonText}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
