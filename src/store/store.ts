import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import userSlice from '@store/slices/user/userSlice';
import catalogSlice from '@store/slices/catalog/catalogSlice';
import productsSlice from '@store/slices/data/products/productsSlice';
import filtersSlice from '@store/slices/data/filters/filtersSlice';
import reviewsSlice from '@store/slices/data/reviews/reviewsSlice';
import productIdSlice from '@store/slices/productId/productIdSlice';
import authSlice from '@store/slices/auth/authSlice';
import cartSlice from '@store/slices/cart/cartSlice';
import paymentSlice from '@store/slices/payment/paymentSlice';

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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
