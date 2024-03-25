import { FC } from 'react';

import ProductCard from '@components/productCard/ProductCard';

import { Props } from '@pages/catalog/productList/types';

import styles from '@pages/catalog/productList/ProductList.module.scss';

const ProductList: FC<Props> = ({ products }) => {
  return (
    <div className={styles['container']}>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
