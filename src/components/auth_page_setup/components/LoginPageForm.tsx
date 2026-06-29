/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { LoginPageData } from "@/src/types/authPageSetup";
import { SidePanelForm } from "./SidePanelForm";

export const LoginPageForm = ({ data, onChange }: { data: LoginPageData; onChange: (data: LoginPageData) => void }) => {
  const handleChange = (field: keyof LoginPageData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 flex flex-col">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Main Title</Label>
          <Input value={data.title || ""} onChange={(e) => handleChange("title", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Subtitle</Label>
          <Input value={data.subtitle || ""} onChange={(e) => handleChange("subtitle", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Button Text</Label>
          <Input value={data.button_text || ""} onChange={(e) => handleChange("button_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Forgot Password Text</Label>
          <Input value={data.forgot_password_text || ""} onChange={(e) => handleChange("forgot_password_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Signup Hint Text</Label>
          <Input value={data.signup_text || ""} onChange={(e) => handleChange("signup_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Signup Link Text</Label>
          <Input value={data.signup_link_text || ""} onChange={(e) => handleChange("signup_link_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
      </div>

      <div className="pt-10 border-t border-gray-100 dark:border-(--card-border-color)">
        <SidePanelForm data={data.side_panel} onChange={(val) => handleChange("side_panel", val)} hideBadge={true} />
      </div>
    </div>
  );
};
