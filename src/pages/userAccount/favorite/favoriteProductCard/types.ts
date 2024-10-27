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

// Асинхронна дія для отримання списку улюблених товарів
export const fetchFavoriteCount = createAsyncThunk(
  'favorites/fetchFavoriteCount',
  async (_, { rejectWithValue }) => {
    const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

    const authResponse = await isAuth();
    if (!authResponse) {
      return rejectWithValue('User is not authenticated');
    }

    try {
      const response = await axios.get<Props[]>(
        `${process.env.REACT_APP_API_URL}/wishlist/list`,
        {
          headers: {
            Authorization: `${jwt}`,
          },
        },
      );

      // Повертаємо масив товарів
      return response.data;
    } catch (error) {
      console.error('Failed to fetch favorite products:', error);
      return rejectWithValue('Failed to fetch favorite products');
    }
  },
);

interface FavoriteState {
  items: Props[]; // Зберігає масив улюблених товарів
  count: number; // Кількість товарів
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Стан запиту
  error: string | null; // Помилка
}

// Створюємо слайс для улюблених товарів
const favoriteCountSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [] as Props[],
    count: 0,
    status: 'idle',
    error: null,
  } as FavoriteState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavoriteCount.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFavoriteCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Оновлюємо масив товарів
        state.count = action.payload.length; // Оновлюємо кількість улюблених товарів
      })
      .addCase(fetchFavoriteCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default favoriteCountSlice.reducer;
