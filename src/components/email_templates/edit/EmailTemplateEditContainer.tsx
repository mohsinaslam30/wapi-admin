/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Skeleton } from "@/src/elements/ui/skeleton";
import { useGetEmailTemplateByIdQuery, useUpdateEmailTemplateMutation } from "@/src/redux/api/emailTemplateApi";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import EmailPreview from "./EmailPreview";
import EmailTemplateForm from "./EmailTemplateForm";

interface EmailTemplateEditContainerProps {
  id: string;
}

const EmailTemplateEditContainer = ({ id }: EmailTemplateEditContainerProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: response, isLoading, refetch } = useGetEmailTemplateByIdQuery(id);
  const [updateTemplate, { isLoading: isSaving }] = useUpdateEmailTemplateMutation();
  const [previewData, setPreviewData] = useState({ subject: "", content: "" });

  const handleSave = async (data: { subject: string; content: string }) => {
    try {
      await updateTemplate({ id, data }).unwrap();
      toast.success(t("email_template_update_success"));
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || t("email_template_update_error"));
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-150 rounded-xl" />
          <Skeleton className="h-150 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!response?.data) return null;

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="w-10 h-10 rounded-lg bg-white dark:bg-(--card-color) border border-gray-200 dark:border-(--card-border-color) hover:bg-gray-50 dark:hover:bg-(--dark-sidebar)">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="sm:text-2xl text-md font-bold text-(--text-green-primary) mb-1">
            {t("email_template_edit_title")} <span className="text-sm sm:text-lg text-gray-400 font-normal">{`(${response?.data?.name})`}</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">{t("email_template_edit_subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col h-full">
          <EmailTemplateForm template={response.data} onSave={handleSave} isSaving={isSaving} onDataChange={setPreviewData} />
        </div>

        <div className="flex flex-col h-full sticky top-24 max-h-[calc(100vh-140px)]">
          <EmailPreview subject={previewData.subject} content={previewData.content} />
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateEditContainer;
