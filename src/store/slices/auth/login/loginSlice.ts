import { createSlice } from '@reduxjs/toolkit';

import * as loginReducers from '@/store/slices/auth/login/loginReducer';

import { LoginState } from '@store/slices/auth/login/types';

const initialState: LoginState = {
  email: '',
  password: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: loginReducers,
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
