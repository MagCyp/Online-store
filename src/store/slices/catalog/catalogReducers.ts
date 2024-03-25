import { PayloadAction } from '@reduxjs/toolkit';

import { CatalogState, Selected } from '@store/slices/catalog/types';

export const setPriceRange = (
  state: CatalogState,
  action: PayloadAction<number[]>,
) => {
  state.priceRange = action.payload;
};

export const setMinMax = (
  state: CatalogState,
  action: PayloadAction<number[]>,
) => {
  const [min, max] = action.payload;
  state.min = min;
  state.max = max;
  state.priceRange = [min, max];
};

export const setSelected = (
  state: CatalogState,
  action: PayloadAction<Selected>,
) => {
  const itemToAdd = `${action.payload.type}.${action.payload.key}=${action.payload.value}`;

  const isAlreadySelected = state.selectedList.includes(itemToAdd);

  if (isAlreadySelected) {
    state.selectedList = state.selectedList.filter(item => item !== itemToAdd);
  } else {
    state.selectedList.push(itemToAdd);
  }
};

export const setSortBy = (
  state: CatalogState,
  action: PayloadAction<string>,
) => {
  state.sortBy = action.payload;
};

export const toggleSale = (state: CatalogState) => {
  state.inSale = state.inSale === '' ? 'isPresent=true' : '';
};

export const toggleStock = (state: CatalogState) => {
  state.inStock = state.inStock === '' ? 'true' : '';
};
