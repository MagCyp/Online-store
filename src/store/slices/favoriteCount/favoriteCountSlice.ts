import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { isAuth } from '@/hooks/isAuth/isAuth';

export interface Props {
  createdAt: string;
  brand: string;
  name: string;
  shortDescription: string;
  price: number;
  rating: number;
  priceWithSale?: number | null;
  imageUrl: string;
  id: string;
}

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { rejectWithValue }) => {
    const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

    const authResponse = await isAuth();
    if (!authResponse) {
      return rejectWithValue('User is not authenticated');
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/wishlist/list`,
        {
          headers: {
            Authorization: `${jwt}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Failed to fetch favorite products:', error);
      return rejectWithValue('Failed to fetch favorite products');
    }
  },
);

const favoriteCountSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [] as Props[],
    count: 0,
    status: 'idle',
    error: null as string | null,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload);
      state.count = state.items.length;
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.count = state.items.length;
    },
    resetFavorites: state => {
      state.items = [];
      state.count = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { addFavorite, removeFavorite, resetFavorites } =
  favoriteCountSlice.actions;
export default favoriteCountSlice.reducer;
