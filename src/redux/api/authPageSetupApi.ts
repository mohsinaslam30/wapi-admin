import { baseApi } from "./baseApi";
import { GetAuthPageSetupResponse, UpdateAuthPageSetupResponse, AuthPageSetupData } from "../../types/authPageSetup";

export const authPageSetupApi = baseApi.enhanceEndpoints({ addTagTypes: ["AuthPageSetup"] }).injectEndpoints({
  endpoints: (builder) => ({
    getAuthPageSetup: builder.query<GetAuthPageSetupResponse, void>({
      query: () => "/auth_page_setup",
      providesTags: ["AuthPageSetup"],
    }),
    updateAuthPageSetup: builder.mutation<UpdateAuthPageSetupResponse, Partial<AuthPageSetupData>>({
      query: (body) => ({
        url: "/auth_page_setup",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AuthPageSetup"],
    }),
  }),
});

export const { useGetAuthPageSetupQuery, useUpdateAuthPageSetupMutation } = authPageSetupApi;
