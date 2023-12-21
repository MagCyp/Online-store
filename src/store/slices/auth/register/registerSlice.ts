import { createSlice } from '@reduxjs/toolkit';

import * as authReducers from '@store/slices/auth/register/registerReducer';

import { RegisterState } from '@store/slices/auth/register/types';

const initialState: RegisterState = {
  email: '',
  password: '',
  repeatPassword: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: authReducers,
});

export const { setRegister } = authSlice.actions;
export default authSlice.reducer;
