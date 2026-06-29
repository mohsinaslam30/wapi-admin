/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetCategoriesQuery, useGetGuidesQuery, useReorderGuidesMutation } from "@/src/redux/api/guideApi";
import CommonHeader from "@/src/shared/CommonHeader";
import { BookOpen, Signpost, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import GuideForm from "./GuideForm";
import GuideList from "./GuideList";

const TenantGuideSetupContainer = () => {
  const { t } = useTranslation();
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: guidesResponse, isLoading: isLoadingGuides, refetch: refetchGuides } = useGetGuidesQuery({ limit: 1000 });
  const { data: categoriesResponse, isLoading: isLoadingCategories, refetch: refetchCategories } = useGetCategoriesQuery();
  const [reorderGuides] = useReorderGuidesMutation();

  const guides = guidesResponse?.data?.guides || [];
  const categories = categoriesResponse?.data || [];

  const handleSelectGuide = (id: string) => {
    setSelectedGuideId(id);
    setIsAddingNew(false);
    setIsMobileMenuOpen(false);
  };

  const handleAddNew = () => {
    setSelectedGuideId(null);
    setIsAddingNew(true);
    setIsMobileMenuOpen(false);
  };

  const handleReorder = async (newGuides: any[], newCategories: any[]) => {
    try {
      const payload: any = {};
      if (newGuides.length > 0) {
        payload.guides = newGuides.map((g, index) => ({ id: g._id, order: index + 1 }));
      }
      if (newCategories.length > 0) {
        payload.categories = newCategories.map((c, index) => ({ slug: c.slug, position: index + 1 }));
      }

      await reorderGuides(payload).unwrap();
      toast.success(t("reorder_success"));
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reorder");
    }
  };

  const handleRefresh = () => {
    refetchGuides();
    refetchCategories();
  };

  return (
    <div className="min-h-full flex flex-col">
      <CommonHeader
        title={t("tenant_guide_setup_title")}
        description={t("tenant_guide_setup_description")}
        onRefresh={handleRefresh}
        isLoading={isLoadingGuides || isLoadingCategories}
      />

      {/* Mobile Guide Menu Button */}
      <div className="xl:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          {t("guide_list_title")}
        </button>
      </div>

      {/* Content Area — relative so drawer is scoped here */}
      <div className="relative flex flex-col xl:flex-row gap-6 flex-1 min-w-0 overflow-hidden">

        {/* Mobile Drawer Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="xl:hidden absolute inset-0 bg-black/40 z-10 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Drawer Panel */}
        <div
          className={`xl:hidden absolute top-0 ltr:start-0 rtl:end-0 h-full w-75 max-w-[97%] z-20 bg-white dark:bg-(--card-color) shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "ltr:-translate-x-full rtl:translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-(--card-border-color) bg-gray-50/50 dark:bg-(--dark-body)/30 shrink-0">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-bold text-gray-900 dark:text-white">{t("guide_list_title")}</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-(--dark-body) transition-colors text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-hidden p-3">
            <GuideList
              guides={guides}
              categories={categories}
              selectedId={selectedGuideId}
              onSelect={handleSelectGuide}
              onAddNew={handleAddNew}
              onReorder={handleReorder}
              isLoading={isLoadingGuides}
              isMobileDrawer
            />
          </div>
        </div>

        {/* Desktop GuideList (hidden on mobile) */}
        <div className="hidden xl:block xl:w-1/3 2xl:w-1/4 min-w-0">
          <GuideList
            guides={guides}
            categories={categories}
            selectedId={selectedGuideId}
            onSelect={handleSelectGuide}
            onAddNew={handleAddNew}
            onReorder={handleReorder}
            isLoading={isLoadingGuides}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {selectedGuideId || isAddingNew ? (
            <GuideForm
              guideId={selectedGuideId}
              categories={categories}
              onSuccess={() => {
                setIsAddingNew(false);
                setSelectedGuideId(null);
              }}
              onCancel={() => {
                setIsAddingNew(false);
                setSelectedGuideId(null);
              }}
            />
          ) : (
            <div className="bg-white dark:bg-(--card-color) rounded-xl border border-gray-100 dark:border-(--card-border-color) shadow-sm p-12 flex flex-col items-center justify-center text-center min-h-[500px]">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Signpost className="w-10 h-10 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t("guide_setup_select_title")}</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">{t("guide_setup_select_desc")}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TenantGuideSetupContainer;
