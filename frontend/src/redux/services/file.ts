import { travelYatriApi } from ".";
import { IFileRequest } from "../../contracts/IFileRequest";
import { IFileResponse } from "../../contracts/IFileResponse";

export const fileApi = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<IFileResponse, IFileRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append("file", body.file);
        return {
          url: "user/file-upload",
          method: "POST",
          body: formData
        };
      },
    }),
  }),
});

export const { useUploadFileMutation } = fileApi;
