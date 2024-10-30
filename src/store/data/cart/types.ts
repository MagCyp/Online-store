export interface ICartProduct {
  id: string;
  name: string;
  price: number;
  salePrice: number | null;
  imageUrl: string;
  links: [];
}

export interface ICartItem {
  id: string;
  product: ICartProduct;
  quantity: number;
}
