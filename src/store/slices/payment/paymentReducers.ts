import { PayloadAction } from '@reduxjs/toolkit';

import { PaymentState } from '@store/slices/payment/types';

export const setData = (
  state: PaymentState,
  action: PayloadAction<Partial<PaymentState>>,
) => {
  return {
    ...state,
    ...action.payload,
  };
};
