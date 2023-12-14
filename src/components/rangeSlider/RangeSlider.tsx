import { FC, useState } from 'react';
import ReactSlider from 'react-slider';

import { Props } from '@/components/rangeSlider/types';

import styles from '@components/rangeSlider/RangeSlider.module.scss';

const PriceRangeSlider: FC<Props> = ({
  min,
  max,
  priceRange,
  setPriceRange,
}) => {
  const [input, setInput] = useState<number[]>([min, max]);

  const handleSliderChange = (val: number[]) => {
    setPriceRange(val);
    setInput(val);
  };

  const handleOnChange = (newValue: number, index: number) => {
    if (isNaN(newValue) || newValue.toString().length > 6) {
      return;
    }

    const newPriceRange = [...priceRange];
    newPriceRange[index] = newValue;

    setInput(newPriceRange);
  };

  const handleOnBlur = (
    newValue: number,
    lowerLimit: number,
    upperLimit: number,
    index: number,
  ) => {
    if (newValue <= lowerLimit) {
      if (index === 0) {
        newValue = lowerLimit;
      } else {
        newValue = lowerLimit + 1;
      }
    }

    if (newValue >= upperLimit) {
      if (index === 1) {
        newValue = upperLimit;
      } else {
        newValue = upperLimit - 1;
      }
    }

    const newPriceRange = [...priceRange];
    newPriceRange[index] = newValue;

    setPriceRange(newPriceRange);
    setInput(newPriceRange);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['content-container']}>
        <div className={styles['price-container']}>
          <p>From </p>
          <div className={styles['price-box']}>
            <input
              className={styles['input']}
              value={input[0]}
              onChange={e => handleOnChange(Number(e.target.value), 0)}
              onBlur={e =>
                handleOnBlur(Number(e.target.value), min, priceRange[1], 0)
              }
            />
          </div>
        </div>
        <div className={styles['price-container']}>
          <p>To </p>
          <div className={styles['price-box']}>
            <input
              className={styles['input']}
              value={input[1]}
              onChange={e => handleOnChange(Number(e.target.value), 1)}
              onBlur={e =>
                handleOnBlur(Number(e.target.value), priceRange[0], max, 1)
              }
            />
          </div>
          <p>$</p>
        </div>
      </div>
      <div className={styles['slider-container']}>
        <ReactSlider
          value={priceRange}
          onChange={handleSliderChange}
          className={styles['slider']}
          thumbClassName={styles['thumb']}
          trackClassName={styles['track']}
          orientation="horizontal"
          min={min}
          max={max}
          minDistance={1}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
