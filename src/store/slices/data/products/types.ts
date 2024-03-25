import {
  IFilterProduct,
  IMostPurchaseProducts,
  IProduct,
} from '@/models/models';

export interface IProductsSliceState {
  dataProducts: IProduct[];
  dataMostPurchase: IMostPurchaseProducts[];
  dataFiltersProducts: IFilterProduct[];
  status?: string;
}
