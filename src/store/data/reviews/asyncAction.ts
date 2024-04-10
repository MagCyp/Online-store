import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProductData } from '@/models/models';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async () => {
    const { data } = await axios.get<IProductData>(
      `${process.env.REACT_APP_API_UR}/reviews/best-rate`,
    );

    return data;
  },
);
