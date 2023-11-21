import { PayloadAction } from '@reduxjs/toolkit';

import { UserState } from './types';

export const setUser = (state: UserState, action: PayloadAction<UserState>) => {
  state.email = action.payload.email;
  state.token = action.payload.token;
};
