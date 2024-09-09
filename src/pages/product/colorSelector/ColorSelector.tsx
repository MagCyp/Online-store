import { FC, useState } from 'react';
import styles from '@pages/product/colorSelector/ColorSelector.module.scss';

interface Props {
  colors: string[];
}

const ColorSelector: FC<Props> = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div className={styles['color-box']}>
      <div className={styles['colorSelector']}>
        {colors.map((color, index) => (
          <div key={index}>
            <button
              style={{ background: color }}
              className={styles[`${color === selectedColor ? 'active' : ''}`]}
              onClick={() => setSelectedColor(color)}
            />
          </div>
        ))}
      </div>
      <span className={styles['label']}>Color</span>
    </div>
  );
};

export default ColorSelector;
