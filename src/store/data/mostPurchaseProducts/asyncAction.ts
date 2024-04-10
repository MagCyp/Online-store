import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProductData } from '@/models/models';

export const fetchMostPurchaseProducts = createAsyncThunk(
  'products/fetchMostPurchaseProducts',
  async () => {
    const { data } = await axios.get<IProductData>(
      `${process.env.REACT_APP_API_UR}/products/most-purchase`,
    );

    return data;
  },
);
