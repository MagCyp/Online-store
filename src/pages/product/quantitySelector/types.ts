export interface Props {
  min?: number;
  max?: number;
  initialQuantity?: number;
  onQuantityChange: (quantity: number) => void;
}
