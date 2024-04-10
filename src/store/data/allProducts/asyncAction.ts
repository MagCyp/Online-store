import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getQueriesForProducts } from '@utils/queriesForUrl/getQueriesForProducts/getQueriesForProducts';

import { IFetchParams } from '@store/data/allProducts/types';
import { IProductData } from '@/models/models';

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

    const url = `${process.env.REACT_APP_API_UR}/products?${queryString}`;

    const { data } = await axios.get<IProductData>(url);

    return data;
  },
);
