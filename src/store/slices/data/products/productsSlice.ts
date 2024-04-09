import { createSlice } from '@reduxjs/toolkit';

import { fetchMostPurchaseProducts } from '@store/data/mostPurchaseProducts/asyncAction';
import { fetchAllProducts } from '@store/data/allProducts/asyncAction';

import { IProductsSliceState } from '@store/slices/data/products/types';

import * as productReducer from '@store/slices/data/products/productReducer';

const initialState: IProductsSliceState = {
  dataProducts: [],
  productsInfo: undefined,
  dataMostPurchase: [],
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
      state.dataProducts = [];
      state.productsInfo = undefined;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.status = 'success';
      state.dataProducts = action.payload._embedded?.products || [];
      state.productsInfo = action.payload.page;
    });
    builder.addCase(fetchAllProducts.rejected, state => {
      state.status = 'error';
      state.dataMostPurchase = [];
      state.dataProducts = [];
      state.productsInfo = undefined;
    });
    builder.addCase(fetchMostPurchaseProducts.pending, state => {
      state.status = 'loading';
      state.dataMostPurchase = [];
      state.dataProducts = [];
      state.productsInfo = undefined;
    });
    builder.addCase(fetchMostPurchaseProducts.fulfilled, (state, action) => {
      state.status = 'success';
      state.dataMostPurchase = action.payload._embedded?.products || [];
    });
    builder.addCase(fetchMostPurchaseProducts.rejected, state => {
      state.status = 'error';
      state.dataMostPurchase = [];
      state.dataProducts = [];
      state.productsInfo = undefined;
    });
  },
});

export const { setItems } = productsSlice.actions;
export default productsSlice.reducer;
