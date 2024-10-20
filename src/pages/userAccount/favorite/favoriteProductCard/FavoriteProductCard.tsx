import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Badge from '@components/badge/Badge';
import HeartOpacity from '@components/icons/HeartOpacity';
import HeartWhite from '@components/icons/HeartWhite';
import Button from '@components/button/Button';

import { useAppDispatch } from '@hooks/redux/redux';

import { cartAdd } from '@store/data/cart/cartThunks';

import { Props } from '@pages/userAccount/favorite/favoriteProductCard/types';

import styles from '@pages/userAccount/favorite/favoriteProductCard/FavoriteProductCard.module.scss';

const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
const path = '/products';
const baseURL = process.env.REACT_APP_API_URL;

const FavoriteProductCard: FC<Props> = ({
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
  const [liked, setLiked] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toggleLike = async () => {
    try {
      if (liked) {
        await axios.delete(`${baseURL}/wishlist/remove/${id}`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        setLiked(false);
      } else {
        await axios.post(
          `${baseURL}/wishlist/add/${id}`,
          {},
          {
            headers: {
              Authorization: `${jwt}`,
            },
          },
        );

        setLiked(true);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

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
            <Button
              text=""
              className="round-image"
              type="button"
              fullWidth={true}
              iconLeft={
                liked ? (
                  <HeartWhite size={'medium'} />
                ) : (
                  <HeartOpacity size={'medium'} />
                )
              }
              onClickEvent={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                toggleLike();
              }}
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
        // isHidden={!isHovered}
        isHidden={false}
        onClick={() => handleAdd()}
      />
    </div>
  );
};

export default FavoriteProductCard;
