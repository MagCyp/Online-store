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
  createdAt: string;
  priceWithSale: null;
  brand: string;
  rating: number;
  _links: {
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

export interface IReviews {
  id: string;
  productId: string;
  rate: number;
  comment: string;
  userName: string;
  userPhoto: string;
  _links: {
    product: {
      href: string;
    };
  };
}

export interface IProductData {
  _embedded: {
    products?: IProduct[];
    review?: IReviews[];
  };
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface IAuthResponse {
  jwt: null | string;
  success: boolean;
  failureReason: null | string;
}
