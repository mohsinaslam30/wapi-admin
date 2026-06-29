/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageMediaUploadField } from "../PageMediaUploadField";
import { SharedFormProps } from "@/src/types/landingPage";
import { Button } from "@/src/elements/ui/button";
import { Label } from "@/src/elements/ui/label";
import { Input } from "@/src/elements/ui/input";
import { Textarea } from "@/src/elements/ui/textarea";

export const WhatsAppForm: React.FC<SharedFormProps> = ({
  data,
  updateField,
  renderHeader,
  renderTextInput,
  activeSection,
  labelClass,
  inputClass,
}) => {
  const isOpenCounters = activeSection === "counters";
  const isOpenComparison = activeSection === "comparison";
  const isOpenFeatures = activeSection === "features";

  // Counters State
  const countersList = Array.isArray(data.counters) ? data.counters : [];
  const handleCountersChange = (idx: number, field: string, val: string) => {
    const updated = [...countersList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["counters"], updated);
  };
  const handleAddCounter = () => {
    updateField(["counters"], [...countersList, { count: "", title: "" }]);
  };
  const handleRemoveCounter = (idx: number) => {
    const updated = [...countersList];
    updated.splice(idx, 1);
    updateField(["counters"], updated);
  };

  // Platform Features Array (Comparison)
  const compList = Array.isArray(data.comparison?.platform_feature_array)
    ? data.comparison.platform_feature_array
    : [];
  const handleCompChange = (idx: number, field: string, val: string) => {
    const updated = [...compList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["comparison", "platform_feature_array"], updated);
  };
  const handleAddCompRow = () => {
    updateField(
      ["comparison", "platform_feature_array"],
      [...compList, { platform_feature: "", whatsapp_feature: "", official_api: "" }]
    );
  };
  const handleRemoveCompRow = (idx: number) => {
    const updated = [...compList];
    updated.splice(idx, 1);
    updateField(["comparison", "platform_feature_array"], updated);
  };

  // Features list
  const featList = Array.isArray(data.features?.features) ? data.features.features : [];
  const handleFeatChange = (idx: number, field: string, val: any) => {
    const updated = [...featList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["features", "features"], updated);
  };
  const handleAddFeature = () => {
    updateField(
      ["features", "features"],
      [...featList, { title: "", description: "", image: "", bullets: [] }]
    );
  };
  const handleRemoveFeature = (idx: number) => {
    const updated = [...featList];
    updated.splice(idx, 1);
    updateField(["features", "features"], updated);
  };

  return (
    <>
      {/* counters */}
      <div className="">
        {renderHeader("counters", "Key Stats Counters")}
        {isOpenCounters && (
          <div className="sm:p-5 p-4 space-y-4">
            <Label className={labelClass}>Active Counters</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {countersList.map((c: any, idx: number) => (
                <div key={idx} className="flex gap-2 items-center bg-slate-50 dark:bg-(--dark-sidebar) p-3 rounded-lg border border-slate-100 dark:border-(--card-border-color)">
                  <Input
                    type="text"
                    value={c?.count || ""}
                    onChange={(e) => handleCountersChange(idx, "count", e.target.value)}
                    placeholder="Count (e.g. +45%)"
                    className={`${inputClass} w-28`}
                  />
                  <Input
                    type="text"
                    value={c?.title || ""}
                    onChange={(e) => handleCountersChange(idx, "title", e.target.value)}
                    placeholder="Title (e.g. Broadcast Click Rate)"
                    className={inputClass}
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemoveCounter(idx)}
                    className="p-2! bg-[unset] shadow-xs w-10! h-9! dark:bg-(--page-body-bg) dark:hover:bg-red-900/20  text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={handleAddCounter}
              className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Counter
            </Button>
          </div>
        )}
      </div>

      {/* comparison */}
      <div className="">
        {renderHeader("comparison", "WhatsApp vs Official API Comparison Grid")}
        {isOpenComparison && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["comparison", "badge"], "Comparison Badge", "Comparison Grid")}
              {renderTextInput(["comparison", "title"], "Comparison Title", "Standard vs Official")}
              {renderTextInput(["comparison", "subtitle"], "Comparison Subtitle", "Why switch to Official API")}
            </div>

            <div className="space-y-4 mt-4">
              <Label className={labelClass}>Comparison Rows</Label>
              {compList.map((row: any, idx: number) => (
                <div key={idx} className="p-4 rounded-lg border border-slate-100 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative">
                  <div className="absolute top-4 right-4 rtl:right-[unset] rtl:left-4">
                    <Button
                      type="button"
                      onClick={() => handleRemoveCompRow(idx)}
                      className="p-1! dark:bg-(--page-body-bg) dark:hover:bg-red-900/20 h-9! w-9! bg-[unset] shadow-xs hover:bg-red-50 text-red-500 rounded-lg"
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-14 sm:pr-14">
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Platform Feature</Label>
                      <Input
                        type="text"
                        value={row?.platform_feature || ""}
                        onChange={(e) => handleCompChange(idx, "platform_feature", e.target.value)}
                        placeholder="e.g. Broadcast Limits"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-650">Standard WhatsApp App</label>
                      <input
                        type="text"
                        value={row?.whatsapp_feature || ""}
                        onChange={(e) => handleCompChange(idx, "whatsapp_feature", e.target.value)}
                        placeholder="e.g. Max 256 contacts"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-650">Official API Connection</label>
                      <input
                        type="text"
                        value={row?.official_api || ""}
                        onChange={(e) => handleCompChange(idx, "official_api", e.target.value)}
                        placeholder="e.g. Unlimited broadcasts"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={handleAddCompRow}
              className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Comparison Row
            </Button>
          </div>
        )}
      </div>

      {/* features */}
      <div className="">
        {renderHeader("features", "Interactive Tabbed Features Showcase")}
        {isOpenFeatures && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["features", "badge"], "Features Badge", "Showcase")}
              {renderTextInput(["features", "title"], "Features Main Title", "Powerful tools built for WhatsApp")}
              {renderTextInput(["features", "sub_title"], "Features Subtitle", "Explore custom capabilities")}
            </div>

            <div className="space-y-6 mt-4">
              <Label className={labelClass}>Capabilities Details</Label>
              {featList.map((feat: any, idx: number) => (
                <div key={idx} className="sm:p-5 p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                  <Button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-450 uppercase font-semibold">FEATURE CAPABILITY #{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Feature Title</Label>
                      <Input
                        type="text"
                        value={feat?.title || ""}
                        onChange={(e) => handleFeatChange(idx, "title", e.target.value)}
                        placeholder="e.g. Shared Team Inbox"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="block text-xs font-bold text-slate-650 dark:text-gray-400 mb-1.5">Feature Image Asset</Label>
                      <PageMediaUploadField
                        value={feat?.image || ""}
                        onChange={(uploadedUrl) => handleFeatChange(idx, "image", uploadedUrl)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Feature Description</Label>
                    <Textarea
                      value={feat?.description || ""}
                      onChange={(e) => handleFeatChange(idx, "description", e.target.value)}
                      placeholder="Feature details description..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  {/* bullets inside features */}
                  <div>
                    <Label className="text-[10px] font-bold text-gray-450 block mb-1">Bullets</Label>
                    <div className="space-y-2 mb-2">
                      {Array.isArray(feat?.bullets) && feat.bullets.map((bullet: string, bIdx: number) => (
                        <div key={bIdx} className="flex gap-2">
                          <Input
                            type="text"
                            value={bullet}
                            onChange={(e) => {
                              const newBullets = [...feat.bullets];
                              newBullets[bIdx] = e.target.value;
                              handleFeatChange(idx, "bullets", newBullets);
                            }}
                            placeholder="Bullet text..."
                            className={inputClass}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              const newBullets = [...feat.bullets];
                              newBullets.splice(bIdx, 1);
                              handleFeatChange(idx, "bullets", newBullets);
                            }}
                            className="p-2! w-9! h-9! bg-[unset] shadow-xs dark:bg-(--page-body-bg) dark:hover:bg-red-900/20 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        const newBullets = [...(feat.bullets || []), ""];
                        handleFeatChange(idx, "bullets", newBullets);
                      }}
                      className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
                    >
                      + Add Bullet
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={handleAddFeature}
              className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Feature Tab
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
