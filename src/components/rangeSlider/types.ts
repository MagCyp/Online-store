export interface Props {
  min: number;
  max: number;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}
