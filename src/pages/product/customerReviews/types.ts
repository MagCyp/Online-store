export interface RatingItem {
  rating: number;
  quantity: number;
}

export interface Props {
  ratingData: {
    overallRating: number;
    reviewQuantity: number;
    opinions: RatingItem[];
  };
}
