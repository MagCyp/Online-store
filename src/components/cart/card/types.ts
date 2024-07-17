export interface Props {
  id: string;
  img: string;
  name: string;
  property: string;
  price: number;
  salePrice?: number | null;
  quantity: number;
}
