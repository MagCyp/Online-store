export interface IProductIdSliceState {
  data: IRoot;
  loading: boolean;
  error: string | null | undefined;
}

export interface IRoot {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  characteristics: ICharacteristics;
  priceWithSale: number; // willChange
  brand: string;
  reviews: IReview[];
  category: string;
  averageRate: number;
  _links: ILinks;
}

export interface ICharacteristics {
  Type: string;
  'Noise Cancelling': string;
  'Connection type': string;
}

export interface IReview {
  id: string;
  rate: number;
  comment: string;
  localUser: ILocalUser;
}

export interface ILocalUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  userPhoto: string;
}

export interface ILinks {
  self: ISelf;
  products: IProducts;
}

export interface ISelf {
  href: string;
}

export interface IProducts {
  href: string;
}
