import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFetchParams } from './types';

export const fetchFiltersProducts = createAsyncThunk(
  'products/fetchFiltersProducts',
  async (params: IFetchParams) => {
    const { brandName } = params;
    const { data } = await axios.get(
      `http://localhost:8080/products/filters?brand.name=${brandName}`,
    );

    return data;
  },
);
