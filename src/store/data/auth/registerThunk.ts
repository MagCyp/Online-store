import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IAuthResponse } from '@/models/models';

interface RegisterCredentials {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials) => {
    const response = await axios.post<IAuthResponse>(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      credentials,
    );

    return response.data;
  },
);
