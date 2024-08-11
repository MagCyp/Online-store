import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserData } from '@models/models';

interface UserState {
  userData: IUserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserDataSuccess(state, action: PayloadAction<IUserData>) {
      state.loading = false;
      state.userData = action.payload;
      console.log(action.payload);
    },
    fetchUserDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserDataStart,
  fetchUserDataSuccess,
  fetchUserDataFailure,
} = userSlice.actions;

export default userSlice.reducer;
