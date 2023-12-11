import { PayloadAction } from '@reduxjs/toolkit';

import { LoginState } from '@store/slices/auth/login/types';

export const setLogin = (
  state: LoginState,
  action: PayloadAction<LoginState>,
) => {
  state.email = action.payload.email;
  state.password = action.payload.password;
};
