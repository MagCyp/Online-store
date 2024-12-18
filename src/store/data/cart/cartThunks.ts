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
  async (items: { id: string; quantity: number }[], { rejectWithValue }) => {
    try {
      const authenticated = await isAuth();
      if (authenticated) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/carts`,
          items,
          {
            headers: {
              Authorization: `${jwt}`,
            },
          },
        );
        return response.data.cartItems;
      } else {
        const cartItems: { id: string; quantity: number }[] =
          getCartFromLocalStorage();

        items.forEach(item => {
          const index = cartItems.findIndex(ci => ci.id === item.id);
          if (index !== -1) {
            cartItems[index].quantity += item.quantity;
          } else {
            cartItems.push(item);
          }
        });
        saveCartToLocalStorage(cartItems);

        return fetchProducts(cartItems);
      }
    } catch (error) {
      console.error('Error adding items to cart:', error);
      return rejectWithValue('Error adding items to cart');
    }
  },
);

export const cartRemove = createAsyncThunk(
  'cart/remove',
  async (items: { id: string; quantity: number }[], { rejectWithValue }) => {
    try {
      const authenticated = await isAuth();
      if (authenticated) {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/carts`,
          {
            data: items,
            headers: {
              Authorization: `${jwt}`,
            },
          },
        );

        return response.data.cartItems;
      } else {
        const cartItems: { id: string; quantity: number }[] =
          getCartFromLocalStorage();

        items.forEach(item => {
          const index = cartItems.findIndex(ci => ci.id === item.id);
          if (index !== -1) {
            cartItems[index].quantity -= item.quantity;
            if (cartItems[index].quantity <= 0) {
              cartItems.splice(index, 1);
            }
          }
        });
        saveCartToLocalStorage(cartItems);

        return fetchProducts(cartItems);
      }
    } catch (error) {
      console.error('Error removing items from cart:', error);
      return rejectWithValue('Error removing items from cart');
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
              Authorization: `${jwt}`,
            },
          },
        );

        return response.data.cartItems;
      } else {
        const cartItems: { id: string; quantity: number }[] =
          getCartFromLocalStorage();

        if (cartItems.length <= 0) {
          throw new Error('cart empty');
        }

        return fetchProducts(cartItems);
      }
    } catch (error) {
      console.error('Error getting items from cart:', error);
      return rejectWithValue('Error getting items from cart');
    }
  },
);
