"use client";

import { Button } from "@/src/elements/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/elements/ui/dialog";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/elements/ui/select";
import { Switch } from "@/src/elements/ui/switch";
import { FlatMenuItem, MenuEditSettingsProps } from "@/src/types/landingPage";
import { HelpCircle, Info } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { AVAILABLE_ICONS, MEGA_MENU_TYPES } from "../../../data/landingPage";
import ImageSelector from "../shared/ImageSelector";
import { getBadgeColorHex } from "./HeaderFormUtils";

export const MenuEditSettings: React.FC<MenuEditSettingsProps> = ({
  selectedItem,
  pages,
  getParentOptions,
  handleUpdateItem,
}) => {
  const { t } = useTranslation();
  const [visualType, setVisualType] = React.useState<"icon" | "image">("icon");
  const [isInfoModalOpen, setIsInfoModalOpen] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisualType(selectedItem.link_image ? "image" : "icon");
  }, [selectedItem.id, selectedItem.link_image]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-50 dark:border-(--card-border-color) pb-4 flex-wrap gap-3">
        <div>
          <h4 className="text-[16px] font-bold text-gray-900 dark:text-gray-100">
            {t("landing_page_header_edit_settings")}
          </h4>
          <p className="text-sm text-gray-400">
            {t("landing_page_header_edit_settings_desc")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2 space-y-2 flex flex-col">
          <Label className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
            {t("landing_page_header_title_label")}
          </Label>
          <Input
            value={selectedItem.title}
            onChange={(e) => handleUpdateItem("title", e.target.value)}
            placeholder={t("landing_page_header_title_placeholder")}
            className="bg-(--input-color) dark:bg-page-body border-gray-100 dark:border-none h-12 text-[14px] font-medium"
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <Label className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
            {t("landing_page_header_link_type")}
          </Label>
          <Select
            value={selectedItem.link_type}
            onValueChange={(val) =>
              handleUpdateItem("link_type", val as FlatMenuItem["link_type"])
            }
          >
            <SelectTrigger className="h-11 bg-(--input-color) dark:bg-page-body border-gray-100 dark:border-none rounded-lg text-[13px]">
              <SelectValue
                placeholder={t("landing_page_header_select_link_type")}
              />
            </SelectTrigger>
            <SelectContent className="dark:bg-(--card-color) border-gray-100 dark:border-(--card-border-color) rounded-lg shadow-2xl">
              <SelectItem
                value="Sub"
                className="rounded-lg dark:hover:bg-(--table-hover)"
              >
                {t("landing_page_header_sub_menu")}
              </SelectItem>
              <SelectItem
                value="Link"
                className="rounded-lg dark:hover:bg-(--table-hover)"
              >
                {t("landing_page_header_clickable_link")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
            {t("landing_page_header_parent_label")}
          </Label>
          <Select
            value={selectedItem.parent_id || "_ROOT_"}
            onValueChange={(val) =>
              handleUpdateItem("parent_id", val === "_ROOT_" ? "" : val)
            }
          >
            <SelectTrigger className="h-11 bg-(--input-color) dark:bg-page-body border-gray-100 dark:border-none rounded-lg text-[13px]">
              <SelectValue placeholder={t("landing_page_header_root_level")} />
            </SelectTrigger>
            <SelectContent className="dark:bg-(--card-color) border-gray-100 dark:border-(--card-border-color) rounded-lg shadow-2xl">
              <SelectItem
                value="_ROOT_"
                className="rounded-lg dark:hover:bg-(--table-hover)"
              >
                {t("landing_page_header_root_level")}
              </SelectItem>
              {getParentOptions().map((opt) => (
                <SelectItem
                  key={opt.id}
                  value={opt.id}
                  className="rounded-lg dark:hover:bg-(--table-hover)"
                >
                  {opt.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedItem.link_type === "Sub" && (
          <div className="md:col-span-2 space-y-6 bg-gray-50/50 dark:bg-page-body p-4 rounded-xl border border-gray-100 dark:border-(--card-border-color)">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[13px] font-bold text-gray-880 dark:text-gray-250">
                  {t("landing_page_header_mega_menu_grid")}
                </Label>
                <p className="text-[11px] text-gray-400">
                  {t("landing_page_header_mega_menu_grid_desc")}
                </p>
              </div>
              <Switch
                checked={selectedItem.mega_menu}
                onCheckedChange={(checked) =>
                  handleUpdateItem("mega_menu", checked)
                }
                className="data-[state=checked]:bg-primary"
              />
            </div>

            {selectedItem.mega_menu && (
              <div className="space-y-4 flex flex-col">
                <Label className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
                  {t("landing_page_header_mega_menu_style")}
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {MEGA_MENU_TYPES.map((type) => {
                    const isTypeActive =
                      selectedItem.mega_menu_type === type.value;
                    let typeLabelKey = "landing_page_header_mega_simple";
                    let typeDescKey = "landing_page_header_mega_simple_desc";

                    if (type.value === "Link With Image") {
                      typeLabelKey = "landing_page_header_mega_link_image";
                      typeDescKey = "landing_page_header_mega_link_image_desc";
                    } else if (type.value === "Side Banner") {
                      typeLabelKey = "landing_page_header_mega_side_banner";
                      typeDescKey = "landing_page_header_mega_side_banner_desc";
                    } else if (type.value === "Bottom Banner") {
                      typeLabelKey = "landing_page_header_mega_bottom_banner";
                      typeDescKey =
                        "landing_page_header_mega_bottom_banner_desc";
                    } else if (type.value === "Product Box") {
                      typeLabelKey = "landing_page_header_mega_product_box";
                      typeDescKey = "landing_page_header_mega_product_box_desc";
                    } else if (type.value === "Blog Box") {
                      typeLabelKey = "landing_page_header_mega_blog_box";
                      typeDescKey = "landing_page_header_mega_blog_box_desc";
                    }

                    return (
                      <div
                        key={type.value}
                        onClick={() =>
                          handleUpdateItem("mega_menu_type", type.value)
                        }
                        className={`
                          flex flex-col p-3 rounded-lg border text-left cursor-pointer transition-all duration-300
                          ${isTypeActive ? "border-primary bg-primary/2 shadow-inner dark:bg-(--card-color)" : "border-gray-100 dark:border-none bg-white dark:bg-(--card-color) hover:bg-gray-50 dark:hover:bg-(--table-hover)"}
                        `}
                      >
                        <span
                          className={`text-[13px] font-bold ${isTypeActive ? "text-primary" : "text-gray-850"}`}
                        >
                          {t(typeLabelKey)}
                        </span>
                        <span className="text-[11px] text-gray-450 mt-1 leading-snug">
                          {t(typeDescKey)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedItem.link_type === "Link" && (
          <>
            <div className="md:col-span-2 flex items-center justify-between bg-gray-50/50 dark:bg-page-body p-4 rounded-xl border border-gray-100 dark:border-(--card-border-color)">
              <div>
                <Label className="text-[13px] font-bold text-gray-850">
                  {t("landing_page_header_target_blank")}
                </Label>
                <p className="text-sm text-gray-500">
                  {t("landing_page_header_target_blank_desc")}
                </p>
              </div>
              <Switch
                checked={selectedItem.target_blank}
                onCheckedChange={(checked) =>
                  handleUpdateItem("target_blank", checked)
                }
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
                {t("landing_page_header_set_page_link")}
              </Label>
              <Select
                value={selectedItem.page_link || "_CUSTOM_"}
                onValueChange={(val) => {
                  if (val === "_CUSTOM_") {
                    handleUpdateItem("page_link", "");
                  } else {
                    handleUpdateItem({
                      page_link: val,
                      path: val,
                    });
                  }
                }}
              >
                <SelectTrigger className="h-11 bg-(--input-color) dark:bg-page-body border-gray-100 dark:border-none rounded-lg text-[13px]">
                  <SelectValue
                    placeholder={t("landing_page_header_custom_link")}
                  />
                </SelectTrigger>
                <SelectContent className="dark:bg-(--card-color) border-gray-100 dark:border-(--card-border-color) rounded-lg shadow-2xl">
                  <SelectItem
                    value="_CUSTOM_"
                    className="rounded-lg dark:hover:bg-(--table-hover)"
                  >
                    {t("landing_page_header_custom_link")}
                  </SelectItem>
                  <SelectItem
                    value="/"
                    className="rounded-lg dark:hover:bg-(--table-hover)"
                  >
                    {t("landing_page_header_home_page")}
                  </SelectItem>
                  <SelectItem
                    value="/pricing"
                    className="rounded-lg dark:hover:bg-(--table-hover)"
                  >
                    {t("landing_page_header_pricing_page")}
                  </SelectItem>
                  {pages.map((p) => (
                    <SelectItem
                      key={p._id}
                      value={
                        p.slug.startsWith("/channel") ||
                        p.slug.startsWith("/product")
                          ? p.slug
                          : `/product/${p.slug}`
                      }
                      className="rounded-lg dark:hover:bg-(--table-hover)"
                    >
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
                  {t("landing_page_header_path_label")}
                </Label>
                <button
                  type="button"
                  onClick={() => setIsInfoModalOpen(true)}
                  className="text-gray-400 hover:text-primary transition-colors focus:outline-none"
                  title="Path Information"
                >
                  <HelpCircle size={14} />
                </button>
              </div>
              <Input
                value={selectedItem.path}
                onChange={(e) => handleUpdateItem("path", e.target.value)}
                placeholder={t("landing_page_header_path_placeholder")}
                className="bg-(--input-color) dark:bg-page-body border-gray-100 dark:border-none h-11 text-[13.5px]"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
                {t("landing_page_header_description_label")}
              </Label>
              <Input
                value={selectedItem.description || ""}
                onChange={(e) =>
                  handleUpdateItem("description", e.target.value)
                }
                placeholder={t("landing_page_header_description_placeholder")}
                className="bg-(--input-color) dark:bg-page-body border-gray-100 dark:border-none h-11 text-[13.5px]"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <Label className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
                {t("landing_page_header_visual_accent")}
              </Label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 dark:bg-page-body rounded-lg border border-gray-100 dark:border-none">
                <Button
                  type="button"
                  onClick={() => {
                    setVisualType("icon");
                    handleUpdateItem("link_image", "");
                  }}
                  className={`py-2 text-xs font-semibold rounded-md transition-all duration-200 ${
                    visualType === "icon"
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-700 shadow-none bg-white dark:bg-[unset] dark:text-gray-300 hover:bg-[unset] dark:hover:text-gray-350"
                  }`}
                >
                  {t("landing_page_header_select_icon")}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setVisualType("image");
                    handleUpdateItem("icon", "");
                  }}
                  className={`py-2 text-xs font-semibold rounded-md transition-all duration-200 ${
                    visualType === "image"
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-700 shadow-none bg-white dark:bg-[unset] dark:text-gray-300 hover:bg-[unset] dark:hover:text-gray-350"
                  }`}
                >
                  {t("landing_page_header_upload_image")}
                </Button>
              </div>
            </div>

            {visualType === "icon" ? (
              <div className="md:col-span-2 space-y-2">
                <Label className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
                  {t("landing_page_header_icon_label")}
                </Label>
                <Select
                  value={selectedItem.icon || "None"}
                  onValueChange={(val) => {
                    handleUpdateItem({
                      icon: val === "None" ? "" : val,
                      link_image: "",
                    });
                  }}
                >
                  <SelectTrigger className="h-11 bg-(--input-color) dark:bg-page-body border-gray-100 dark:border-none rounded-lg text-[13px]">
                    <SelectValue
                      placeholder={t("landing_page_header_no_icon")}
                    />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-(--card-color) border-gray-100 dark:border-(--card-border-color) rounded-lg shadow-2xl">
                    <SelectItem
                      value="None"
                      className="rounded-lg dark:hover:bg-(--table-hover)"
                    >
                      {t("landing_page_header_no_icon")}
                    </SelectItem>
                    {AVAILABLE_ICONS.map((ico) => {
                      let iconLabelKey = "landing_page_header_icon_phone";
                      if (ico.value === "Instagram") {
                        iconLabelKey = "landing_page_header_icon_instagram";
                      } else if (ico.value === "MessageSquare") {
                        iconLabelKey =
                          "landing_page_header_icon_message_square";
                      } else if (ico.value === "Send") {
                        iconLabelKey = "landing_page_header_icon_paper_plane";
                      } else if (ico.value === "Inbox") {
                        iconLabelKey = "landing_page_header_icon_inbox";
                      } else if (ico.value === "GitBranch") {
                        iconLabelKey = "landing_page_header_icon_git_branch";
                      } else if (ico.value === "ShoppingBag") {
                        iconLabelKey = "landing_page_header_icon_shopping_bag";
                      } else if (ico.value === "Bot") {
                        iconLabelKey = "landing_page_header_icon_ai_bot";
                      } else if (ico.value === "FileText") {
                        iconLabelKey = "landing_page_header_icon_file_text";
                      } else if (ico.value === "CreditCard") {
                        iconLabelKey = "landing_page_header_icon_credit_card";
                      } else if (ico.value === "Sparkles") {
                        iconLabelKey = "landing_page_header_icon_sparkles";
                      } else if (ico.value === "Calendar") {
                        iconLabelKey = "landing_page_header_icon_calendar";
                      }

                      return (
                        <SelectItem
                          key={ico.value}
                          value={ico.value}
                          className="rounded-lg dark:hover:bg-(--table-hover)"
                        >
                          {t(iconLabelKey)}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="md:col-span-2">
                <ImageSelector
                  label={t("landing_page_header_image_preview")}
                  value={selectedItem.link_image || ""}
                  onChange={(url) => {
                    handleUpdateItem({
                      link_image: url,
                      icon: "",
                    });
                  }}
                />
              </div>
            )}
          </>
        )}

        <div className="space-y-2 flex flex-col">
          <Label className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
            {t("landing_page_header_badge_text")}
          </Label>
          <Input
            value={selectedItem.badge_text || ""}
            onChange={(e) => handleUpdateItem("badge_text", e.target.value)}
            placeholder={t("landing_page_header_badge_text_placeholder")}
            className="bg-(--input-color) dark:bg-page-body border-gray-100 dark:border-none h-11 text-[13.5px]"
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <Label className="text-[12px] font-bold text-gray-700 dark:text-gray-300 block">
            {t("landing_page_header_badge_color")}
          </Label>
          <div className="flex items-center gap-3">
            <Input
              type="color"
              value={getBadgeColorHex(selectedItem.badge_color)}
              onChange={(e) => handleUpdateItem("badge_color", e.target.value)}
              className="w-11 h-11 cursor-pointer rounded-lg p-1 shrink-0"
            />
            <Input
              type="text"
              value={selectedItem.badge_color || "#ef4444"}
              onChange={(e) => handleUpdateItem("badge_color", e.target.value)}
              placeholder="#ef4444"
              className="bg-(--input-color) dark:bg-page-body border-gray-100 dark:border-none h-11 text-[13.5px] font-mono"
            />
          </div>
        </div>

        <div className="md:col-span-2 flex items-center justify-between border-t border-gray-50 dark:border-(--card-border-color) pt-5">
          <div>
            <Label className="text-[14px] font-bold text-gray-800 dark:text-gray-300">
              {t("landing_page_header_status_label")}
            </Label>
            <p className="text-sm text-gray-400">
              {t("landing_page_header_status_desc")}
            </p>
          </div>
          <Switch
            checked={selectedItem.status}
            onCheckedChange={(checked) => handleUpdateItem("status", checked)}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>

      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="sm:max-w-lg max-w-[calc(100%-2rem)] rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-white dark:bg-(--card-color) p-6 shadow-xl">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-primary/10 text-primary rounded-lg">
                <Info size={20} />
              </span>
              <DialogTitle className="text-lg font-black text-gray-900 dark:text-gray-100">
                How to set the Page Path
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-5 py-4 text-sm leading-relaxed text-gray-650 dark:text-gray-300 font-medium">
            <p>
              To link a menu item to a custom page created on your site, follow
              these simple steps:
            </p>

            <div className="space-y-4 bg-slate-50 dark:bg-page-body p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-black shrink-0">
                  1
                </span>
                <div>
                  <h5 className="font-bold text-gray-950 dark:text-gray-50">
                    Create a new page
                  </h5>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Navigate to{" "}
                    <strong className="text-gray-800 dark:text-gray-200">
                      Page Management
                    </strong>{" "}
                    and create a page.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-black shrink-0">
                  2
                </span>
                <div>
                  <h5 className="font-bold text-gray-950 dark:text-gray-50">
                    Get the Page Slug
                  </h5>
                  <p className="text-xs text-gray-400 mt-0.5">
                    The slug of your created page serves as the endpoint
                    identifier.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-black shrink-0">
                  3
                </span>
                <div>
                  <h5 className="font-bold text-gray-950 dark:text-gray-50">
                    Base Route Structure
                  </h5>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Your final frontend page URL will match the structure:
                  </p>
                  <code className="block mt-2 px-2.5 py-1.5 bg-white dark:bg-(--card-color) text-xs font-mono rounded border border-gray-150 dark:border-gray-800 text-primary font-semibold select-all">
                    {"{{front_url}}/page/{{page_slug}}"}
                  </code>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              💡 Tip: In the path field, you can set absolute URLs or relative
              endpoints like{" "}
              <code className="font-mono text-gray-800 dark:text-gray-200 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                /page/my-about-us
              </code>
              .
            </p>
          </div>

          <DialogFooter className="pt-2">
            <Button
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold rounded-lg py-2.5 px-4 shadow-sm"
              onClick={() => setIsInfoModalOpen(false)}
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
