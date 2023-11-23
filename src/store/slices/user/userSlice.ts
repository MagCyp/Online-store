import { createSlice } from '@reduxjs/toolkit';

import * as userReducers from './userReducers';

import { UserState } from './types';

const initialState: UserState = {
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userReducers,
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
