import { createSlice } from '@reduxjs/toolkit';

import { login } from '@store/data/auth/loginThunk';
import { register } from '@store/data/auth/registerThunk';
import { IAuthResponse } from '@models/models';

interface AuthState extends IAuthResponse {
  loading: boolean;
}

const initialState: AuthState = {
  jwt: null,
  success: false,
  failureReason: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.data.jwt;
        state.success = action.payload.data.success;
        state.failureReason = action.payload.data.failureReason;

        if (typeof action.payload.data.jwt === 'string') {
          if (action.payload.rememberMe) {
            localStorage.setItem('jwt', action.payload.data.jwt);
          } else {
            sessionStorage.setItem('jwt', action.payload.data.jwt);
          }
        }
      })
      .addCase(login.rejected, state => {
        state.loading = false;
        state.success = false;
        state.failureReason = 'Enter valid data';
      })
      .addCase(register.pending, state => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.success = action.payload.success;
        state.failureReason = action.payload.failureReason;
      })
      .addCase(register.rejected, state => {
        state.loading = false;
        state.success = false;
        state.failureReason = 'User already exist';
      });
  },
});

export default authSlice.reducer;
