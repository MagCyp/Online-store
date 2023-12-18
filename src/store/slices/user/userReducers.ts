import { PayloadAction } from '@reduxjs/toolkit';

import { UserState } from '@store/slices/user/types';

export const setUser = (
  state: UserState,
  action: PayloadAction<{ token: string }>,
) => {
  localStorage.setItem('user', JSON.stringify({ token: action.payload.token }));
  state.token = action.payload.token;
};

export const setFavorites = (
  state: UserState,
  action: PayloadAction<string>,
) => {
  const itemToAdd = action.payload;

  const isAlreadySelected = state.favorites.includes(itemToAdd);

  if (isAlreadySelected) {
    state.favorites = state.favorites.filter(item => item !== itemToAdd);
  } else {
    state.favorites.push(itemToAdd);
  }
};

export const setCart = (state: UserState, action: PayloadAction<string>) => {
  state.cart.push(action.payload);
};
