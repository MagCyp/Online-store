import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IFetchParams } from '@store/data/filtersProducts/types';

export const fetchFiltersProducts = createAsyncThunk(
  'products/fetchFiltersProducts',
  async (params: IFetchParams) => {
    const { category, query } = params;
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_API_URL
      }/products/filters?category.name=${category}&${query || ''}`,
    );

    return data;
  },
);
