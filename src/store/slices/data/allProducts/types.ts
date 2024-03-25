import { IProduct } from '@/models/models';

export interface IProductsSliceState {
  data: IProduct[];
  status: string;
}
