import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProductData } from '@/models/models';

export const fetchMostPurchaseProducts = createAsyncThunk(
  'products/fetchMostPurchaseProducts',
  async () => {
    const { data } = await axios.get<IProductData>(
      `http://localhost:8080/products/most-purchase`,
    );

    return data;
  },
);
