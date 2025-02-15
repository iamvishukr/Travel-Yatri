import { travelYatriApi } from ".";
import { IAdminUserQuery } from "../../contracts/IAdminUserQuery";
import { IAdminUserResponse } from "../../contracts/IAdminUserResponse";
import { IVerifyOrganizerRequest } from "../../contracts/IVerifyOrganizerRequest";
import { IVerifyOrganizerResponse } from "../../contracts/IVerifyOrganizerResponse";
import { GET_USER } from "../travelYatriApiTags";

export const adminApi = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IAdminUserResponse, IAdminUserQuery>({
      providesTags: [GET_USER],
      query: (args) => {
        return {
          url: `user?role=${args?.role}`,
          method: "GET",
        };
      },
    }),
    deleteUser: builder.mutation({
      invalidatesTags: [GET_USER],

      query: (args) => {
        return {
          url: `user/${args}`,
          method: "DELETE",
        };
      },
    }),
    verifyOrganizer: builder.mutation<
      IVerifyOrganizerResponse,
      IVerifyOrganizerRequest
    >({
      invalidatesTags: [GET_USER],
      query: (body) => {
        return {
          url: `user/org-verify/${body?.id}`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useVerifyOrganizerMutation,
  useDeleteUserMutation,
} = adminApi;
