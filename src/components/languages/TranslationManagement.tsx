/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { Skeleton } from "@/src/elements/ui/skeleton";
import { useGetLanguageByIdQuery, useGetTranslationsQuery, useUpdateTranslationsMutation } from "@/src/redux/api/languageApi";
import { ArrowLeft, Check, LayoutGrid, List, RotateCcw, Save, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Can from "../shared/Can";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/src/redux/hooks";

interface TranslationManagementProps {
  id: string;
}

const TranslationManagement = ({ id }: TranslationManagementProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const setting = useAppSelector((state) => state.settings.data);
  const { data: languageData } = useGetLanguageByIdQuery(id);
  const locale = languageData?.data?.locale;
  const { data: translationsData, isLoading } = useGetTranslationsQuery(locale || "", { skip: !locale });
  const [updateTranslations, { isLoading: isUpdating }] = useUpdateTranslationsMutation();

  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [activeComponent, setActiveComponent] = useState<"front" | "admin" | "app">("front");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  useEffect(() => {
    if (translationsData?.data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTranslations(translationsData.data);
    }
  }, [translationsData]);

  const matchesSearch = (val: any, query: string): boolean => {
    if (typeof val === "string") {
      return val.toLowerCase().includes(query.toLowerCase());
    }
    if (typeof val === "object" && val !== null) {
      return Object.entries(val).some(([k, v]) => k.toLowerCase().includes(query.toLowerCase()) || matchesSearch(v, query));
    }
    return false;
  };

  const currentTranslations = useMemo(() => {
    if (!translations) return {};
    return translations[activeComponent] || {};
  }, [translations, activeComponent]);

  const filteredKeys = useMemo(() => {
    return Object.keys(currentTranslations).filter((key) => {
      const lowerQuery = searchQuery.toLowerCase();
      if (key.toLowerCase().includes(lowerQuery)) return true;
      return matchesSearch(currentTranslations[key], searchQuery);
    });
  }, [currentTranslations, searchQuery]);

  const handleValueChange = (key: string, value: string, subKey?: string) => {
    setTranslations((prev) => {
      const newTranslations = { ...prev };
      const compData = { ...newTranslations[activeComponent] };
      if (subKey) {
        compData[key] = { ...compData[key], [subKey]: value };
      } else {
        compData[key] = value;
      }
      newTranslations[activeComponent] = compData;
      return newTranslations;
    });
  };

  const getTranslationDiff = (original: any, current: any) => {
    const diff: any = {};

    for (const component in current) {
      const compDiff: any = {};
      const originalComp = original?.[component] || {};
      const currentComp = current[component];

      for (const key in currentComp) {
        const originalVal = originalComp[key];
        const currentVal = currentComp[key];

        if (typeof currentVal === "object" && currentVal !== null) {
          const subDiff: any = {};
          const originalSub = originalVal || {};

          for (const subKey in currentVal) {
            if (currentVal[subKey] !== originalSub[subKey]) {
              subDiff[subKey] = currentVal[subKey];
            }
          }

          if (Object.keys(subDiff).length > 0) {
            compDiff[key] = subDiff;
          }
        } else {
          if (currentVal !== originalVal) {
            compDiff[key] = currentVal;
          }
        }
      }

      if (Object.keys(compDiff).length > 0) {
        diff[component] = compDiff;
      }
    }

    return diff;
  };

  const handleSave = async () => {
    if (!locale) return;

    const diff = getTranslationDiff(translationsData?.data || {}, translations);

    if (Object.keys(diff).length === 0) {
      toast.info("No changes to save.");
      return;
    }

    console.log("Translation Diff Payload:", diff);

    try {
      await updateTranslations({
        locale: locale as string,
        data: { translations: diff },
      }).unwrap();
      toast.success("Translations updated successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update translations.");
    }
  };

  const handleReset = () => {
    if (translationsData?.data) {
      setTranslations(translationsData.data);
      toast.info("Changes reset to last saved state.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 pt-10">
        <Skeleton className="h-14 w-full sm:w-2/3 md:w-1/3 rounded-xl" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div>
        {/* Header */}
        <div className="sticky top-[65px] lg:top-[85px] z-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-light-body-bg/95 dark:bg-(--dark-body)/95 backdrop-blur-md border-b border-gray-200/50 dark:border-white/5 py-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-3 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="w-10 h-10 shrink-0 rounded-lg bg-white dark:bg-(--card-color) shadow-sm border border-slate-200 dark:border-(--card-border-color) hover:bg-slate-50 dark:hover:bg-(--dark-sidebar)"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-(--text-green-primary) flex items-center gap-2 truncate">
                <span className="truncate">Manage Translations</span>
                <span className="text-gray-400 font-normal shrink-0">({languageData?.data?.name || "..."})</span>
              </h1>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed truncate">Edit localization keys and values for this language.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:shrink-0">
            <Can permission="update.languages">
              <Button variant="outline" onClick={handleReset} className="flex-1 sm:flex-none rounded-lg border-(--input-border-color) h-11 px-4 dark:bg-page-body! dark:border-none" disabled={isUpdating}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </Can>
            <Can permission="update.languages">
              <Button onClick={handleSave} className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg h-11 px-4 dark:shadow-none min-w-[120px]" disabled={isUpdating}>
                {isUpdating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </div>
                )}
              </Button>
            </Can>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-(--card-color) rounded-xl p-4 border border-gray-200 dark:border-(--card-border-color) mb-6 flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center shadow-sm">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-none md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search keys or values..." className="pl-10 h-11 bg-gray-50 dark:bg-page-body border-none rounded-lg focus-visible:ring-emerald-500 w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>

            <Select value={activeComponent} onValueChange={(val: any) => setActiveComponent(val)}>
              <SelectTrigger className="h-11 w-full md:w-48 bg-gray-50 dark:bg-page-body border-none rounded-lg shadow-none focus:ring-emerald-500">
                <SelectValue placeholder="Select Component" />
              </SelectTrigger>
              <SelectContent className="dark:bg-(--card-color)">
                <SelectItem value="front">{setting?.app_name || t("common_app_name")} Front</SelectItem>
                <SelectItem value="admin">{setting?.app_name || t("common_app_name")} Admin</SelectItem>
                <SelectItem value="app">{setting?.app_name || t("common_app_name")} App</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-3">
            <div className="flex items-center bg-gray-100 dark:bg-(--dark-body) rounded-lg p-1">
              <Button onClick={() => setViewMode("list")} className={`p-1.5 h-9 w-10 rounded-md transition-all ${viewMode === "list" ? "bg-white hover:bg-white dark:bg-(--card-color) dark:hover:bg-(--card-color) text-primary shadow-sm" : "text-gray-500 bg-[unset]! shadow-[unset]!"}`}>
                <List size={18} />
              </Button>
              <Button onClick={() => setViewMode("grid")} className={`p-1.5 h-9 w-10 rounded-md transition-all ${viewMode === "grid" ? "bg-white hover:bg-white dark:bg-(--card-color) dark:hover:bg-(--card-color) text-primary shadow-sm" : "text-gray-500 bg-[unset]! shadow-[unset]!"}`}>
                <LayoutGrid size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Translation List */}
        {filteredKeys.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start" : "space-y-4 md:space-y-6"}>
            {filteredKeys.map((key) => {
              const value = currentTranslations[key];
              const isObject = typeof value === "object" && value !== null;
              const isCatMatch = searchQuery && key.toLowerCase().includes(searchQuery.toLowerCase());

              return (
                <div key={key} className={`bg-white dark:bg-(--card-color) p-4 md:p-6 rounded-xl border transition-all shadow-sm group ${isCatMatch ? "border-emerald-500 ring-2 ring-emerald-500/10" : "border-gray-100 dark:border-(--card-border-color) hover:border-emerald-200 dark:hover:border-primary/10"}`}>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                      <Label className={`text-sm md:text-md font-medium break-all pr-4 ${isCatMatch ? "text-emerald-600" : "text-gray-400 dark:text-gray-500"}`}>{key}</Label>
                      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                        <Check className="w-4 h-4 text-emerald-500" />
                      </div>
                    </div>

                    {isObject ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-1">
                        {Object.entries(value).map(([subKey, subValue]: [string, any]) => {
                          const isSubKeyMatch = searchQuery && subKey.toLowerCase().includes(searchQuery.toLowerCase());
                          const isSubValueMatch = searchQuery && typeof subValue === "string" && subValue.toLowerCase().includes(searchQuery.toLowerCase());
                          const isMatch = isSubKeyMatch || isSubValueMatch;

                          return (
                            <div key={subKey} className="space-y-1.5">
                              <Label className={`text-[11px] font-semibold uppercase tracking-wider ml-1 mb-1 transition-colors block truncate ${isSubKeyMatch ? "text-emerald-600 font-bold" : "text-gray-500"}`}>{subKey}</Label>
                              <Input
                                value={subValue as string}
                                onChange={(e) => handleValueChange(key, e.target.value, subKey)}
                                className={`bg-(--input-color) border-(--input-border-color) dark:bg-page-body dark:border-none focus:border-emerald-500 focus:ring-emerald-500/10 rounded-lg h-11 transition-all text-sm w-full ${isMatch ? "ring-2 ring-emerald-500/20 border-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10" : ""}`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <Input
                        value={value}
                        onChange={(e) => handleValueChange(key, e.target.value)}
                        className={`bg-(--input-color) border-(--input-border-color) dark:bg-page-body dark:border-none focus:border-emerald-500 focus:ring-emerald-500/10 rounded-lg h-11 transition-all w-full ${searchQuery && value.toLowerCase().includes(searchQuery.toLowerCase()) ? "ring-2 ring-emerald-500/20 border-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10" : ""}`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-(--card-color) rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
            <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-slate-900 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">No keys found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search query.</p>
          </div>
        )}

        {/* Floating Save Button for Mobile */}
        <div className="sm:hidden fixed bottom-6 right-6 z-[60]">
          <Can permission="update.languages">
            <Button onClick={handleSave} className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg flex items-center justify-center p-0" disabled={isUpdating}>
              {isUpdating ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={24} />}
            </Button>
          </Can>
        </div>
      </div>
    </div>
  );
};

export default TranslationManagement;
