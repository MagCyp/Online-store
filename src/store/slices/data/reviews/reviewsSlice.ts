import { createSlice } from '@reduxjs/toolkit';

import { fetchReviews } from '@/store/data/reviews/asyncAction';

import { IReviewsSliceState } from '@store/slices/data/reviews/types';

import * as reviewsReducer from '@store/slices/data/reviews/reviewsReducer';

const initialState: IReviewsSliceState = {
  reviews: [],
  status: '',
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: reviewsReducer,
  extraReducers: builder => {
    builder
      .addCase(fetchReviews.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'success';
        state.reviews = action.payload._embedded?.review || [];
      })
      .addCase(fetchReviews.rejected, state => {
        state.status = 'error';
      });
  },
});

export const { setItems } = reviewsSlice.actions;
export default reviewsSlice.reducer;
