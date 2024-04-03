export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  repeatPassword?: string;
}

export interface CustomError {
  data: string;
  error: string;
}

export interface IProduct {
  id: string;
  name: string;
  shortDescription: string;
  price: number;
  imageUrl: string;
  createdAt?: string;
  priceWithSale?: null;
  inventory?: {
    id: string;
    quantity: number;
  };
  brand: string;
  category?: {
    id: string;
    name: string;
  };
  _links?: {
    self: {
      href: string;
    };
  };
}

export interface IFilterProduct {
  brands: string[];
  price: {
    max_price: number;
    min_price: number;
  };
  characteristics: Record<string, string[]>;
  isPresent: boolean[];
  isSale: boolean[];
}

export interface IMostPurchaseProducts {
  id: string;
  name: string;
  shortDescription: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  characteristics: {
    Buttons: string;
    DPI: string;
    Interface: string;
    Color: string;
  };
  priceWithSale: null;
  inventory: {
    id: string;
    quantity: number;
  };
  isSale: null;
  isPresent: null;
  brand: string;
  reviews: [];
  category: {
    id: string;
    name: string;
  };
}

export interface IProductData {
  _embedded: {
    products: IProduct[] | IMostPurchaseProducts[];
  };
}
