import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IAuthResponse } from '@/models/models';
import { RegisterCredentials } from '@store/data/auth/types';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials) => {
    const response = await axios.post<IAuthResponse>(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      credentials,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data;
  },
);
