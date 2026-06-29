import { GetEmailTemplateByIdResponse, GetEmailTemplatesResponse, UpdateEmailTemplateResponse } from "@/src/types/emailTemplate";
import { baseApi } from "./baseApi";

export const emailTemplateApi = baseApi.enhanceEndpoints({ addTagTypes: ["EmailTemplate"] }).injectEndpoints({
  endpoints: (builder) => ({
    listEmailTemplates: builder.query<GetEmailTemplatesResponse, { search?: string; page?: number; limit?: number; sort_by?: string; sort_order?: "ASC" | "DESC" }>({
      query: (params) => ({
        url: "/email_templates",
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: "EmailTemplate" as const, id: _id })),
              { type: "EmailTemplate", id: "LIST" },
            ]
          : [{ type: "EmailTemplate", id: "LIST" }],
    }),
    getEmailTemplateById: builder.query<GetEmailTemplateByIdResponse, string>({
      query: (id) => `/email_templates/${id}`,
      providesTags: (result, error, id) => [{ type: "EmailTemplate", id }],
    }),
    updateEmailTemplate: builder.mutation<UpdateEmailTemplateResponse, { id: string; data: { subject: string; content: string } }>({
      query: ({ id, data }) => ({
        url: `/email_templates/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "EmailTemplate", id },
        { type: "EmailTemplate", id: "LIST" },
      ],
    }),
  }),
});

export const { useListEmailTemplatesQuery, useGetEmailTemplateByIdQuery, useUpdateEmailTemplateMutation } = emailTemplateApi;
