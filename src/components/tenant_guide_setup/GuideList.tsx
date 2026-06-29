/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { useAppSelector } from "@/src/redux/hooks";
import { Guide, GuideCategory } from "@/src/types/guide";
import { AnimatePresence, LayoutGroup, motion, Reorder } from "framer-motion";
import { ChevronDown, ChevronRight, GripVertical, Plus, Save, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface GuideListProps {
  guides: Guide[];
  categories: GuideCategory[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddNew: () => void;
  onReorder: (newGuides: any[], newCategories: any[]) => void;
  isLoading: boolean;
  isMobileDrawer?: boolean;
}

const GuideList = ({ guides, categories, selectedId, onSelect, onAddNew, onReorder, isLoading, isMobileDrawer = false }: GuideListProps) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [localCategories, setLocalCategories] = useState<any[]>([]);
  const [localGuides, setLocalGuides] = useState<Record<string, Guide[]>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const { sidebarToggle, sidebarHover } = useAppSelector((state) => state.layout);
  const isSidebarCollapsed = sidebarToggle && !sidebarHover;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalCategories([...categories]);

    const grouped: Record<string, Guide[]> = {};
    categories.forEach((cat) => {
      grouped[cat.name] = guides.filter((g) => g.category === cat.name).sort((a, b) => a.order - b.order);
    });
    setLocalGuides(grouped);

    if (Object.keys(expandedCategories).length === 0) {
      const expandAll: Record<string, boolean> = {};
      categories.forEach((cat) => (expandAll[cat.name] = true));
      setExpandedCategories(expandAll);
    }
    setHasChanges(false);
  }, [guides, categories]);

  const handleCategoryReorder = (newOrder: any[]) => {
    setLocalCategories(newOrder);
    setHasChanges(true);
  };

  const handleGuideReorder = (categoryName: string, newOrder: any[]) => {
    setLocalGuides((prev) => ({
      ...prev,
      [categoryName]: newOrder,
    }));
    setHasChanges(true);
  };

  const handleSaveOrder = () => {
    const allSortedGuides: Guide[] = [];
    localCategories.forEach((cat) => {
      const catGuides = localGuides[cat.name] || [];
      allSortedGuides.push(...catGuides);
    });
    onReorder(allSortedGuides, localCategories);
  };

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const filteredCategories = localCategories.filter((cat) => {
    if (!searchTerm) return true;
    const catGuides = localGuides[cat.name] || [];
    return cat.name.toLowerCase().includes(searchTerm.toLowerCase()) || catGuides.some((g) => g.title.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className={`bg-white dark:bg-(--card-color) rounded-xl border border-gray-100 dark:border-(--card-border-color) shadow-sm flex flex-col ${isMobileDrawer ? "h-full border-none shadow-none rounded-none" : "max-h-72 xl:max-h-none xl:h-175"}`}>
      <div className="p-5 border-b border-gray-100 dark:border-(--card-border-color)">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t("guide_list_title")}</h3>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Button variant="default" size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-white animate-in fade-in slide-in-from-right-2 duration-300" onClick={handleSaveOrder}>
                <Save className="w-4 h-4" />
                {t("save_changes")}
              </Button>
            )}
            <Button size="sm" onClick={onAddNew} className="h-8 w-8 p-0 rounded-full shrink-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input type="text" placeholder={t("search_guides")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-(--input-color) dark:bg-(--dark-body) border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <LayoutGroup id={`guide-setup-layout-${isSidebarCollapsed}`}>
            <Reorder.Group axis="y" values={localCategories} onReorder={handleCategoryReorder} className="space-y-2">
              {filteredCategories.map((cat) => (
                <Reorder.Item key={cat.slug} value={cat} className="group bg-white dark:bg-(--card-color) rounded-lg border border-transparent min-h-fit" layout transition={{ duration: 0.2 }}>
                  <motion.div layout className="flex flex-col">
                    {/* Category Header */}
                    <motion.div layout className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-(--dark-body) cursor-pointer group/header">
                      <div className="p-1 shrink-0">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                      </div>
                      <button onClick={() => toggleCategory(cat.name)} className="flex-1 flex items-center gap-2 text-left min-w-0">
                        {expandedCategories[cat.name] ? <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" />}
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 truncate whitespace-nowrap">{cat.name}</span>
                      </button>
                    </motion.div>

                    {/* Guides in Category */}
                    <AnimatePresence initial={false}>
                      {expandedCategories[cat.name] && (
                        <motion.div layout initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="ml-8 mt-1 border-l-2 border-gray-100 dark:border-(--page-body-bg) pl-2 overflow-hidden">
                          <Reorder.Group axis="y" values={localGuides[cat.name] || []} onReorder={(newOrder) => handleGuideReorder(cat.name, newOrder)} className="space-y-1">
                            {(localGuides[cat.name] || []).map((guide) => (
                              <Reorder.Item
                                key={guide._id}
                                value={guide}
                                onClick={() => onSelect(guide._id)}
                                layout
                                transition={{ duration: 0.2 }}
                                className={`
                                flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all group/item
                                ${selectedId === guide._id ? "bg-primary/5 text-primary border border-primary/20" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-(--dark-body)"}
                              `}
                              >
                                <div className="p-1 shrink-0">
                                  <GripVertical className="w-3.5 h-3.5 text-gray-300 cursor-grab active:cursor-grabbing" />
                                </div>
                                <span className="text-sm font-medium flex-1 truncate whitespace-nowrap">{guide.title}</span>
                              </Reorder.Item>
                            ))}
                          </Reorder.Group>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </LayoutGroup>
        )}
      </div>
    </div>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default GuideList;
