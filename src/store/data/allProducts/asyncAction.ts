import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProductData } from '@/models/models';
import { IFetchParams } from '@store/data/allProducts/types';
import { getQueriesForProducts } from '@/utils/queriesForUrl/getQueriesForProducts/getQueriesForProducts';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async ({ page, size, sort, category, query }: IFetchParams) => {
    const queryString = getQueriesForProducts({
      page,
      size,
      sort,
      category,
      query,
    });

    const url = `${process.env.REACT_APP_API_URL}/products?${queryString}`;

    const { data } = await axios.get<IProductData>(url);

    return data;
  },
);
