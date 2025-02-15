import { travelYatriApi } from ".";
import { IBookingResponse } from "../../contracts/IBookingResponse";
import { ICreateBookingRequest } from "../../contracts/ICreateBookingRequest";
import { IEvaluateBookingRequest } from "../../contracts/IEvaluateBookingRequest";
import { IEvaluateBookingResponse } from "../../contracts/IEvaluateBookingResponse";
import { IGetBookingQuery } from "../../contracts/IGetBookingQuery";
import { IGetBookingResponse } from "../../contracts/IGetBookingResponse";
import { ITripBookingRequest } from "../../contracts/ITripBookingRequest";
import { ITripBookingResponse } from "../../contracts/ITripBookingResponse";
import { GET_BOOKING } from "../travelYatriApiTags";

export const booking = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<IBookingResponse, ICreateBookingRequest>({
      invalidatesTags: [GET_BOOKING],
      query: (body) => {
        return {
          url: "booking",
          method: "POST",
          body,
        };
      },
    }),
    evaluateBooking: builder.mutation<
      IEvaluateBookingResponse,
      IEvaluateBookingRequest
    >({
      invalidatesTags: [GET_BOOKING],
      query: (body) => {
        return {
          url: "booking/evaluate",
          method: "POST",
          body,
        };
      },
    }),
    getBooking: builder.query<IGetBookingResponse, IGetBookingQuery>({
      providesTags: [GET_BOOKING],
      query: (query) => {
        return {
          url: `booking?date=${JSON.stringify(query?.dateRange)}&search=${
            query.search
          }`,
          method: "GET",
        };
      },
    }),
    markTripAsStrated: builder.mutation<
      ITripBookingResponse,
      ITripBookingRequest
    >({
      invalidatesTags: [GET_BOOKING],
      query: (body) => {
        return {
          url: `booking/start/${body.bookingId}`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useEvaluateBookingMutation,
  useGetBookingQuery,
  useMarkTripAsStratedMutation
} = booking;
