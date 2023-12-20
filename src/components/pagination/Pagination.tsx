import { FC } from 'react';

import PaginationButton from '@components/pagination/paginationButton/PaginationButton';
import Button from '@components/button/Button';
import ArrowLeftLine from '@components/icons/ArrowLeftLine';
import ArrowRightLine from '@components/icons/ArrowRightLine';

import { Props } from '@components/pagination/types';

import styles from '@components/pagination/Pagination.module.scss';



const Pagination: FC<Props> = ({ pages, currentPage, setCurrentPage }) => {
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  const getPageSubset = () => {
    const l = currentPage.length;
    const activePage = currentPage[l - 1];

    if (activePage <= 4) {
      return [...pageNumbers.slice(0, 5), '...', pages];
    }

    if (activePage >= pages - 3) {
      return [1, '...', ...pageNumbers.slice(pages - 5, pages + 1)];
    }

    return [1, '...', activePage - 1, activePage, activePage + 1, '...', pages];
  };

  const changePage = (left: boolean, right: boolean) => {
    const l = currentPage.length;
    let activePage = currentPage[l - 1];

    if (activePage === 1) {
      left = false;
    }

    if (activePage === pages) {
      right = false;
    }

    left && setCurrentPage([--activePage]);
    right && setCurrentPage([++activePage]);
  };

  return (
    <div className={styles['container']}>
      <Button
        iconLeft={<ArrowLeftLine size="small" />}
        type="button"
        className="link-gray small"
        text="Previous"
        isVisible
        onClick={() => changePage(true, false)}
      />
      <div className={styles['pages']}>
        {getPageSubset().map((pageNumber, index) => (
          <PaginationButton
            key={index}
            value={pageNumber}
            onClick={() => setCurrentPage([pageNumber as number])}
            isActive={currentPage.includes(pageNumber as number)}
          />
        ))}
      </div>
      <Button
        iconRight={<ArrowRightLine size="small" />}
        type="button"
        className="link-gray small"
        text="Next"
        isVisible
        onClick={() => changePage(false, true)}
      />
    </div>
  );
};

export default Pagination;
