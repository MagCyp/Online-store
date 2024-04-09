import { FC, useEffect, useState } from 'react';

import Badge from '@/components/badge/Badge';
import IconButton from '@/components/iconButton/IconButton';
import HeartOpacity from '@/components/icons/HeartOpacity';
import HeartWhite from '@/components/icons/HeartWhite';
import Button from '@/components/button/Button';

import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';

import { setCart, setFavorites } from '@/store/slices/user/userSlice';

import { Props } from '@/components/productCard/types';

import styles from '@components/productCard/ProductCard.module.scss';

const ProductCard: FC<Props> = ({
  topLabel,
  bottomLabel,
  brand,
  name,
  shortDescription,
  price,
  priceWithSale,
  imageUrl,
  id,
}) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  const [formattedShortDesc, setFormattedShortDesc] = useState<string>('');
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state => state.user.favorites).includes(id);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useEffect(() => {
    if (shortDescription) {
      const isContinuousWord =
        shortDescription.length > 33 && !/\s/.test(shortDescription);

      if (isContinuousWord) {
        const formattedString = shortDescription.replace(/(.{10})/g, '$1 ');
        setFormattedShortDesc(formattedString);
      } else {
        setFormattedShortDesc(shortDescription);
      }
    }
  }, [shortDescription]);

  return (
    <div
      className={styles['container']}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles['image-container']}>
        {topLabel && (
          <div className={styles['top-label']}>
            <Badge className="gray small" text={topLabel} />
          </div>
        )}
        <div
          className={styles['top-button']}
          style={{ visibility: isHovered ? 'visible' : 'hidden' }}
        >
          <IconButton
            className="link-gray"
            type="button"
            icon={
              isFavorite ? (
                <HeartWhite size="small" />
              ) : (
                <HeartOpacity size="small" />
              )
            }
            onClick={() => dispatch(setFavorites(id))}
          />
        </div>
        <img className={styles['image']} src={imageUrl} alt="" />
        {bottomLabel && (
          <div className={styles['bottom-label']}>
            <Badge className="gray small" text={bottomLabel} />
          </div>
        )}
      </div>
      <div className={styles['content']}>
        <div>
          <p className={styles['brand']}>{brand}</p>
          <p className={styles['product-name']}>{name}</p>
        </div>
        <p className={styles['short-description']}>{formattedShortDesc}</p>
        <div className={styles['price-container']}>
          {priceWithSale ? (
            <>
              <h6 className={styles['price']}>${priceWithSale}</h6>
              <h6 className={styles['sale-price']}>${price}</h6>
            </>
          ) : (
            <h6 className={styles['price']}>${price}</h6>
          )}
        </div>
      </div>
      <Button
        type="button"
        text="Add to cart"
        className="secondary medium"
        isHidden={!isHovered}
        onClick={() => dispatch(setCart(id))}
      />
    </div>
  );
};

export default ProductCard;
