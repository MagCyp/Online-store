import { IFilterProduct } from '@/models/models';

export interface IFiltersSliceState {
  filtersStatus?: string;
  dataFilters?: IFilterProduct;
}
