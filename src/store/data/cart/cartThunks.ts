import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { isAuth } from '@hooks/isAuth/isAuth';

import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from '@utils/cart/cartOperation';
import { fetchProducts } from '@utils/cart/fetchProducts';

const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

export const cartAdd = createAsyncThunk(
  'cart/add',
  async (
    items: { productId: string; productQuantity: number }[],
    { rejectWithValue },
  ) => {
    try {
      const authenticated = await isAuth();
      if (authenticated) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/carts`,
          items,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );
        return response.data.cartItems;
      } else {
        const cartItems: { productId: string; productQuantity: number }[] =
          getCartFromLocalStorage();

        items.forEach(item => {
          const index = cartItems.findIndex(
            ci => ci.productId === item.productId,
          );
          if (index !== -1) {
            cartItems[index].productQuantity += item.productQuantity;
          } else {
            cartItems.push(item);
          }
        });
        saveCartToLocalStorage(cartItems);

        return fetchProducts(cartItems);
      }
    } catch (error: any) {
      console.error('Error adding items to cart:', error);
      return rejectWithValue(
        error.response?.data || 'Error adding items to cart',
      );
    }
  },
);

export const cartRemove = createAsyncThunk(
  'cart/remove',
  async (
    items: { productId: string; productQuantity: number }[],
    { rejectWithValue },
  ) => {
    try {
      const authenticated = await isAuth();
      if (authenticated) {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/carts`,
          {
            data: items,
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );

        return response.data.cartItems;
      } else {
        const cartItems: { productId: string; productQuantity: number }[] =
          getCartFromLocalStorage();

        items.forEach(item => {
          const index = cartItems.findIndex(
            ci => ci.productId === item.productId,
          );
          if (index !== -1) {
            cartItems[index].productQuantity -= item.productQuantity;
            if (cartItems[index].productQuantity <= 0) {
              cartItems.splice(index, 1);
            }
          }
        });
        saveCartToLocalStorage(cartItems);

        return fetchProducts(cartItems);
      }
    } catch (error: any) {
      console.error('Error removing items from cart:', error);
      return rejectWithValue(
        error.response?.data || 'Error removing items from cart',
      );
    }
  },
);

export const cartGet = createAsyncThunk(
  'cart/get',
  async (_, { rejectWithValue }) => {
    try {
      const authenticated = await isAuth();

      if (authenticated) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/carts`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );

        return response.data.cartItems;
      } else {
        const cartItems: { productId: string; productQuantity: number }[] =
          getCartFromLocalStorage();

        if (cartItems.length <= 0) {
          throw new Error('cart empty');
        }

        return fetchProducts(cartItems);
      }
    } catch (error: any) {
      console.error('Error getting items from cart:', error);
      return rejectWithValue(
        error.response?.data || 'Error getting items from cart',
      );
    }
  },
);
