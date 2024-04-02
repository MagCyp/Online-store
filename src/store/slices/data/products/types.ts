import { IMostPurchaseProducts, IProduct } from '@/models/models';

export interface IProductsSliceState {
  dataProducts: IProduct[];
  dataMostPurchase: IMostPurchaseProducts[];
  status?: string;
  productsInfo?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
