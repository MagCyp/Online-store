import { PayloadAction } from '@reduxjs/toolkit';

import { IProductsSliceState } from '@store/slices/data/products/types';

export const setItems = (
  state: IProductsSliceState,
  action: PayloadAction<IProductsSliceState>,
) => {
  state.dataProducts = action.payload.dataProducts;
  state.dataMostPurchase = action.payload.dataMostPurchase;
};
