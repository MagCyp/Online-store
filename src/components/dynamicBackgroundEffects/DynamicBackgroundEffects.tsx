import { FC, useEffect, useRef } from 'react';

import { Props } from '@components/dynamicBackgroundEffects/types';

import styles from '@components/dynamicBackgroundEffects/DynamicBackgroundEffects.module.scss';

const DynamicBackgroundEffects: FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const updateBackgroundShapesPosition = () => {
      const viewportWidth = window.innerWidth;
      const shapeWidth = 1046;
      const leftPosition = -shapeWidth / 2;
      const rightPosition = viewportWidth - shapeWidth / 2;

      const shapesLeft = container?.querySelectorAll(
        `.${styles['background-shape-left']}`,
      );
      const shapesRight = container?.querySelectorAll(
        `.${styles['background-shape-right']}`,
      );

      shapesLeft?.forEach(shape => {
        const htmlElement = shape as HTMLElement;
        htmlElement.style.left = `${leftPosition}px`;
      });

      shapesRight?.forEach(shape => {
        const htmlElement = shape as HTMLElement;
        htmlElement.style.left = `${rightPosition}px`;
      });
    };

    if (container) {
      window.addEventListener('resize', updateBackgroundShapesPosition);
      updateBackgroundShapesPosition();
    }

    if (container && window.ResizeObserver) {
      const resizeObserverCallback = (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          requestAnimationFrame(() => {
            addBackgroundEffects(entry.target as HTMLElement);
            updateBackgroundShapesPosition();
          });
        }
      };

      const resizeObserver = new ResizeObserver(resizeObserverCallback);
      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', updateBackgroundShapesPosition);
      };
    }
  }, []);

  const addBackgroundEffects = (container: HTMLElement) => {
    const existingShapes = container.querySelectorAll(
      `.${styles['background-shape']}`,
    );

    existingShapes.forEach(shape => {
      shape.remove();
    });

    let lastShapeBottom = 300;

    const containerHeight = container.offsetHeight;
    const distanceBetweenPairs = 1300;
    const shapeHeight = 1;
    const initialOffset = 373;

    while (lastShapeBottom + shapeHeight * 1.5 <= containerHeight) {
      for (let i = 0; i < 2; i++) {
        const shapeLeft = document.createElement('div');
        const shapeRight = document.createElement('div');

        shapeRight.className = `${styles['background-shape']} ${
          styles['background-shape-right']
        } ${i % 2 === 0 ? styles['green-effect'] : styles['blue-effect']}`;
        shapeLeft.className = `${styles['background-shape']} ${
          styles['background-shape-left']
        } ${i % 2 === 0 ? styles['blue-effect'] : styles['green-effect']}`;

        shapeRight.style.top = `${
          lastShapeBottom + (i === 0 ? 0 : initialOffset) + 150
        }px`;
        shapeLeft.style.top = `${
          lastShapeBottom + (i === 0 ? 0 : initialOffset)
        }px`;

        container.appendChild(shapeRight);
        container.appendChild(shapeLeft);
      }

      lastShapeBottom += distanceBetweenPairs + initialOffset;
    }
  };

  return (
    <div className={styles['shapes-container-wrapper']}>
      <div ref={containerRef} className={styles['shapes-container']}></div>
      {children}
    </div>
  );
};

export default DynamicBackgroundEffects;
