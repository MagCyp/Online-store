export interface Props {
  createdAt: string;
  brand: string;
  name: string;
  shortDescription: string;
  price: number;
  rating: number;
  priceWithSale: number | null;
  imageUrl: string;
  id: string;
}
