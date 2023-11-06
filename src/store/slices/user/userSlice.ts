import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from './types';

const initialState: UserState = {
  email: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
