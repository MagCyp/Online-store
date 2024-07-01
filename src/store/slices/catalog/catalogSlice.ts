import { createSlice } from '@reduxjs/toolkit';

import { CatalogState } from '@store/slices/catalog/types';

import * as catalogReducers from '@store/slices/catalog/catalogReducers';

export const initialState: CatalogState = {
  min: NaN,
  max: NaN,
  priceRange: [],
  selectedList: [],
  sortBy: 'createdAt,DESC',
  inSale: '',
  inStock: '',
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: catalogReducers,
});

export const {
  setPriceRange,
  setMinMax,
  setSelected,
  setSortBy,
  toggleSale,
  toggleStock,
  clearState,
} = catalogSlice.actions;

export default catalogSlice.reducer;
