import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProductData } from '@/models/models';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async () => {
    const { data } = await axios.get<IProductData>(
      `http://localhost:8080/reviews/best-rate`,
    );

    return data;
  },
);
