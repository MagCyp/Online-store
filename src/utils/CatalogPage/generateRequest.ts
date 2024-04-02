import { CatalogState } from '@store/slices/catalog/types';

export const generateRequest = (catalog: CatalogState) => {
  const selectedList = catalog.selectedList.join('&');
  const inSale = catalog.inSale;
  const inStock = catalog.inStock;
  const priceMin = catalog.min;
  const priceMax = catalog.max;

  return `${selectedList}&price=${priceMin}&price=${priceMax}&${inSale}&${inStock}`;
};
