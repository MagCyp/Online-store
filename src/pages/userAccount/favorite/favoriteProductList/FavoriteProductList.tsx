import { FC } from 'react';

import FavoriteProductCard from '@pages/userAccount/favorite/favoriteProductCard/FavoriteProductCard';
import ProductCardSkeleton from '@/components/skeletons/productCardSkeleton/ProductCardSkeleton';

import { Props } from '@pages/userAccount/favorite/favoriteProductList/types';

import styles from '@pages/userAccount/favorite/favoriteProductList/FavoriteProductList.module.scss';

const FavoriteProductList: FC<Props> = ({ products, isLoading }) => {
  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <div className={styles.container}>
          {Array.from({ length: 15 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <h2 className={styles.noFavorites}>
          You have not added any products <br /> to your favorites yet
        </h2>
      ) : (
        <div className={styles.container}>
          {products.map(product => (
            <FavoriteProductCard
              key={product.id}
              brand={product.brand}
              name={product.name}
              shortDescription={product.shortDescription}
              price={product.price}
              imageUrl={product.imageUrl}
              id={product.id}
              rating={product.rating}
              createdAt={product.createdAt}
              priceWithSale={product.priceWithSale}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteProductList;
