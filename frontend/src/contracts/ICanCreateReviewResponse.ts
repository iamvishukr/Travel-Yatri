import { IUser } from "./IUser";

export interface ICanCreateReviewResponse {
  data: {
    canCreate: boolean;
    review: IReview;
    stats: IStats;
  };
}

export interface IStats{
    totalReviews: number,
    averageRating: number,
    ratingDistribution: [{
        rating: number,
        count: number
    }]
}   

export interface IReview {
  _id: string;
  user: IUser;
  tripId: string;
  comment: string;
  rating: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}
