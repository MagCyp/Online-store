import { IProduct } from '@models/models';

export interface IProductsSliceState {
  dataProducts: IProduct[];
  dataMostPurchase: IProduct[];
  status?: string;
  productsInfo?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
