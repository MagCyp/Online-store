import { PayloadAction } from '@reduxjs/toolkit';

import { CatalogState, Selected } from '@store/slices/catalog/types';

import { initialState } from '@store/slices/catalog/catalogSlice';

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
};

export const setSelected = (
  state: CatalogState,
  action: PayloadAction<Selected>,
) => {
  const valueWithEncodedPercent = action.payload.value.replace(/%/g, '%25');

  const itemToAdd = `${action.payload.type}.${action.payload.key}=${valueWithEncodedPercent}`;

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

export const clearState = (state: CatalogState) => {
  state.min = initialState.min;
  state.max = initialState.max;
  state.priceRange = initialState.priceRange;
  state.selectedList = initialState.selectedList;
  state.sortBy = initialState.sortBy;
  state.inSale = initialState.inSale;
  state.inStock = initialState.inStock;
};
