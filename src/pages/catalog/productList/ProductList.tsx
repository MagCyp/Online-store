import React from 'react';
import ProductCard from '@/components/productCard/ProductCard';

import { Props } from '@pages/catalog/productList/types';

import styles from '@/pages/catalog/productList/ProductList.module.scss';

const ProductList: React.FC<Props> = ({ products }) => {
  const chunkSize = 3;

  const chunkedProducts = Array.from(
    { length: Math.ceil(products.length / chunkSize) },
    (_, index) => products.slice(index * chunkSize, (index + 1) * chunkSize),
  );

  return (
    <div className={styles['container']}>
      {chunkedProducts.map((chunk, rowIndex) => (
        <div key={rowIndex} className={styles['row-container']}>
          {chunk.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
