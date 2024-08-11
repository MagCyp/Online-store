import { FC, ReactNode, useRef } from 'react';

import styles from '@components/radioButton/radioButton.module.scss';

interface Props {
  header: string;
  text?: string;
  secondaryHeader?: string;
  iconLeft?: ReactNode;
  isActive?: boolean;
  setIsActive: () => void;
}

const RadioButton: FC<Props> = ({
  header,
  text,
  secondaryHeader,
  iconLeft,
  isActive,
  setIsActive,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleHeaderClick = (direction: string) => {
    if (ref.current) {
      if (direction === 'mouse-down') {
        ref.current.focus();
      } else {
        ref.current.blur();
      }
    }
  };

  return (
    <div
      className={`${styles['container']} ${isActive ? styles['active'] : ''}`}
      onClick={() => setIsActive()}
      tabIndex={0}
      ref={ref}
      onMouseDown={() => handleHeaderClick('mouse-down')}
      onMouseUp={() => handleHeaderClick('mouse-up')}
    >
      <input
        type="radio"
        className={`${styles['radio']} ${isActive ? styles['active'] : ''}`}
      />
      <p className="regular m white">{header}</p>
      <p className={`regular m ${styles['gray']}`}>{text}</p>
      {secondaryHeader && (
        <div className={styles['secondary-header']}>
          <p className="regular m white">{secondaryHeader}</p>
        </div>
      )}
      {iconLeft && <div className={styles['secondary-header']}>{iconLeft}</div>}
    </div>
  );
};

export default RadioButton;
