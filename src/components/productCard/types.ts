export interface Props {
  createdAt: string;
  brand: string;
  name: string;
  shortDescription: string;
  price: number;
  priceWithSale: number | null;
  imageUrl: string;
  id: string;
}
