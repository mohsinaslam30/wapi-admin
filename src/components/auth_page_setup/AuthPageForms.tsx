/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { BulletItem, ForgotPasswordPageData, LoginPageData, OtpPageData, RegisterPageData, ResetPasswordPageData, SidePanelData } from "@/src/types/authPageSetup";
import { Info, Layout, ListChecks, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SidePanelFormProps {
  data: SidePanelData;
  onChange: (data: SidePanelData) => void;
  hideBadge?: boolean;
}

export const SidePanelForm = ({ data, onChange, hideBadge }: SidePanelFormProps) => {
  const { t } = useTranslation();

  const handleChange = (field: keyof SidePanelData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleBulletChange = (index: number, field: keyof BulletItem, value: any, type: "bullets" | "footer" = "bullets") => {
    const list = [...(data[type] || [])];
    list[index] = { ...list[index], [field]: value };
    handleChange(type, list);
  };

  const addBullet = (type: "bullets" | "footer" = "bullets") => {
    const list = [...(data[type] || [])];
    list.push({ title: "", points: [] });
    handleChange(type, list);
  };

  const removeBullet = (index: number, type: "bullets" | "footer" = "bullets") => {
    const list = (data[type] || []).filter((_, i) => i !== index);
    handleChange(type, list);
  };

  const handlePointChange = (bulletIndex: number, pointIndex: number, value: string, type: "bullets" | "footer" = "bullets") => {
    const list = [...(data[type] || [])];
    const points = [...list[bulletIndex].points];
    points[pointIndex] = value;
    list[bulletIndex] = { ...list[bulletIndex], points };
    handleChange(type, list);
  };

  const addPoint = (bulletIndex: number, type: "bullets" | "footer" = "bullets") => {
    const list = [...(data[type] || [])];
    const points = [...list[bulletIndex].points, ""];
    list[bulletIndex] = { ...list[bulletIndex], points };
    handleChange(type, list);
  };

  const removePoint = (bulletIndex: number, pointIndex: number, type: "bullets" | "footer" = "bullets") => {
    const list = [...(data[type] || [])];
    const points = list[bulletIndex].points.filter((_, i) => i !== pointIndex);
    list[bulletIndex] = { ...list[bulletIndex], points };
    handleChange(type, list);
  };

  const renderBulletList = (type: "bullets" | "footer") => {
    const items = data[type] || [];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-primary" />
            <Label className="text-[14px] font-bold text-gray-700 dark:text-gray-300 capitalize">{type}</Label>
          </div>
          <Button onClick={() => addBullet(type)} variant="outline" size="sm" className="h-8 px-3 gap-1.5 text-[11px] font-bold dark:bg-(--page-body-bg) border-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
            <Plus className="w-3.5 h-3.5" />
            Add Item
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {items.map((bullet, idx) => (
            <div key={idx} className="p-4 bg-gray-50/50 dark:bg-page-body border border-gray-100 dark:border-(--card-border-color) rounded-xl relative group transition-all hover:bg-white dark:hover:bg-(--dark-body) hover:shadow-sm">
              <button onClick={() => removeBullet(idx, type)} className="absolute -top-2 -right-2 w-7 h-7 bg-white dark:bg-(--card-color) text-gray-400 hover:text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-gray-100 dark:border-none z-10">
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="space-y-4">
                <div className="space-y-2 flex flex-col">
                  <Label className="text-sm font-black text-gray-400">Item Title</Label>
                  <Input value={bullet.title || ""} onChange={(e) => handleBulletChange(idx, "title", e.target.value, type)} placeholder="Enter title..." className="h-10 text-sm bg-white dark:bg-(--card-color) border-gray-100 dark:border-none shadow-inner focus:ring-primary/10" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-black text-gray-400">Points</Label>
                    <button onClick={() => addPoint(idx, type)} className="text-[11px] font-bold text-primary hover:underline">
                      + Add Point
                    </button>
                  </div>
                  <div className="space-y-2">
                    {bullet.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex gap-2">
                        <Input value={point || ""} onChange={(e) => handlePointChange(idx, pIdx, e.target.value, type)} placeholder="Point content..." className="h-9 text-xs bg-white dark:bg-(--card-color) border-gray-100 dark:border-none shadow-inner" />
                        <Button onClick={() => removePoint(idx, pIdx, type)} variant="ghost" size="sm" className="h-9 w-9 p-0 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                    {bullet.points.length === 0 && <p className="text-[11px] text-gray-400 italic px-1">No points added. (Optional)</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="py-8 border-2 border-dashed border-gray-100 dark:border-(--card-border-color) rounded-lg dark:bg-(--dark-body) flex flex-col items-center justify-center text-gray-400 bg-gray-50/20">
              <Info className="w-6 h-6 mb-2 opacity-20" />
              <p className="text-[12px] font-medium">No items added yet</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-primary/5 dark:bg-primary/2 p-4 rounded-xl border border-primary/10 flex gap-4 items-start mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <Layout className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-[15px] font-bold text-gray-900 dark:text-gray-100">{t("auth_page_setup_side_panel")}</h4>
          <p className="text-[12px] text-gray-500 leading-relaxed">{t("auth_page_setup_side_panel_desc")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!hideBadge && (
          <div className="space-y-2 flex flex-col">
            <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Badge Text</Label>
            <Input value={data.badge || ""} onChange={(e) => handleChange("badge", e.target.value)} placeholder="e.g. JOIN US NOW" className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none focus:ring-primary/20 text-sm" />
          </div>
        )}
        <div className="space-y-2 flex flex-col">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Panel Title</Label>
          <Input value={data.title || ""} onChange={(e) => handleChange("title", e.target.value)} placeholder="Enter title..." className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none focus:ring-primary/20 text-sm" />
        </div>
        <div className={hideBadge ? "md:col-span-1 space-y-2" : "md:col-span-2 space-y-2"}>
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Description</Label>
          <Input value={data.description || ""} onChange={(e) => handleChange("description", e.target.value)} placeholder="Enter description..." className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none focus:ring-primary/20 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {renderBulletList("bullets")}
        {renderBulletList("footer")}
      </div>
    </div>
  );
};

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

export const RegisterPageForm = ({ data, onChange }: { data: RegisterPageData; onChange: (data: RegisterPageData) => void }) => {
  const handleChange = (field: keyof RegisterPageData, value: any) => {
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
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Login Hint Text</Label>
          <Input value={data.login_text || ""} onChange={(e) => handleChange("login_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Login Link Text</Label>
          <Input value={data.login_link_text || ""} onChange={(e) => handleChange("login_link_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
      </div>

      <div className="pt-10 border-t border-gray-100 dark:border-(--card-border-color)">
        <SidePanelForm data={data.side_panel} onChange={(val) => handleChange("side_panel", val)} />
      </div>
    </div>
  );
};

export const ForgotPasswordPageForm = ({ data, onChange }: { data: ForgotPasswordPageData; onChange: (data: ForgotPasswordPageData) => void }) => {
  const handleChange = (field: keyof ForgotPasswordPageData, value: any) => {
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
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Back to Login Text</Label>
          <Input value={data.back_to_login_text || ""} onChange={(e) => handleChange("back_to_login_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Login Link Text</Label>
          <Input value={data.login_link_text || ""} onChange={(e) => handleChange("login_link_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
      </div>

      <div className="pt-10 border-t border-gray-100 dark:border-(--card-border-color)">
        <SidePanelForm data={data.side_panel} onChange={(val) => handleChange("side_panel", val)} hideBadge={true} />
      </div>
    </div>
  );
};

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

export const ResetPasswordPageForm = ({ data, onChange }: { data: ResetPasswordPageData; onChange: (data: ResetPasswordPageData) => void }) => {
  const handleChange = (field: keyof ResetPasswordPageData, value: any) => {
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
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Back to Login Text</Label>
          <Input value={data.back_to_login_text || ""} onChange={(e) => handleChange("back_to_login_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label className="text-[13px] font-bold text-gray-700 dark:text-gray-300">Login Link Text</Label>
          <Input value={data.login_link_text || ""} onChange={(e) => handleChange("login_link_text", e.target.value)} className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) dark:border-none" />
        </div>
      </div>

      <div className="pt-10 border-t border-gray-100 dark:border-(--card-border-color)">
        <SidePanelForm data={data.side_panel} onChange={(val) => handleChange("side_panel", val)} />
      </div>
    </div>
  );
};
