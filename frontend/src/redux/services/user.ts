import { travelYatriApi } from ".";
import { IMeResponse } from "../../contracts/IMeResponse";
import { IUpdateUserRequest } from "../../contracts/IUpdateUserRequest";
import { IUpdateUserResponse } from "../../contracts/IUpdateUserResponse";
import { UPDATE_ME } from "../travelYatriApiTags";

export const userApi = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IMeResponse, void>({
      providesTags: [UPDATE_ME],
      query: () => {
        return {
          url: "auth/me",
          method: "GET",
        };
      },
    }),
    updateMe: builder.mutation<IUpdateUserResponse, IUpdateUserRequest>({
      invalidatesTags: [UPDATE_ME],
      query: (body) => {
        return {
          url: "auth/me",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetMeQuery, useUpdateMeMutation } = userApi;

export default userApi;
