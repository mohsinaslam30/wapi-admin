/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { Switch } from "@/src/elements/ui/switch";
import { useCreateGuideMutation, useDeleteGuideMutation, useGetGuideByIdQuery, useUpdateGuideMutation, useUploadImageMutation } from "@/src/redux/api/guideApi";
import { getResolvedImageUrl } from "@/src/utils/image";
import ConfirmModal from "@/src/shared/ConfirmModal";
import CKEditorComponent from "@/src/shared/CkEditor";
import { GuideCategory } from "@/src/types/guide";
import { AlertCircle, Image as ImageIcon, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Image from "next/image";

interface GuideFormProps {
  guideId: string | null;
  categories: GuideCategory[];
  onSuccess: () => void;
  onCancel: () => void;
}

const GuideForm = ({ guideId, categories, onSuccess, onCancel }: GuideFormProps) => {
  const { t } = useTranslation();
  const isEditMode = !!guideId;

  const { data: guideResponse, isLoading: isLoadingGuide } = useGetGuideByIdQuery(guideId!, { skip: !guideId });
  const [createGuide, { isLoading: isCreating }] = useCreateGuideMutation();
  const [updateGuide, { isLoading: isUpdating }] = useUpdateGuideMutation();
  const [deleteGuide, { isLoading: isDeleting }] = useDeleteGuideMutation();
  const [uploadImage] = useUploadImageMutation();

  const [form, setForm] = useState<any>({
    title: "",
    category: "",
    isNewCategory: false,
    newCategoryName: "",
    sub_title: "",
    description: "",
    status: true,
    sections: [],
  });

  const [uploadingSectionIndex, setUploadingSectionIndex] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (isEditMode && guideResponse?.data) {
      const g = guideResponse.data;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        title: g.title || "",
        category: g.category || "",
        isNewCategory: false,
        newCategoryName: "",
        sub_title: g.sub_title || "",
        description: g.description || "",
        status: g.status ?? true,
        sections: g.sections || [],
      });
    } else if (!isEditMode) {
      setForm({
        title: "",
        category: "",
        isNewCategory: false,
        newCategoryName: "",
        sub_title: "",
        description: "",
        status: true,
        sections: [],
      });
    }
  }, [isEditMode, guideResponse]);

  const handleInputChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAddSection = () => {
    setForm((prev: any) => ({
      ...prev,
      sections: [...prev.sections, { title: "", content: "", images: [] }],
    }));
  };

  const handleRemoveSection = (index: number) => {
    setForm((prev: any) => ({
      ...prev,
      sections: prev.sections.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSectionChange = (index: number, field: string, value: any) => {
    setForm((prev: any) => {
      const newSections = [...prev.sections];
      newSections[index] = { ...newSections[index], [field]: value };
      return { ...prev, sections: newSections };
    });
  };

  const handleImageUpload = async (sectionIndex: number, file: File) => {
    try {
      setUploadingSectionIndex(sectionIndex);
      const formData = new FormData();
      formData.append("image", file);

      const response = await uploadImage(formData).unwrap();

      if (response.success && response.data?.url) {
        const resolvedUrl = getResolvedImageUrl(response.data.url);
        setForm((prev: any) => {
          const newSections = [...prev.sections];
          const newImages = [...(newSections[sectionIndex].images || []), { url: resolvedUrl, caption: "" }];
          newSections[sectionIndex] = { ...newSections[sectionIndex], images: newImages };
          return { ...prev, sections: newSections };
        });
        toast.success(t("image_upload_success"));
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Image upload failed");
    } finally {
      setUploadingSectionIndex(null);
    }
  };

  const handleRemoveImage = (sectionIndex: number, imageIndex: number) => {
    setForm((prev: any) => {
      const newSections = [...prev.sections];
      const newImages = newSections[sectionIndex].images.filter((_: any, i: number) => i !== imageIndex);
      newSections[sectionIndex] = { ...newSections[sectionIndex], images: newImages };
      return { ...prev, sections: newSections };
    });
  };

  const handleSubmit = async () => {
    try {
      const { isNewCategory, newCategoryName, ...rest } = form;
      const payload = {
        ...rest,
        category: isNewCategory ? newCategoryName : form.category,
      };

      if (isEditMode) {
        await updateGuide({ id: guideId!, ...payload }).unwrap();
        toast.success(t("guide_update_success"));
      } else {
        await createGuide(payload).unwrap();
        toast.success(t("guide_create_success"));
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save guide");
    }
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteGuide({ id: guideId! }).unwrap();
      toast.success(t("guide_delete_success"));
      onSuccess();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete guide");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  if (isEditMode && isLoadingGuide) {
    return (
      <div className="bg-white dark:bg-(--card-color) rounded-xl border border-gray-100 dark:border-(--card-border-color) shadow-sm p-12 flex items-center justify-center min-h-150">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-(--card-color) rounded-xl border border-gray-100 dark:border-(--card-border-color) shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-(--card-border-color) flex flex-wrap items-start gap-3 justify-between bg-gray-50/50 dark:bg-(--dark-body)/30">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{isEditMode ? t("edit_guide") : t("add_new_guide")}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t("guide_form_subtitle")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isEditMode && (
            <Button variant="outline" className="gap-2 text-red-600 border-red-100 dark:border-red-900/20 dark:hover:border-red-900/20 dark:hover:bg-red-900/20 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{t("delete_guide")}</span>
            </Button>
          )}
          <Button variant="outline" className="dark:bg-(--page-body-bg)!" onClick={onCancel}>
            <span className="hidden sm:inline">{t("common_cancel")}</span>
            <X className="sm:hidden w-4 h-4" />
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" onClick={handleSubmit} disabled={isCreating || isUpdating}>
            {isCreating || isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span className="hidden sm:inline">{t("save_guide")}</span>
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="sm:p-6 p-4 space-y-8 max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Basic Info */}
          <div className="space-y-6">
            <div className="space-y-2 flex flex-col">
              <Label className="text-sm font-bold">
                {t("guide_title")} <span className="text-red-500">*</span>
              </Label>
              <Input placeholder={t("guide_title_placeholder")} value={form.title} onChange={(e) => handleInputChange("title", e.target.value)} className="h-11 dark:bg-page-body" />
            </div>

            <div className="space-y-2 flex flex-col">
              <Label className="text-sm font-bold">
                {t("guide_category")} <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-col gap-3">
                {!form.isNewCategory ? (
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Select value={form.category} onValueChange={(val) => handleInputChange("category", val)}>
                        <SelectTrigger className="h-11 dark:bg-page-body">
                          <SelectValue placeholder={t("select_category")} />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-(--card-color)">
                          {categories.map((cat) => (
                            <SelectItem className="dark:hover:bg-(--table-hover)" key={cat.slug} value={cat.name}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" className="h-11 dark:bg-(--page-body-bg)! gap-2" onClick={() => handleInputChange("isNewCategory", true)}>
                      <Plus className="w-4 h-4" />
                      {t("new")}
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input placeholder={t("enter_new_category")} value={form.newCategoryName} onChange={(e) => handleInputChange("newCategoryName", e.target.value)} className="h-11 dark:bg-page-body flex-1" />
                    <Button variant="ghost" className="h-11 px-3 dark:hover:bg-red-900/20" onClick={() => handleInputChange("isNewCategory", false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Details & Description */}
          <div className="space-y-6">
            <div className="space-y-2 flex flex-col">
              <Label className="text-sm font-bold">{t("guide_sub_title")}</Label>
              <Input placeholder={t("guide_sub_title_placeholder")} value={form.sub_title} onChange={(e) => handleInputChange("sub_title", e.target.value)} className="h-11 dark:bg-page-body" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-(--dark-body)/50 rounded-xl border border-gray-100 dark:border-(--card-border-color)">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold">{t("guide_status")}</Label>
                <p className="text-xs text-gray-500">{t("guide_status_desc")}</p>
              </div>
              <Switch checked={form.status} onCheckedChange={(val) => handleInputChange("status", val)} className="data-[state=checked]:bg-primary" />
            </div>
          </div>
        </div>
        <div className="space-y-2 flex flex-col">
          <Label className="text-sm font-bold">{t("guide_main_description")}</Label>
          <div className="border border-gray-200 dark:border-(--card-border-color) rounded-xl overflow-hidden shadow-sm">
            <CKEditorComponent value={form.description} onChange={(val) => handleInputChange("description", val)} minHeight="200px" />
          </div>
        </div>

        {/* Sections Area */}
        <div className="pt-8 border-t border-gray-100 dark:border-(--card-border-color)">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">{t("guide_sections")}</h4>
              <p className="text-sm text-gray-500">{t("guide_sections_desc")}</p>
            </div>
          </div>

          <div className="space-y-8">
            {form.sections.map((section: any, idx: number) => (
              <div key={idx} className="relative sm:p-6 p-4 bg-white dark:bg-(--dark-body)/20 rounded-lg border border-gray-100 dark:border-(--card-border-color) shadow-sm group">
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 text-gray-400 dark:hover:bg-red-900/20 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100" onClick={() => handleRemoveSection(idx)}>
                  <Trash2 className="w-4 h-4" />
                </Button>

                <div className="space-y-6">
                  <div className="space-y-2 flex flex-col">
                    <Label className="text-sm font-bold">
                      {t("section_title")} {idx + 1}
                    </Label>
                    <Input placeholder={t("section_title_placeholder")} value={section.title} onChange={(e) => handleSectionChange(idx, "title", e.target.value)} className="h-10 dark:bg-page-body" />
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <Label className="text-sm font-bold">{t("section_content")}</Label>
                    <div className="border border-gray-200 dark:border-(--card-border-color)! rounded-lg overflow-hidden bg-white">
                      <CKEditorComponent value={section.content} onChange={(val) => handleSectionChange(idx, "content", val)} minHeight="150px" />
                    </div>
                  </div>

                  <div className="space-y-3 flex flex-col">
                    <Label className="text-sm font-bold">{t("section_images")}</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {section.images?.map((img: any, imgIdx: number) => (
                        <div key={imgIdx} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-(--card-border-color) shadow-sm group/img">
                          <Image src={getResolvedImageUrl(img.url)} alt="Section" className="w-full h-full object-cover" width={100} height={100} unoptimized />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleRemoveImage(idx, imgIdx)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Label className={`flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-gray-200 dark:border-(--card-border-color) hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer ${uploadingSectionIndex === idx ? "opacity-50 pointer-events-none" : ""}`}>
                        {uploadingSectionIndex === idx ? (
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        ) : (
                          <>
                            <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("upload")}</span>
                          </>
                        )}
                        <Input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(idx, e.target.files[0])} disabled={uploadingSectionIndex !== null} />
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {form.sections.length === 0 && (
              <div className="py-12 border-2 border-dashed border-gray-100 dark:border-(--card-border-color) rounded-xl flex flex-col items-center justify-center text-gray-400">
                <AlertCircle className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">{t("no_sections_yet")}</p>
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="outline" className="gap-2 dark:bg-(--page-body-bg)! border-primary text-primary hover:bg-primary/5 transition-all" onClick={handleAddSection}>
                <Plus className="w-4 h-4" />
                {t("add_section")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={handleConfirmDelete} isLoading={isDeleting} title={t("guide_delete_confirm_title") || "Delete Guide"} subtitle={t("guide_delete_confirm_subtitle") || "Are you sure you want to delete this guide? This action cannot be undone."} confirmText={t("common_delete")} cancelText={t("common_cancel")} variant="danger" />
    </div>
  );
};

export default GuideForm;
