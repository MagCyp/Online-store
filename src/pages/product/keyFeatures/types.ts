export interface featureContent {
  title: string;
  description: string;
  imageUrl: string;
  id: string;
}

export interface Props {
  features: featureContent[];
}
