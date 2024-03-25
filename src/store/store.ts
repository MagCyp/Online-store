import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { authApi } from '@store/services/authApi';
import userSlice from '@store/slices/user/userSlice';
import loginSlice from '@store/slices/auth/login/loginSlice';
import registerSlice from '@store/slices/auth/register/registerSlice';
import catalogSlice from '@store/slices/catalog/catalogSlice';
import productsSlice from '@store/slices/data/allProducts/productsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    login: loginSlice,
    register: registerSlice,
    catalog: catalogSlice,
    products: productsSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
