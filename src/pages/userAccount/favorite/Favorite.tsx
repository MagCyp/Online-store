import { FC, useEffect, useState } from 'react';
import axios from 'axios';

import InputDropDown from '@components/inputDropDown/InputDropDown';

import Container from '@components/container/Container';
import FavoriteProductList from '@pages/userAccount/favorite/favoriteProductList/FavoriteProductList';

import { IProduct } from '@models/models';

const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

import styles from '@pages/userAccount/favorite/favorite.module.scss';

const sortOptions = [
  { name: 'New', sortBy: 'createdAt,DESC' },
  { name: 'Oldest', sortBy: 'createdAt,ASC' },
  { name: 'Price - low to high', sortBy: 'price,ASC' },
  { name: 'Price - high to low', sortBy: 'price,DESC' },
];

const Favorite: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('createdAt,DESC');

  const fetchFavoriteProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/wishlist/list`,
        {
          headers: {
            Authorization: `${jwt}`,
          },
        },
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch favorite products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
    setProducts(
      [...products].sort((a, b) => {
        const [key, order] = sortBy.split(',');

        const valueA = a[key as keyof IProduct];
        const valueB = b[key as keyof IProduct];

        if (valueA == null || valueB == null) return 0;

        if (order === 'ASC') {
          return valueA > valueB ? 1 : -1;
        }
        return valueA < valueB ? 1 : -1;
      }),
    );
  };

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

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
        <FavoriteProductList products={products} isLoading={isLoading} />
      </div>
    </Container>
  );
};

export default Favorite;
