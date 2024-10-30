import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import authSlice from '@store/slices/auth/authSlice';
import cartSlice from '@store/slices/cart/cartSlice';
import catalogSlice from '@store/slices/catalog/catalogSlice';
import favoriteCountSlice from '@store/slices/favoriteCount/favoriteCountSlice';
import filtersSlice from '@store/slices/data/filters/filtersSlice';
import paymentSlice from '@store/slices/payment/paymentSlice';
import productIdSlice from '@store/slices/productId/productIdSlice';
import productsSlice from '@store/slices/data/products/productsSlice';
import reviewsSlice from '@store/slices/data/reviews/reviewsSlice';
import userSlice from '@store/slices/user/userSlice';

export const store = configureStore({
  reducer: {
    payment: paymentSlice,
    user: userSlice,
    catalog: catalogSlice,
    products: productsSlice,
    productId: productIdSlice,
    filters: filtersSlice,
    reviews: reviewsSlice,
    auth: authSlice,
    cart: cartSlice,
    favorites: favoriteCountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
