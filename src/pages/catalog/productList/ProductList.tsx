import { FC } from 'react';

import ProductCard from '@components/productCard/ProductCard';
import ProductCardSkeleton from '@/components/skeletons/productCardSkeleton/ProductCardSkeleton';

import { Props } from '@pages/catalog/productList/types';

import styles from '@pages/catalog/productList/ProductList.module.scss';

const ProductList: FC<Props> = ({ products, isLoading }) => {
  return (
    <div className={styles.container}>
      {isLoading || !products || !products.length
        ? Array.from({ length: 15 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : products.map(product => (
            <ProductCard
              key={product.id}
              brand={product.brand}
              name={product.name}
              shortDescription={product.shortDescription}
              price={product.price}
              imageUrl={product.imageUrl}
              id={product.id}
              createdAt={product.createdAt}
              priceWithSale={product.priceWithSale}
            />
          ))}
    </div>
  );
};

export default ProductList;
