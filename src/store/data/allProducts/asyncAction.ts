import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProductData } from '@/models/models';
import { IFetchParams } from '@store/data/allProducts/types';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async ({ page, size, sort, category, query }: IFetchParams) => {
    let queryParams = [];
    if (page !== undefined && page !== null) queryParams.push(`page=${page}`);
    if (size) queryParams.push(`size=${size}`);
    if (sort) queryParams.push(`sort=${sort}`);
    if (category) queryParams.push(`category.name=${category}`);
    if (query) queryParams.push(`${query}`);

    const queryString = queryParams.join('&');
    const url = `http://localhost:8080/products?${queryString}`;

    const { data } = await axios.get<IProductData>(url);

    return data;
  },
);
