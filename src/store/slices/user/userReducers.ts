import { PayloadAction } from '@reduxjs/toolkit';

import { UserState } from './types';

export const setUser = (state: UserState, action: PayloadAction<UserState>) => {
  localStorage.setItem('user', JSON.stringify({ token: action.payload.token }));
  state.token = action.payload.token;
};
