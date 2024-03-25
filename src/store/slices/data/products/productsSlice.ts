import { createSlice } from '@reduxjs/toolkit';

import { fetchMostPurchaseProducts } from '@/store/data/mostPurchaseProducts/asyncAction';
import { fetchFiltersProducts } from '@/store/data/filtersProducts/asyncAction';
import { fetchAllProducts } from '@/store/data/allProducts/asyncAction';

import { IProductsSliceState } from '@/store/slices/data/products/types';

import * as productReducer from '@store/slices/data/products/productReducer';

const initialState: IProductsSliceState = {
  dataProducts: [],
  dataMostPurchase: [],
  dataFiltersProducts: [],
  status: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: productReducer,
  extraReducers: builder => {
    builder.addCase(fetchAllProducts.pending, state => {
      state.status = 'loading';
      state.dataMostPurchase = [];
      state.dataFiltersProducts = [];
      state.dataProducts = [];
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.status = 'success';
      state.dataProducts = action.payload._embedded.products;
    });
    builder.addCase(fetchAllProducts.rejected, state => {
      state.status = 'error';
      state.dataMostPurchase = [];
      state.dataFiltersProducts = [];
      state.dataProducts = [];
    });
    builder.addCase(fetchMostPurchaseProducts.pending, state => {
      state.status = 'loading';
      state.dataMostPurchase = [];
      state.dataFiltersProducts = [];
      state.dataProducts = [];
    });
    builder.addCase(fetchMostPurchaseProducts.fulfilled, (state, action) => {
      state.status = 'success';
      state.dataMostPurchase = action.payload;
    });
    builder.addCase(fetchMostPurchaseProducts.rejected, state => {
      state.status = 'error';
      state.dataMostPurchase = [];
      state.dataFiltersProducts = [];
      state.dataProducts = [];
    });
    builder.addCase(fetchFiltersProducts.pending, state => {
      state.status = 'loading';
      state.dataMostPurchase = [];
      state.dataFiltersProducts = [];
      state.dataProducts = [];
    });
    builder.addCase(fetchFiltersProducts.fulfilled, (state, action) => {
      state.status = 'success';
      state.dataFiltersProducts = action.payload;
    });
    builder.addCase(fetchFiltersProducts.rejected, state => {
      state.status = 'error';
      state.dataMostPurchase = [];
      state.dataFiltersProducts = [];
      state.dataProducts = [];
    });
  },
});

export const { setItems } = productsSlice.actions;
export default productsSlice.reducer;
