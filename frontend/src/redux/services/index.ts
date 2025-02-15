// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRAVEL_YATRI_REDUCER_KEY } from "../reduxResourceTags";
import { ILoginWithGoogleResponse } from "../../contracts/ILoginWithGoogleResponse";
import { ILoginWithGoogleRequest } from "../../contracts/ILoginWithGoogleResquest";
import { RootState } from "../store";
import {
  GET_TRIP,
  GET_BOOKING,
  UPDATE_ME,
  REVIEW_TAG,
  GET_USER,
} from "../travelYatriApiTags";
import { IAdminLoginResponse } from "../../contracts/IAdminLoginResponse";
import { IAdminLoginRequest } from "../../contracts/IAdminLoginRequest";

export const travelYatriApi = createApi({
  reducerPath: TRAVEL_YATRI_REDUCER_KEY,
  tagTypes: [UPDATE_ME, GET_TRIP, GET_BOOKING, REVIEW_TAG, GET_USER],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}api/v1/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authenticated;
      if (token) {
        headers.set("authorization", `Bearer ${token.token}`);
        
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginWithGoogle: builder.mutation<
      ILoginWithGoogleResponse,
      ILoginWithGoogleRequest
    >({
      invalidatesTags: [UPDATE_ME],
      query: (body) => {
        return {
          url: "auth/google-login",
          method: "POST",
          body,
        };
      },
    }),
    adminLogin: builder.mutation<IAdminLoginResponse, IAdminLoginRequest>({
      invalidatesTags: [UPDATE_ME],
      query: (body) => {
        return {
          url: "auth/login",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLoginWithGoogleMutation, useAdminLoginMutation } =
  travelYatriApi;
