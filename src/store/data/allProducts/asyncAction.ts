import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProductData } from '@/models/models';
import { IFetchParams } from '@store/data/allProducts/types';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (params: IFetchParams) => {
    const { page, size, sort } = params;
    const { data } = await axios.get<IProductData>(
      `http://localhost:8080/products?page=${page}&size=${size}&sort=${sort}`,
    );

    return data;
  },
);
