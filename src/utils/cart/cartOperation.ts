export const saveCartToLocalStorage = (
  cartItems: {
    productId: string;
    productQuantity: number;
  }[],
) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

export const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');

  return cart ? JSON.parse(cart) : [];
};
