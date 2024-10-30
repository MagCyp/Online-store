import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IAuthResponse } from '@models/models';
import { LoginCredentials } from '@store/data/auth/types';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await axios.post<IAuthResponse>(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      credentials,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return { data: response.data, rememberMe: credentials.rememberMe };
  },
);
