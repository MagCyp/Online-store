import { IFetchParams } from '@store/data/allProducts/types';

export const getQueriesForProducts = ({
  page,
  size,
  sort,
  category,
  query,
}: IFetchParams): string => {
  const queryParams = [];

  if (page !== undefined && page !== null) queryParams.push(`page=${page}`);
  if (size) queryParams.push(`size=${size}`);
  if (sort) queryParams.push(`sort=${sort}`);
  if (category) queryParams.push(`category.name=${category}`);
  if (query) queryParams.push(`${query}`);

  const queryString = queryParams.join('&');

  return queryString;
};
