import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import InputDropDown from '@/components/inputDropDown/InputDropDown';
import Pagination from '@/components/pagination/Pagination';
import Button from '@/components/button/Button';
import Load from '@/components/icons/Load';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';
import SideBar from '@/pages/catalog/sideBar/SideBar';
import Container from '@/components/container/Container';
import ProductList from '@pages/catalog/productList/ProductList';

import styles from '@/pages/catalog/Catalog.module.scss';

const sortProduct = [
  'New',
  'Best sellers',
  'Price - low to high',
  'Price - high to low',
];

const Catalog: FC = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState<number[]>([1]);
  const [listSize, setListSize] = useState<number>(15);
  const { category, id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/product/category/${category}?page=${currentPage[0]}&size=${listSize}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProducts(data.content);
        setPages(data.totalPages);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, listSize, category]);

  const handleLoadMore = () => {
    setCurrentPage([...currentPage, currentPage[currentPage.length - 1] + 1]);
    setListSize(listSize + 15);
  };

  const handleChangePage = (page: number[]) => {
    setCurrentPage(page);
    setListSize(15);
  };

  return (
    <Container>
      <div className={styles['category-container']}>
        <div className={styles['breadcrumb']}>
          <Breadcrumb category={category ?? ''} name={id ?? ''} />
        </div>
        <div className={styles['content-container']}>
          <SideBar />
          <div className={styles['content']}>
            <div className={styles['sort-container']}>
              <p>Sort by:</p>
              <InputDropDown options={sortProduct} sort="product" />
            </div>
            <ProductList products={products} />
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
