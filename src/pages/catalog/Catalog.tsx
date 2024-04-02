import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import InputDropDown from '@components/inputDropDown/InputDropDown';
import Pagination from '@components/pagination/Pagination';
import Button from '@components/button/Button';
import Load from '@components/icons/Load';
import Breadcrumb from '@components/breadcrumb/Breadcrumb';
import Container from '@components/container/Container';
import DynamicBackgroundEffects from '@components/dynamicBackgroundEffects/DynamicBackgroundEffects';
import SideBar from '@pages/catalog/sideBar/SideBar';
import ProductList from '@pages/catalog/productList/ProductList';

import { useAppDispatch, useAppSelector } from '@hooks/redux/redux';

import { setSortBy } from '@store/slices/catalog/catalogSlice';
import { fetchAllProducts } from '@store/data/allProducts/asyncAction';

import { generateRequest } from '@utils/CatalogPage/generateRequest';

import { IProduct } from '@models/models';

import styles from '@pages/catalog/Catalog.module.scss';

const sortProduct = [
  { name: 'New', sortBy: 'createdAt,DESC' },
  { name: 'Oldest', sortBy: 'createdAt,ASC' },
  { name: 'Price - low to high', sortBy: 'price,ASC' },
  { name: 'Price - high to low', sortBy: 'price,DESC' },
];

const Catalog: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number[]>([1]);
  const [needUpdate, setNeedUpdate] = useState<boolean>(false);
  const { category, id } = useParams();
  const catalog = useAppSelector(state => state.catalog);
  const { dataProducts, productsInfo, status } = useAppSelector(
    state => state.products,
  );

  const dispatch = useAppDispatch();

  const fetchData = (withQuery = false) => {
    if (category) {
      const query = generateRequest(catalog);
      dispatch(
        fetchAllProducts({
          category: category,
          page: currentPage[currentPage.length - 1] - 1,
          size: 15,
          sort: catalog.sortBy,
          query: withQuery ? query : '',
        }),
      );
    }
  };

  const loadProducts = () => {
    setCurrentPage([1]);
    setProducts([]);
    setNeedUpdate(true);
  };

  const handleSortBy = (sortBy: string) => {
    dispatch(setSortBy(sortBy));
    setNeedUpdate(true);
  };

  useEffect(() => {
    if (needUpdate) {
      fetchData(true);
      setNeedUpdate(false);
    }
  }, [needUpdate]);

  useEffect(() => {
    if (dataProducts.length > 0 && status === 'success' && productsInfo) {
      if (currentPage.length > 1) {
        setProducts([...products, ...dataProducts]);
      } else if (currentPage.length === 1) {
        setProducts(dataProducts);
        setPages(productsInfo?.totalPages);
        window.scrollTo(0, 0);
      }
    }
  }, [dataProducts]);

  const handleLoadMore = () => {
    setCurrentPage([...currentPage, currentPage[currentPage.length - 1] + 1]);
    setNeedUpdate(true);
  };

  const handleChangePage = (page: number[]) => {
    setCurrentPage(page);
    setNeedUpdate(true);
  };

  return (
    <DynamicBackgroundEffects>
      <Container>
        <div className={styles['category-container']}>
          <div className={styles['breadcrumb']}>
            <Breadcrumb category={category ?? ''} name={id ?? ''} />
          </div>
          <div className={styles['content-container']}>
            <SideBar loadProducts={() => loadProducts()} />
            <div className={styles['content']}>
              <div className={styles['sort-container']}>
                <p>Sort by:</p>
                <InputDropDown
                  options={sortProduct}
                  setSortedBy={sortBy => handleSortBy(sortBy)}
                />
              </div>
              {products ? (
                <ProductList products={products} />
              ) : (
                'any product list'
              )}
              {currentPage[currentPage.length - 1] < pages ? (
                <div className={styles['load-more']}>
                  <Button
                    iconLeft={<Load size="small" />}
                    type="button"
                    text="Load more"
                    className="secondary medium"
                    onClick={() => handleLoadMore()}
                  />
                </div>
              ) : null}
              <Pagination
                currentPage={currentPage}
                setCurrentPage={handleChangePage}
                pages={pages}
              />
            </div>
          </div>
        </div>
      </Container>
    </DynamicBackgroundEffects>
  );
};

export default Catalog;
