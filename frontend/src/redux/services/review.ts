import { travelYatriApi } from ".";
import { ICanCreateReviewRequest } from "../../contracts/ICanCreateReviewRequest";
import { ICanCreateReviewResponse } from "../../contracts/ICanCreateReviewResponse";
import { ICreateReviewRequest } from "../../contracts/ICreateReviewRequest";
import { ICreateReviewResponse } from "../../contracts/ICreateReviewResponse";
import { IGetReviewOfTripRequest } from "../../contracts/IGetReviewOfTripRequest";
import { IGetReviewOfTripResponse } from "../../contracts/IGetReviewOfTripResponse";
import { REVIEW_TAG } from "../travelYatriApiTags";

export const review = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<ICreateReviewResponse, ICreateReviewRequest>(
      {
        invalidatesTags: [REVIEW_TAG],
        query: (body) => {
          return {
            url: "review",
            method: "POST",
            body,
          };
        },
      }
    ),
    getReviewOfTrip: builder.query<
      IGetReviewOfTripResponse,
      IGetReviewOfTripRequest
    >({
      providesTags: [REVIEW_TAG],
      query: (query) => {
        return {
          url: `review/${query.tripId}`,
          method: "GET",
        };
      },
    }),
    canCreateReview: builder.query<
      ICanCreateReviewResponse,
      ICanCreateReviewRequest
    >({
      providesTags: [REVIEW_TAG],
      query: (query) => {
        return {
          url: `review/can-create/${query.tripId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useLazyGetReviewOfTripQuery,
  useLazyCanCreateReviewQuery,
} = review;
