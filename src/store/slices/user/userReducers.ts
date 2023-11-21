import { UserState } from './types';
import { PayloadAction } from '@reduxjs/toolkit';

export const setUser = (state: UserState, action: PayloadAction<UserState>) => {
  state.email = action.payload.email;
  state.token = action.payload.token;
};