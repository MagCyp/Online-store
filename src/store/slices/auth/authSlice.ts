import { createSlice } from '@reduxjs/toolkit';

import { login } from '@store/data/auth/loginThunk';
import { register } from '@store/data/auth/registerThunk';
import { IAuthResponse } from '@models/models';

interface AuthState extends IAuthResponse {
  loading: boolean;
}

const initialState: AuthState = {
  access_token: '',
  refresh_token: '',
  message: '',
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
        const { access_token, refresh_token } = action.payload.data;

        state.access_token = access_token;

        state.refresh_token = refresh_token;

        if (access_token) {
          if (action.payload.rememberMe) {
            localStorage.setItem('jwt', access_token);
          } else {
            sessionStorage.setItem('jwt', access_token);
          }
        }
      })
      .addCase(login.rejected, (state, action) => {
        if (
          action.payload &&
          typeof action.payload === 'object' &&
          'data' in action.payload
        ) {
          state.message = (
            action.payload as { data: { message: string } }
          ).data.message;
        } else {
          state.message = 'Login failed';
        }
      })
      .addCase(register.pending, state => {
        state.loading = true;
      })
      .addCase(
        register.fulfilled,
        (
          state,
          // action
        ) => {
          state.loading = false;
          // state.jwt = action.payload.jwt;
          // state.success = action.payload.success;
          // state.failureReason = action.payload.failureReason;
        },
      )
      .addCase(register.rejected, state => {
        state.loading = false;
        // state.success = false;
        state.message = 'User already exist';
      });
  },
});

export default authSlice.reducer;
