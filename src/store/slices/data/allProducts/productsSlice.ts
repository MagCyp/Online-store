import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchMostPurchaseProducts } from '@/store/data/mostPurchaseProducts/asyncAction';
import { fetchFiltersProducts } from '@/store/data/filtersProducts/asyncAction';
import { fetchAllProducts } from '@/store/data/allProducts/asyncAction';

import { IProduct } from '@/models/models';
import { IProductsSliceState } from '@store/slices/data/allProducts/types';

const initialState: IProductsSliceState = {
  data: [],
  status: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IProduct[]>) {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAllProducts.pending, state => {
      state.status = 'loading';
      state.data = [];
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload._embedded.products;
    });
    builder.addCase(fetchAllProducts.rejected, state => {
      state.status = 'error';
      state.data = [];
    });
    builder.addCase(fetchMostPurchaseProducts.pending, state => {
      state.status = 'loading';
      state.data = [];
    });
    builder.addCase(fetchMostPurchaseProducts.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(fetchMostPurchaseProducts.rejected, state => {
      state.status = 'error';
      state.data = [];
    });
    builder.addCase(fetchFiltersProducts.pending, state => {
      state.status = 'loading';
      state.data = [];
    });
    builder.addCase(fetchFiltersProducts.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(fetchFiltersProducts.rejected, state => {
      state.status = 'error';
      state.data = [];
    });
  },
});

export const { setItems } = productsSlice.actions;
export default productsSlice.reducer;
