import { IReviews } from '@/models/models';

export interface IReviewsSliceState {
  reviews: IReviews[];
  status: string;
}
