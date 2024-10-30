import { PayloadAction } from '@reduxjs/toolkit';

import { IReviewsSliceState } from '@store/slices/data/reviews/types';

export const setItems = (
  state: IReviewsSliceState,
  action: PayloadAction<IReviewsSliceState>,
) => {
  state.reviews = action.payload.reviews;
};
