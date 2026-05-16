import { baseApi } from "./baseApi";

export interface Template {
  _id: string;
  template_name: string;
  category: string;
  status: string;
  language: string;
  message_body: string;
  body_variables: { key: string; example: string }[];
  template_type: string;
  waba_id: string;
}

export interface GetTemplatesParams {
  waba_id?: string;
  category?: string;
  status?: string;
  search?: string;
}

export interface GetTemplatesResponse {
  success: boolean;
  count: number;
  data: Template[];
}

export const templateApi = baseApi.enhanceEndpoints({ addTagTypes: ["Template"] }).injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query<GetTemplatesResponse, GetTemplatesParams>({
      query: (params) => {
        const q = new URLSearchParams();
        if (params.waba_id) q.append("waba_id", params.waba_id);
        if (params.category) q.append("category", params.category);
        if (params.status) q.append("status", params.status);
        if (params.search) q.append("search", params.search);
        return `/template?${q.toString()}`;
      },
      providesTags: ["Template"],
    }),
  }),
});

export const { useGetTemplatesQuery } = templateApi;
