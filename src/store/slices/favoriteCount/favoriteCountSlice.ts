import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isAuth } from '@/hooks/isAuth/isAuth';

// Інтерфейс для елементів масиву улюблених товарів
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

// Асинхронна дія для отримання улюблених товарів
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
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

      // Повертаємо масив улюблених товарів
      return response.data;
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
    items: [] as Props[], // Масив для зберігання улюблених товарів
    count: 0, // Початковий стан кількості
    status: 'idle', // Стан запиту: idle, loading, succeeded, failed
    error: null as string | null, // Тип має бути string | null
  },
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload); // Додаємо товар до масиву
      state.count = state.items.length; // Оновлюємо кількість
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload); // Видаляємо товар за ID
      state.count = state.items.length; // Оновлюємо кількість
    },
    resetFavorites: state => {
      state.items = []; // Очищуємо масив улюблених товарів
      state.count = 0; // Скидаємо кількість
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, state => {
        state.status = 'loading';
        state.error = null; // Очищуємо помилку при новому запиті
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Оновлюємо масив улюблених товарів
        state.count = action.payload.length; // Оновлюємо кількість
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Присвоюємо помилку
      });
  },
});

// Експортуємо дії та редюсер
export const { addFavorite, removeFavorite, resetFavorites } =
  favoriteCountSlice.actions; // Додано resetFavorites
export default favoriteCountSlice.reducer;
