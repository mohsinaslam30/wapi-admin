"use client";

import PageForm from "@/src/components/pages/components/PageForm";
import { useGetPageByIdQuery, useUpdatePageMutation } from "@/src/redux/api/pageApi";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/src/constants";

const EditPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading: isFetching } = useGetPageByIdQuery(id as string);
  const [updatePage, { isLoading: isUpdating }] = useUpdatePageMutation();

  const handleSubmit = async (formData: FormData) => {
    try {
      // Extract color_config from formData and store in localStorage before submitting
      const colorConfig = formData.get('color_config') as string;
      const slug = formData.get('slug') as string;
      
      if (colorConfig && slug && typeof window !== 'undefined') {
        localStorage.setItem(`page_color_config_${slug}`, colorConfig);
      }
      
      await updatePage({ id: id as string, data: formData }).unwrap();
      toast.success(t("pages_success_updated", "Page updated successfully"));
      router.push(ROUTES.ManagePages);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || t("pages_error_update", "Failed to update page"));
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="w-10 h-10 border-4 border-(--text-green-primary)/30 border-t-(--text-green-primary) rounded-full animate-spin" />
      </div>
    );
  }

  return <PageForm initialData={data?.data} onSubmit={handleSubmit} isLoading={isUpdating} isEdit />;
};

export default EditPage;
