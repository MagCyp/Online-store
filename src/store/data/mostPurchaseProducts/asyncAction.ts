import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMostPurchaseProducts = createAsyncThunk(
  'products/fetchMostPurchaseProducts',
  async () => {
    const { data } = await axios.get(
      `http://localhost:8080/products/most-purchase`,
    );

    return data;
  },
);
