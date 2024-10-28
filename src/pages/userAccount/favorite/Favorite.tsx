import { FC, useEffect, useState } from 'react';

import Container from '@components/container/Container';
import FavoriteProductList from '@pages/userAccount/favorite/favoriteProductList/FavoriteProductList';
import InputDropDown from '@components/inputDropDown/InputDropDown';

import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';

import { fetchFavorites } from '@store/slices/favoriteCount/favoriteCountSlice';

import { IProduct } from '@models/models';

import styles from '@pages/userAccount/favorite/favorite.module.scss';

const sortOptions = [
  { name: 'New', sortBy: 'createdAt,DESC' },
  { name: 'Oldest', sortBy: 'createdAt,ASC' },
  { name: 'Price - low to high', sortBy: 'price,ASC' },
  { name: 'Price - high to low', sortBy: 'price,DESC' },
];

const Favorite: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.favorites.items as IProduct[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>(products);
  const [sortBy, setSortBy] = useState<string>('createdAt,DESC');

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
    const [key, order] = sortBy.split(',');

    const sorted = [...products].sort((a, b) => {
      const valueA = a[key as keyof IProduct];
      const valueB = b[key as keyof IProduct];

      if (valueA == null || valueB == null) return 0;

      if (order === 'ASC') {
        return valueA > valueB ? 1 : -1;
      }
      return valueA < valueB ? 1 : -1;
    });

    setSortedProducts(sorted);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchFavorites()).finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  return (
    <Container>
      <div className={styles['favorite-container']}>
        <div className={styles['sort-container']}>
          <p>Sort by:</p>
          <InputDropDown
            options={sortOptions}
            setSortedBy={sortBy => handleSortBy(sortBy)}
          />
        </div>
        <FavoriteProductList products={sortedProducts} isLoading={isLoading} />
      </div>
    </Container>
  );
};

export default Favorite;
