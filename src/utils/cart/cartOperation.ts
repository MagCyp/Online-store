export const saveCartToLocalStorage = (
  cartItems: {
    id: string;
    quantity: number;
  }[],
) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

export const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');

  return cart ? JSON.parse(cart) : [];
};
