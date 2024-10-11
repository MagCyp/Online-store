import { FC, useState, useEffect, useRef } from 'react';

import { Props } from '@pages/product/thumbnailSlider/types';

import styles from '@pages/product/thumbnailSlider/ThumbnailSlider.module.scss';

const ThumbnailSlider: FC<Props> = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState<number>(1);
  const [width, setWidth] = useState<number>(0);
  const [start, setStart] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const slideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!slideRef.current) return;
    const scrollWidth = slideRef.current.scrollWidth;
    const childrenElementCount = slideRef.current.childElementCount;
    const width = scrollWidth / childrenElementCount;
    setWidth(width);
  }, []);

  function plusSlides(n: number) {
    setSlideIndex(prev => prev + n);
    slideShow(slideIndex + n);
  }

  function slideShow(n: number) {
    if (n > images.length) {
      setSlideIndex(1);
    }
    if (n < 1) {
      setSlideIndex(images.length);
    }
  }

  // Drag
  function dragStart(e: React.DragEvent<HTMLDivElement>) {
    setStart(e.clientX);
  }

  function dragOver(e: React.DragEvent<HTMLDivElement>) {
    const touch = e.clientX;
    setChange(start - touch);
  }

  function dragEnd() {
    if (slideRef.current && width) {
      if (change > 0) {
        slideRef.current.scrollLeft += width;
      } else {
        slideRef.current.scrollLeft -= width;
      }
    }
  }

  useEffect(() => {
    if (!slideRef.current) return;
    const numOfThumb = Math.round(slideRef.current.offsetWidth / width);
    slideRef.current.scrollLeft =
      slideIndex >= numOfThumb ? (slideIndex - 1) * width : 0;
  }, [width, slideIndex]);

  return (
    <div className={styles['container']}>
      <div className={styles['product-page-img']}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles['mySlides']}
            style={{ display: index + 1 === slideIndex ? 'block' : 'none' }}
          >
            <img src={image} alt="" />
          </div>
        ))}
        <a href="#!" className={styles['prev']} onClick={() => plusSlides(-1)}>
          &#10094;
        </a>
        <a href="#!" className={styles['next']} onClick={() => plusSlides(1)}>
          &#10095;
        </a>
        <div
          className={styles['slider-img']}
          draggable={true}
          ref={slideRef}
          onDragStart={dragStart}
          onDragOver={dragOver}
          onDragEnd={dragEnd}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles['slider-box']} ${
                index + 1 === slideIndex ? styles['active'] : ''
              }`}
              onClick={() => {
                setSlideIndex(index + 1);
              }}
            >
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailSlider;
