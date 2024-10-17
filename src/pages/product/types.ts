export interface WishListProduct {
  id: string;
  name: string;
  shortDescription: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  brand: string;
  links: string[];
  priceWithSale?: number;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  imageUrl: string;
  images: string[];
  createdAt: string;
  characteristics: {
    'Specs & Details': string;
    Compatibility: string;
    'In the Box': string;
    Warranty: string;
    Interface?: string;
    Type?: string;
    'Connection type'?: string;
    'Noise Cancelling'?: string;
    Layout?: string;
    Size?: string;
    DPI?: string;
    Buttons?: string;
  };
  priceWithSale?: number;
  brand: string;
  reviews: number[];
  features: Feature[];
  category: string;
  averageRate: number;
  inWishlist: boolean;
  colors: string[];
  _links: {
    self: {
      href: string;
    };
    products: {
      href: string;
    };
  };
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}
