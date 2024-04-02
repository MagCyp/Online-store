import { createSlice } from '@reduxjs/toolkit';

import { fetchFiltersProducts } from '@store/data/filtersProducts/asyncAction';

import { IFiltersSliceState } from '@store/slices/data/filters/types';

import * as filtersReducer from '@store/slices/data/filters/filtersReducer';

const initialState: IFiltersSliceState = {
  dataFilters: undefined,
  filtersStatus: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: filtersReducer,
  extraReducers: builder => {
    builder
      .addCase(fetchFiltersProducts.pending, state => {
        state.filtersStatus = 'loading';
      })
      .addCase(fetchFiltersProducts.fulfilled, (state, action) => {
        state.filtersStatus = 'success';
        state.dataFilters = action.payload;
      })
      .addCase(fetchFiltersProducts.rejected, state => {
        state.filtersStatus = 'error';
      });
  },
});

export const { setItems } = filtersSlice.actions;
export default filtersSlice.reducer;
