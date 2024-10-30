import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Badge from '@components/badge/Badge';
import IconButton from '@components/iconButton/IconButton';
// import HeartOpacity from '@components/icons/HeartOpacity';
// import HeartWhite from '@components/icons/HeartWhite';
import Button from '@components/button/Button';

import {
  useAppDispatch,
  // useAppSelector
} from '@hooks/redux/redux';

// import { setFavorites } from '@store/slices/user/userSlice';
import { cartAdd } from '@store/data/cart/cartThunks';

import { Props } from '@components/productCard/types';

import styles from '@components/productCard/ProductCard.module.scss';

const ProductCard: FC<Props> = ({
  createdAt,
  brand,
  name,
  shortDescription,
  price,
  priceWithSale,
  imageUrl,
  rating,
  id,
}) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  const [formattedShortDesc, setFormattedShortDesc] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isFavorite = useAppSelector(state => state.user.favorites).includes(id);

  const handleClick = (href: string) => {
    navigate(`/product/${href}`);
    window.scrollTo(0, 0);
  };
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

  const generateTopLabel = useMemo(() => {
    const today = new Date();
    const creationDate = new Date(createdAt);
    const diff = Number(today) - Number(creationDate);
    const diffInDays = diff / (1000 * 60 * 60 * 24);

    if (diffInDays >= 14) {
      return null;
    }

    return (
      <div className={styles['top-label']}>
        <Badge className="gray small" text="New" />
      </div>
    );
  }, []);

  const handleAdd = () => {
    dispatch(cartAdd([{ id: id, quantity: 1 }]));
  };

  return (
    <div
      className={styles['container']}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={() => handleClick(id)}>
        <div className={styles['image-container']}>
          {generateTopLabel}
          <div
            className={styles['top-button']}
            style={{ visibility: isHovered ? 'visible' : 'hidden' }}
          >
            <IconButton
              className="link-gray"
              type="button"
              // icon={
              //   isFavorite ? (
              //     <HeartWhite size="small" />
              //   ) : (
              //     <HeartOpacity size="small" />
              //   )
              // }
              // onClick={() => dispatch(setFavorites(id))}
            />
          </div>
          <img className={styles['image']} src={imageUrl} alt="" />

          <div className={styles['bottom-label']}>
            <Badge className="gray small" text={rating} isRating />
          </div>
        </div>
        <div className={styles['content']}>
          <div>
            <p className={styles['brand']}>{brand}</p>
            <p className={styles['product-name']} data-tooltip={name}>
              {name}
            </p>
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
      </div>
      <Button
        type="button"
        text="Add to cart"
        className="secondary medium"
        isHidden={!isHovered}
        onClick={() => handleAdd()}
      />
    </div>
  );
};

export default ProductCard;
