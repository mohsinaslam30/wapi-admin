import { baseApi } from "./baseApi";
import { Guide, GuideCategory, CreateGuideRequest, UpdateGuideRequest, ReorderRequest, DeleteGuideRequest, GuideApiResponse, AllGuidesData } from "../../types/guide";

export const guideApi = baseApi.enhanceEndpoints({ addTagTypes: ["Guide", "GuideCategory"] }).injectEndpoints({
  endpoints: (builder) => ({
    getGuides: builder.query<GuideApiResponse<AllGuidesData>, { search?: string; page?: number; limit?: number }>({
      query: (params) => ({
        url: "/guide",
        params,
      }),
      providesTags: ["Guide"],
    }),
    getGuideById: builder.query<GuideApiResponse<Guide>, string>({
      query: (id) => `/guide/${id}`,
      providesTags: (result, error, id) => [{ type: "Guide", id }],
    }),
    getCategories: builder.query<GuideApiResponse<GuideCategory[]>, void>({
      query: () => "/guide/categories",
      providesTags: ["GuideCategory"],
    }),
    createGuide: builder.mutation<GuideApiResponse<Guide>, CreateGuideRequest>({
      query: (body) => ({
        url: "/guide",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Guide", "GuideCategory"],
    }),
    updateGuide: builder.mutation<GuideApiResponse<Guide>, UpdateGuideRequest>({
      query: ({ id, ...body }) => ({
        url: `/guide/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => ["Guide", { type: "Guide", id }, "GuideCategory"],
    }),
    reorderGuides: builder.mutation<GuideApiResponse<void>, ReorderRequest>({
      query: (body) => ({
        url: "/guide/reorder",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Guide", "GuideCategory"],
    }),
    deleteGuide: builder.mutation<GuideApiResponse<void>, DeleteGuideRequest>({
      query: (body) => ({
        url: "/guide/delete",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Guide", "GuideCategory"],
    }),
    uploadImage: builder.mutation<GuideApiResponse<{ url: string }>, FormData>({
      query: (body) => ({
        url: "/guide/upload",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetGuidesQuery, useGetGuideByIdQuery, useGetCategoriesQuery, useCreateGuideMutation, useUpdateGuideMutation, useReorderGuidesMutation, useDeleteGuideMutation, useUploadImageMutation } = guideApi;
