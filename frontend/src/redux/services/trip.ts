import { travelYatriApi } from ".";
import { ICommonRequest } from "../../contracts/ICommonRequest";
import { ICommonResponse } from "../../contracts/ICommonResponse";
import {
  ICreateTripRequest,
  IUpdateTripRequest,
} from "../../contracts/ICreateTripRequest";
import { ITripResponse } from "../../contracts/ICreateTripResponse";
import { IGetTripQuery } from "../../contracts/IGetTripQuery";
import { IGetTripResponse } from "../../contracts/IGetTripResponse";
import { GET_TRIP } from "../travelYatriApiTags";

export const trip = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    createTrip: builder.mutation<ITripResponse, ICreateTripRequest>({
      invalidatesTags: [GET_TRIP],
      query: (body) => {
        return {
          url: "trip",
          method: "POST",
          body,
        };
      },
    }),
    getTrip: builder.query<IGetTripResponse[], IGetTripQuery>({
      providesTags: [GET_TRIP],
      query: (query) => {
        return {
          url: `trip?date=${JSON.stringify(query?.dateRange)}&place=${
            query?.place ?? ""
          }&isExpired=${query.isExpired ?? ""}&${
            query.userLong && query.userLat
              ? "userLat="+query.userLat+"&userLong="+query.userLong
              : ""
          }`,
          method: "GET",
        };
      },
    }),

    getLatest10Trip: builder.query<{ data: IGetTripResponse[] }, void>({
      providesTags: [GET_TRIP],
      query: () => {
        return {
          url: `trip/get-latest-10-trips`,
          method: "GET",
        };
      },
    }),

    getTripById: builder.query<IGetTripResponse, ICommonRequest>({
      providesTags: [GET_TRIP],
      query: (query) => {
        return {
          url: `trip/${query?.id}`,
          method: "GET",
        };
      },
    }),
    deleteTrip: builder.mutation<ICommonResponse, ICommonRequest>({
      invalidatesTags: [GET_TRIP],
      query: (args) => {
        return {
          url: `trip/${args?.id}`,
          method: "DELETE",
        };
      },
    }),
    editTrip: builder.mutation<ITripResponse, IUpdateTripRequest>({
      invalidatesTags: [GET_TRIP],
      query: (body) => {
        return {
          url: `trip/${body._id}`,
          method: "POST",
          body,
        };
      },
    }),
    renewTrip: builder.mutation<ITripResponse, IUpdateTripRequest>({
      invalidatesTags: [GET_TRIP],
      query: (body) => {
        return {
          url: `trip/renew/${body._id}`,
          method: "POST",
          body,
        };
      },
    }),
    customizeTrip: builder.mutation({
      query: (body) => {
        return {
          url: `trip/customize`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useCreateTripMutation,
  useGetTripQuery,
  useGetLatest10TripQuery,
  useDeleteTripMutation,
  useGetTripByIdQuery,
  useEditTripMutation,
  useRenewTripMutation,
  useLazyGetTripQuery,
  useCustomizeTripMutation,
} = trip;
