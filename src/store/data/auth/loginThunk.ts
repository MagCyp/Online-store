import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IAuthResponse } from '@models/models';

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI) => {
    const response = await axios.post<IAuthResponse>(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      credentials,
    );

    return response.data;
  },
);
