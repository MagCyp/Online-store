import { createSlice } from '@reduxjs/toolkit';

import * as paymentReducers from '@store/slices/payment/paymentReducers';

import { PaymentState } from '@store/slices/payment/types';

export const initialState: PaymentState = {
  firstName: '',
  lastName: '',
  number: '',
  email: '',
  region: '',
  city: '',
  street: '',
  house: '',
  apartment: '',
  postalCode: '',
  delivery: 'express',
  total: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: paymentReducers,
});

export const { setData } = paymentSlice.actions;

export default paymentSlice.reducer;
