import { createSlice } from '@reduxjs/toolkit';

import { cartAdd, cartRemove, cartGet } from '@store/data/cart/cartThunks';

import { CartState } from '@store/slices/cart/types';

const initialState: CartState = {
  items: [],
  status: 'loading',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(cartAdd.pending, state => {
        state.status = 'loading';
      })
      .addCase(cartAdd.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(cartAdd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(cartRemove.pending, state => {
        state.status = 'loading';
      })
      .addCase(cartRemove.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(cartRemove.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(cartGet.pending, state => {
        state.status = 'loading';
      })
      .addCase(cartGet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(cartGet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
