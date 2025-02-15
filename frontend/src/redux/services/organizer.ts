import { travelYatriApi } from ".";
import { IOrganizerDetailFormRequest } from "../../contracts/IOrganizerDetailFormRequest";
import { IOrganizerDetailFormResponse } from "../../contracts/IOrganizerDetailFormResponse";
import { UPDATE_ME } from "../travelYatriApiTags";

export const organizerApi = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    organizerForm: builder.mutation<
      IOrganizerDetailFormResponse,
      IOrganizerDetailFormRequest
    >({
      invalidatesTags: [UPDATE_ME],
      query: (body) => {
        return {
          url: "user/org-verify-submit",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useOrganizerFormMutation } = organizerApi;
