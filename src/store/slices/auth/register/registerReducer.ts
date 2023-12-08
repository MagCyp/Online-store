import { PayloadAction } from '@reduxjs/toolkit';

import { RegisterState } from '@store/slices/auth/register/types';

export const setRegister = (
  state: RegisterState,
  action: PayloadAction<RegisterState>,
) => {
  state.email = action.payload.email;
  state.password = action.payload.password;
  state.firstName = action.payload.firstName;
  state.lastName = action.payload.lastName;
  state.phoneNumber = action.payload.phoneNumber;
  state.repeatPassword = action.payload.repeatPassword;
};
