import { PayloadAction } from '@reduxjs/toolkit';

import { IFiltersSliceState } from '@store/slices/data/filters/types';

export const setItems = (
  state: IFiltersSliceState,
  action: PayloadAction<IFiltersSliceState>,
) => {
  state.dataFilters = action.payload.dataFilters;
};
