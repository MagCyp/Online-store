import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import InputDropDown from '@/components/inputDropDown/InputDropDown';
import Pagination from '@/components/pagination/Pagination';
import Button from '@/components/button/Button';
import Load from '@/components/icons/Load';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import Container from '@/components/container/Container';
import SideBar from '@/pages/catalog/sideBar/SideBar';
import ProductList from '@pages/catalog/productList/ProductList';

import { useAppDispatch } from '@/hooks/redux/redux';

import { setSortBy } from '@store/slices/catalog/catalogSlice';

import { Props as ProductProps } from '@/components/productCard/types';

import styles from '@/pages/catalog/Catalog.module.scss';

const sortProduct = [
  { name: 'New', sortBy: 'createdAt,DESC' },
  { name: 'Oldest', sortBy: 'createdAt,ASC' },
  { name: 'Price - low to high', sortBy: 'price,ASC' },
  { name: 'Price - high to low', sortBy: 'price,DESC' },
];

const Catalog: FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number[]>([1]);
  const { category, id } = useParams();
  const [request, setRequest] = useState<string>();
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    try {
      const queryString = request ? `&${request}` : '';
      const response = await fetch(
        `http://localhost:8080/products?category.name=${
          category === 'Mouse Pad' ? 'Pad' : category
        }&page=${
          currentPage[currentPage.length - 1] - 1
        }&size=15${queryString}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      if (data && data._embedded && data._embedded.products) {
        setProducts(data._embedded.products);
        setPages(data.page.totalPages);
        setCurrentPage([1]);
      }
    };

    getData();
  }, [request, category]);

  const handleLoadMore = async () => {
    setCurrentPage([...currentPage, currentPage[currentPage.length - 1] + 1]);
  };

  const handleChangePage = async (page: number[]) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();

      if (data && data._embedded) {
        if (currentPage.length > 1) {
          setProducts([...products, ...data._embedded.products]);
        } else {
          setProducts(data._embedded.products);
        }
      }
    };

    getData();
  }, [currentPage]);

  return (
    <Container>
      <div className={styles['category-container']}>
        <div className={styles['breadcrumb']}>
          <Breadcrumb category={category ?? ''} name={id ?? ''} />
        </div>
        <div className={styles['content-container']}>
          <SideBar loadProduct={setRequest} />
          <div className={styles['content']}>
            <div className={styles['sort-container']}>
              <p>Sort by:</p>
              <InputDropDown
                options={sortProduct}
                setSortedBy={sortBy => dispatch(setSortBy(sortBy))}
              />
            </div>
            {products !== undefined ? (
              <ProductList products={products} />
            ) : (
              'any product list'
            )}
            <div className={styles['load-more']}>
              <Button
                iconLeft={<Load size="small" />}
                type="button"
                text="Load more"
                className="secondary medium"
                onClick={() => handleLoadMore()}
              />
            </div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={handleChangePage}
              pages={pages}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Catalog;
