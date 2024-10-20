import { FC } from 'react';

import ProductCard from '@components/productCard/ProductCard';
import ProductCardSkeleton from '@/components/skeletons/productCardSkeleton/ProductCardSkeleton';
import FavoriteProductCard from '@pages/userAccount/favorite/favoriteProductCard/FavoriteProductCard';

import { Props } from '@pages/userAccount/favorite/favoriteProductList/types';

import styles from '@pages/userAccount/favorite/favoriteProductList/FavoriteProductList.module.scss';

const FavoriteProductList: FC<Props> = ({ products, isLoading }) => {
  return (
    <div className={styles.container}>
      {isLoading || !products || !products.length
        ? Array.from({ length: 15 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : products.map(product => (
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
  );
};

export default FavoriteProductList;
