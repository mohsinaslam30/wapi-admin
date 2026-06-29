/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { BrandingFormProps } from "@/src/types/landingPage";
import { Building2, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import ImageSelector from "../shared/ImageSelector";

const BrandingForm = ({ data, onChange }: BrandingFormProps) => {
  const { t } = useTranslation();
  const logos: string[] = data.brand_logos || [];
  const trustedLabel: string = data.trusted_label || "";

  const handleLabelChange = (value: string) => {
    onChange({ ...data, trusted_label: value });
  };

  const handleLogoChange = (index: number, url: string) => {
    const updated = [...logos];
    updated[index] = url;
    onChange({ ...data, brand_logos: updated });
  };

  const addLogo = () => {
    onChange({ ...data, brand_logos: [...logos, ""] });
  };

  const removeLogo = (index: number) => {
    onChange({ ...data, brand_logos: logos.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Trusted Label */}
      <div className="space-y-2 flex flex-col max-w-xl">
        <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">
          {t("landing_page_branding_trusted_label")}
        </Label>
        <Input
          value={trustedLabel}
          onChange={(e) => handleLabelChange(e.target.value)}
          placeholder={t("landing_page_branding_trusted_placeholder")}
          className="bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-(--card-border-color) h-11 text-[14px] focus:ring-primary/20"
        />
        <p className="text-[12px] text-gray-400">
          {t("landing_page_branding_trusted_hint")}
        </p>
      </div>

      {/* Brand Logos */}
      <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-(--card-border-color)">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 dark:text-gray-100">
                {t("landing_page_branding_title")}
              </h3>
              <p className="text-[12px] text-gray-400">
                {t("landing_page_branding_desc")}
              </p>
            </div>
          </div>
          <Button
            onClick={addLogo}
            variant="outline"
            size="sm"
            className="gap-2 h-10 px-5 rounded-lg dark:bg-(--page-body-bg) border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            {t("landing_page_branding_add")}
          </Button>
        </div>

        <div className="grid [@media(max-width:565px)]:grid-cols-1! [@media(max-width:768px)]:grid-cols-2 [@media(max-width:1563px)]:grid-cols-3 [@media(min-width:1421px)]:grid-cols-3 xl:grid-cols-5 gap-5 px-1">
          {logos.map((logoUrl, index) => (
            <div
              key={index}
              className="group relative p-4 bg-gray-50/50 dark:bg-page-body border border-gray-100 dark:border-(--card-border-color) rounded-xl hover:bg-white dark:hover:bg-(--dark-body) transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Button
                onClick={() => removeLogo(index)}
                className="absolute -top-3 -right-3 w-7 h-7 bg-white hover:bg-red-50 dark:bg-(--card-color) text-gray-400 hover:text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all dark:hover:bg-red-900/20 duration-300 shadow-sm border border-gray-100 dark:border-(--card-border-color) hover:border-red-100 z-10 hover:scale-110"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>

              <ImageSelector
                label={t("landing_page_branding_logo_num", {
                  index: index + 1,
                })}
                value={logoUrl}
                onChange={(url) => handleLogoChange(index, url)}
                className="space-y-2!"
              />
            </div>
          ))}

          {logos.length === 0 && (
            <div className="col-span-full py-16 border-2 border-dashed border-gray-200 dark:border-(--card-border-color) rounded-lg flex flex-col items-center justify-center text-gray-400 dark:bg-(--page-body-bg) bg-gray-50/30">
              <Building2 className="w-10 h-10 mb-3 opacity-10" />
              <p className="text-[13px] font-medium">
                {t("landing_page_branding_empty")}
              </p>
              <Button
                onClick={addLogo}
                variant="link"
                className="text-primary mt-1"
              >
                {t("landing_page_branding_empty_action")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandingForm;
