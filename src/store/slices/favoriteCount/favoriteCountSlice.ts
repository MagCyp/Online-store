import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isAuth } from '@/hooks/isAuth/isAuth';

// Асинхронна дія для отримання кількості улюблених товарів
export const fetchFavoriteCount = createAsyncThunk(
  'favorites/fetchFavoriteCount',
  async (_, { rejectWithValue }) => {
    const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

    // Спочатку перевіряємо, чи користувач залогінений
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

      // Повертаємо кількість елементів у масиві
      return response.data.length;
    } catch (error) {
      console.error('Failed to fetch favorite products:', error);
      return rejectWithValue('Failed to fetch favorite products');
    }
  },
);

// Створюємо слайс для улюблених товарів
const favoriteCountSlice = createSlice({
  name: 'favorites',
  initialState: {
    count: 0, // Початковий стан кількості
    status: 'idle', // Стан запиту: idle, loading, succeeded, failed
    error: null as string | null, // Тип має бути string | null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavoriteCount.pending, state => {
        state.status = 'loading';
        state.error = null; // Очищуємо помилку при новому запиті
      })
      .addCase(fetchFavoriteCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.count = action.payload; // Оновлюємо кількість улюблених товарів
      })
      .addCase(fetchFavoriteCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Присвоюємо помилку
      });
  },
});

export default favoriteCountSlice.reducer;
