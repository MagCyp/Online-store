import { FC } from 'react';

import ProductCardSkeleton from '@/components/skeletons/productCardSkeleton/ProductCardSkeleton';
import FavoriteProductCard from '@pages/userAccount/favorite/favoriteProductCard/FavoriteProductCard';

import { Props } from '@pages/userAccount/favorite/favoriteProductList/types';

import styles from '@pages/userAccount/favorite/favoriteProductList/FavoriteProductList.module.scss';

const FavoriteProductList: FC<Props> = ({ products, isLoading }) => {
  return (
    <div className={styles.container}>
      {isLoading ? (
        Array.from({ length: 15 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))
      ) : !products || products.length === 0 ? (
        <h2>You have not yet added a product to your favorites list</h2>
      ) : (
        products.map(product => (
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
        ))
      )}
    </div>
  );
};

export default FavoriteProductList;
