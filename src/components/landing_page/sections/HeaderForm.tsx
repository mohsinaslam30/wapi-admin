"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { useGetPagesQuery } from "@/src/redux/api/pageApi";
import {
  FlatMenuItem,
  HeaderFormProps,
  Page
} from "@/src/types/landingPage";
import {
  ChevronDown,
  ChevronUp,
  Folder,
  Link2,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageSelector from "../shared/ImageSelector";
import {
  buildTree,
  flattenTree,
  getBadgeStyle,
} from "./HeaderFormUtils";
import { MenuEditSettings } from "./MenuEditSettings";

const HeaderForm = ({ data, onChange }: HeaderFormProps) => {
  const { t } = useTranslation();
  const { data: pagesResponse } = useGetPagesQuery({ limit: 100 });
  const pages: Page[] = pagesResponse?.data?.pages || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [flatItems, setFlatItems] = useState<FlatMenuItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const list = flattenTree(data.menu_items || []);
    setFlatItems(list);
    setSelectedId((prevId) => {
      const exists = list.some((item) => item.id === prevId);
      if (exists) return prevId;
      return list.length > 0 ? list[0].id : null;
    });
  }, [data.menu_items]);

  const triggerChange = (newFlatList: FlatMenuItem[]) => {
    setFlatItems(newFlatList);
    const tree = buildTree(newFlatList, "");
    onChange({
      ...data,
      menu_items: tree,
    });
  };

  const handleAddField = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const maxSort = flatItems
      .filter((item) => item.parent_id === "")
      .reduce((max, item) => Math.max(max, item.sort_order), -1);

    const newItem: FlatMenuItem = {
      id: newId,
      title: "New Menu Item",
      link_type: "Link",
      parent_id: "",
      mega_menu: false,
      mega_menu_type: "Simple",
      target_blank: false,
      page_link: "",
      path: "/",
      link_image: "",
      badge_text: "",
      badge_color: "red",
      status: true,
      sort_order: maxSort + 1,
      description: "",
      icon: "",
    };

    const updated = [...flatItems, newItem];
    setSelectedId(newId);
    triggerChange(updated);
  };

  const handleUpdateItem = (
    fieldOrUpdates: keyof FlatMenuItem | Partial<FlatMenuItem>,
    value?: string | boolean | number,
  ) => {
    if (!selectedId) return;
    const updated = flatItems.map((item) => {
      if (item.id === selectedId) {
        let updatedItem = { ...item };
        if (typeof fieldOrUpdates === "object") {
          updatedItem = { ...updatedItem, ...fieldOrUpdates };
          if ("link_type" in fieldOrUpdates) {
            const val = fieldOrUpdates.link_type;
            if (val === "Sub") {
              updatedItem.path = "";
              updatedItem.page_link = "";
            } else {
              updatedItem.mega_menu = false;
            }
          }
        } else {
          updatedItem = { ...updatedItem, [fieldOrUpdates]: value };
          if (fieldOrUpdates === "link_type") {
            if (value === "Sub") {
              updatedItem.path = "";
              updatedItem.page_link = "";
            } else {
              updatedItem.mega_menu = false;
            }
          }
        }
        return updatedItem;
      }
      return item;
    });
    triggerChange(updated as FlatMenuItem[]);
  };

  const handleDeleteItem = (idToDelete: string) => {
    const idsToRemove = new Set<string>([idToDelete]);
    let checkMore = true;
    while (checkMore) {
      const startSize = idsToRemove.size;
      flatItems.forEach((item) => {
        if (idsToRemove.has(item.parent_id)) {
          idsToRemove.add(item.id);
        }
      });
      if (idsToRemove.size === startSize) {
        checkMore = false;
      }
    }

    const updated = flatItems.filter((item) => !idsToRemove.has(item.id));
    if (selectedId && idsToRemove.has(selectedId)) {
      setSelectedId(updated[0]?.id || null);
    }
    triggerChange(updated);
  };

  const moveOrder = (id: string, direction: "up" | "down") => {
    const targetItem = flatItems.find((item) => item.id === id);
    if (!targetItem) return;

    const siblings = flatItems
      .filter((item) => item.parent_id === targetItem.parent_id)
      .sort((a, b) => a.sort_order - b.sort_order);

    const currentIndex = siblings.findIndex((item) => item.id === id);
    if (direction === "up" && currentIndex > 0) {
      const prevSibling = siblings[currentIndex - 1];
      const updated = flatItems.map((item) => {
        if (item.id === id)
          return { ...item, sort_order: prevSibling.sort_order };
        if (item.id === prevSibling.id)
          return { ...item, sort_order: targetItem.sort_order };
        return item;
      });
      triggerChange(updated);
    } else if (direction === "down" && currentIndex < siblings.length - 1) {
      const nextSibling = siblings[currentIndex + 1];
      const updated = flatItems.map((item) => {
        if (item.id === id)
          return { ...item, sort_order: nextSibling.sort_order };
        if (item.id === nextSibling.id)
          return { ...item, sort_order: targetItem.sort_order };
        return item;
      });
      triggerChange(updated);
    }
  };

  const renderTreeNodes = (parentId = "", depth = 0) => {
    const filtered = flatItems
      .filter((item) => item.parent_id === parentId)
      .sort((a, b) => a.sort_order - b.sort_order);

    return filtered.map((item) => {
      const isSelected = selectedId === item.id;
      const isSub = item.link_type === "Sub";

      return (
        <div key={item.id} className="space-y-1">
          <div
            onClick={() => setSelectedId(item.id)}
            style={{ paddingLeft: `${depth * 24 + 12}px` }}
            className={`
              group flex items-center justify-between h-[52px] pr-3  rounded-lg border cursor-pointer transition-all duration-300
              ${isSelected ? "bg-primary/5 dark:bg-primary/10 border-primary text-primary" : "bg-gray-50/50 dark:bg-page-body hover:bg-gray-50 dark:hover:bg-(--table-hover) border-gray-100 dark:border-(--card-border-color) text-gray-700 dark:text-gray-300"}
            `}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="text-gray-400 shrink-0 select-none flex items-center justify-center w-5 h-5">
                {isSub ? (
                  <Folder className="w-4 h-4 text-amber-500" />
                ) : (
                  <Link2 className="w-4 h-4 text-sky-500" />
                )}
              </div>
              <div className="min-w-0">
                <span className="text-[14px] font-semibold truncate block">
                  {item.title}
                </span>
                {item.badge_text && (
                  <span
                    style={getBadgeStyle(item.badge_color)}
                    className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded text-white"
                  >
                    {item.badge_text}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  moveOrder(item.id, "up");
                }}
                className="w-8 h-8 rounded-lg dark:hover:bg-(--table-hover) text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  moveOrder(item.id, "down");
                }}
                className="w-8 h-8 rounded-lg dark:hover:bg-(--table-hover) text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteItem(item.id);
                }}
                className="w-8 h-8 rounded-md text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {renderTreeNodes(item.id, depth + 1)}
        </div>
      );
    });
  };

  const selectedItem = flatItems.find((item) => item.id === selectedId);

  const getParentOptions = () => {
    if (!selectedItem) return [];

    const childrenIds = new Set<string>();
    let checkMore = true;
    while (checkMore) {
      const startSize = childrenIds.size;
      flatItems.forEach((item) => {
        if (item.parent_id === selectedId || childrenIds.has(item.parent_id)) {
          childrenIds.add(item.id);
        }
      });
      if (childrenIds.size === startSize) {
        checkMore = false;
      }
    }

    return flatItems.filter(
      (item) =>
        item.link_type === "Sub" &&
        item.id !== selectedId &&
        !childrenIds.has(item.id),
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-(--card-color) sm:p-5 p-4 rounded-lg border border-gray-100 dark:border-(--card-border-color) shadow-sm">
        <ImageSelector
          label={t("landing_page_header_logo")}
          value={data.logo_url || ""}
          onChange={(url) => onChange({ ...data, logo_url: url })}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-5 bg-white dark:bg-(--card-color) border border-gray-100 dark:border-(--card-border-color) rounded-lg shadow-sm p-4 space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between border-b border-gray-50 dark:border-(--card-border-color) pb-3">
            <div>
              <h3 className="text-[15px] font-bold text-gray-900 dark:text-gray-100">
                {t("landing_page_header_menu_tree")}
              </h3>
              <p className="text-sm text-gray-400">
                {t("landing_page_header_menu_tree_desc")}
              </p>
            </div>
            <Button
              onClick={handleAddField}
              size="sm"
              className="gap-2 h-9 px-4 rounded-lg bg-primary text-white text-xs font-semibold shadow hover:bg-primary/95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              {t("landing_page_header_add_menu")}
            </Button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("landing_page_header_search_placeholder")}
              className="bg-(--input-color) dark:bg-page-body border-gray-100 dark:border-none pl-10 h-11 text-[13px]"
            />
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[710px] pr-1.5 no-scrollbar">
            {flatItems.length > 0 ? (
              renderTreeNodes("", 0)
            ) : (
              <div className="py-16 text-center text-gray-400">
                <Folder className="w-10 h-10 mx-auto mb-2 opacity-10" />
                <p className="text-[13px] font-medium">
                  {t("landing_page_header_no_items")}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-7 bg-white dark:bg-(--card-color) border border-gray-100 dark:border-(--card-border-color) rounded-lg shadow-sm sm:p-6 p-4">
          {selectedItem ? (
            <MenuEditSettings
              selectedItem={selectedItem}
              pages={pages}
              getParentOptions={getParentOptions}
              handleUpdateItem={handleUpdateItem}
            />
          ) : (
            <div className="py-24 text-center text-gray-400">
              <Folder className="w-12 h-12 mx-auto mb-3 opacity-10" />
              <p className="text-[14px] font-semibold">
                {t("landing_page_header_select_item")}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {t("landing_page_header_select_item_desc")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderForm;
