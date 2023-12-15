import { PayloadAction } from '@reduxjs/toolkit';

import { CatalogState } from '@store/slices/catalog/types';

export const setPriceRange = (
  state: CatalogState,
  action: PayloadAction<number[]>,
) => {
  state.priceRange = action.payload;
};

export const setMinMax = (
  state: CatalogState,
  action: PayloadAction<number[]>,
) => {
  state.min = action.payload[0];
  state.max = action.payload[1];
};

export const setSelected = (
  state: CatalogState,
  action: PayloadAction<number>,
) => {
  const itemToAdd = action.payload;

  const isAlreadySelected = state.selectedList.includes(itemToAdd);

  if (isAlreadySelected) {
    state.selectedList = state.selectedList.filter(item => item !== itemToAdd);
  } else {
    state.selectedList.push(itemToAdd);
  }
};
