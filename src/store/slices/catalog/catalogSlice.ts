import { createSlice } from '@reduxjs/toolkit';

import { CatalogState } from '@store/slices/catalog/types';

import * as catalogReducers from '@store/slices/catalog/catalogReducers';

const initialState: CatalogState = {
  min: 0,
  max: 100,
  priceRange: [0, 100],
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
} = catalogSlice.actions;
export default catalogSlice.reducer;
