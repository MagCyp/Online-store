import { createSlice } from '@reduxjs/toolkit';

import { CatalogState } from '@store/slices/catalog/types';

import * as catalogReducers from '@store/slices/catalog/catalogReducers';

export const initialState: CatalogState = {
  min: 0,
  max: 0,
  priceRange: [],
  selectedList: [],
  sortBy: '',
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
