export interface Props {
  topLabel?: string;
  bottomLabel?: string;
  brand: {
    id: string;
    name: string;
  };
  name: string;
  shortDescription: string;
  price: number;
  priceWithSale?: number;
  imageUrl: string;
  id: string;
}
