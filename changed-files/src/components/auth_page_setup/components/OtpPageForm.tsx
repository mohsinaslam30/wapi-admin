/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { OtpPageData } from "@/src/types/authPageSetup";
import { SidePanelForm } from "./SidePanelForm";

export const OtpPageForm = ({ data, onChange }: { data: OtpPageData; onChange: (data: OtpPageData) => void }) => {
  const handleChange = (field: keyof OtpPageData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Main Title</Label>
          <Input value={data.title || ""} onChange={(e) => handleChange("title", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Subtitle</Label>
          <Input value={data.subtitle || ""} onChange={(e) => handleChange("subtitle", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Button Text</Label>
          <Input value={data.button_text || ""} onChange={(e) => handleChange("button_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Resend Code Text</Label>
          <Input value={data.resend_text || ""} onChange={(e) => handleChange("resend_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Footer Help Text</Label>
          <Input value={data.footer_text || ""} onChange={(e) => handleChange("footer_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
      </div>

      <div className="pt-10 border-t border-gray-100 dark:border-(--card-border-color)">
        <SidePanelForm data={data.side_panel} onChange={(val) => handleChange("side_panel", val)} hideBadge={true} />
      </div>
    </div>
  );
};
