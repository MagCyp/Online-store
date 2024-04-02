import { FC, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

import { useAppDispatch, useAppSelector } from '@hooks/redux/redux';

import { setMinMax } from '@store/slices/catalog/catalogSlice';

import { Props } from '@components/rangeSlider/types';

import styles from '@components/rangeSlider/RangeSlider.module.scss';

const RangeSlider: FC<Props> = ({ priceMin, priceMax, onChange }) => {
  const dispatch = useAppDispatch();
  const { priceRange } = useAppSelector(state => state.catalog);
  const [input, setInput] = useState<number[]>([priceMin, priceMax]);
  const [priceUpdated, setPriceUpdated] = useState<boolean>(false);

  const handleSliderChange = (val: number[]) => {
    setInput(val);
  };

  const onAfterChange = (val: number[]) => {
    dispatch(setMinMax([val[0], val[1]]));
    setPriceUpdated(true);
  };

  useEffect(() => {
    if (priceUpdated) {
      onChange();
      setPriceUpdated(false);
    }
  }, [priceUpdated]);

  const handleOnChange = (newValue: number, index: number) => {
    if (isNaN(newValue) || newValue.toString().length > 6) {
      return;
    }

    const newPriceRange = [...input];
    newPriceRange[index] = newValue;

    setInput(newPriceRange);
  };

  const handleOnBlur = (
    newValue: number,
    lowerLimit: number,
    upperLimit: number,
    index: number,
  ) => {
    let correctedNewValue = newValue;

    if (correctedNewValue < lowerLimit) {
      correctedNewValue = lowerLimit + 1;
    } else if (correctedNewValue > upperLimit) {
      correctedNewValue = upperLimit - 1;
    }

    const newPrice = [...input];
    newPrice[index] = correctedNewValue;

    if (newPrice[0] >= newPrice[1]) {
      if (index === 1) {
        newPrice[1] = newPrice[0] + 1;
      } else {
        newPrice[0] = newPrice[1] - 1;
      }
    }

    dispatch(setMinMax(newPrice));
    setInput(newPrice);
    setPriceUpdated(true);
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
                handleOnBlur(Number(e.target.value), priceMin, priceRange[1], 0)
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
                handleOnBlur(Number(e.target.value), priceRange[0], priceMax, 1)
              }
            />
          </div>
          <p>$</p>
        </div>
      </div>
      <div className={styles['slider-container']}>
        <ReactSlider
          value={[input[0], input[1]]}
          onChange={handleSliderChange}
          onAfterChange={onAfterChange}
          className={styles['slider']}
          thumbClassName={styles['thumb']}
          trackClassName={styles['track']}
          orientation="horizontal"
          min={priceRange[0]}
          max={priceRange[1]}
          pearling
          minDistance={1}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
