export interface CatalogState {
  min: number;
  max: number;
  priceRange: number[];
  selectedList: string[];
  sortBy: string;
  inStock: string;
  inSale: string;
}

export interface Selected {
  key: string;
  value: string;
  type: string;
}
