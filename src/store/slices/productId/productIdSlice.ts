import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { IProductIdSliceState, IRoot } from '@store/slices/productId/types';

export const getProductById = createAsyncThunk<
  IRoot,
  string,
  { rejectValue: string }
>('productId/getProductById', async (id: string, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IRoot> = await axios.get<IRoot>(
      `${process.env.REACT_APP_API_URL}/products/${id}`,
    );
    const data: IRoot = response.data;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(`getProductById ${error.message}`);
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

const initialState: IProductIdSliceState = {
  data: {} as IRoot,
  loading: false,
  error: null,
};

const productIdSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductById.pending, state => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default productIdSlice.reducer;
