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

export interface CartState {
  items: ICartItem[];
  status: 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
