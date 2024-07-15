import axios from 'axios';
import { ICartProduct } from '@store/data/cart/types';

export const fetchProducts = async (
  cartItems: { productId: string; productQuantity: number }[],
) => {
  if (cartItems.length === 0) return [];

  const productIds = cartItems.map(item => item.productId).join('&ids=');

  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/products/by-ids?ids=${productIds}`,
  );

  const products: ICartProduct[] = response.data._embedded.products;

  return cartItems.map(ci => {
    const product = products.find(p => p.id === ci.productId);

    if (!product) {
      throw new Error(`Product with ID ${ci.productId} not found`);
    }

    return {
      id: ci.productId,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        imageUrl: product.imageUrl,
        links: product.links,
      },
      quantity: ci.productQuantity,
    };
  });
};
