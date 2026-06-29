/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageMediaUploadField } from "../PageMediaUploadField";
import { SharedFormProps } from "@/src/types/landingPage";
import { Button } from "@/src/elements/ui/button";
import { Label } from "@/src/elements/ui/label";
import { Input } from "@/src/elements/ui/input";
import { Textarea } from "@/src/elements/ui/textarea";

export const InstagramForm: React.FC<SharedFormProps> = ({
  data,
  updateField,
  renderHeader,
  renderTextInput,
  renderMediaUploadInput,
  renderStringArrayInput,
  activeSection,
  labelClass,
  inputClass,
}) => {
  const isOpenComment = activeSection === "comment_section";
  const isOpenFeatures = activeSection === "features";

  // Features list
  const isFeaturesObject = data.features && !Array.isArray(data.features);
  const featList = isFeaturesObject
    ? (Array.isArray(data.features.features) ? data.features.features : [])
    : (Array.isArray(data.features) ? data.features : []);

  const handleFeatChange = (idx: number, field: string, val: string) => {
    const updated = [...featList];
    updated[idx] = { ...updated[idx], [field]: val };
    if (isFeaturesObject) {
      updateField(["features", "features"], updated);
    } else {
      updateField(["features"], updated);
    }
  };
  const handleAddFeature = () => {
    const updated = [...featList, { badge: "", title: "", description: "", image: "" }];
    if (isFeaturesObject) {
      updateField(["features", "features"], updated);
    } else {
      updateField(["features"], updated);
    }
  };
  const handleRemoveFeature = (idx: number) => {
    const updated = [...featList];
    updated.splice(idx, 1);
    if (isFeaturesObject) {
      updateField(["features", "features"], updated);
    } else {
      updateField(["features"], updated);
    }
  };

  return (
    <>
      {/* comment trigger sandbox */}
      <div className="">
        {renderHeader("comment_section", "Interactive Comment DM Simulator Sandbox")}
        {isOpenComment && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["comment_section", "badge"], "Sandbox Badge", "Interactive Simulator")}
              {renderTextInput(["comment_section", "title"], "Sandbox Title", "Test comment-to-DM flow")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["comment_section", "subtitle"], "Sandbox Subtitle", "Try typing keywords")}
              {renderTextInput(["comment_section", "card_title"], "Sandbox Input Box Title", "Configure comment trigger")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderMediaUploadInput(["comment_section", "gif"], "Simulator Mockup GIF/Image")}
            </div>
            {renderStringArrayInput(["comment_section", "keywords"], "Trigger Keyword Options")}
            {renderStringArrayInput(["comment_section", "bullets"], "Simulated Execution Log Statements")}
          </div>
        )}
      </div>

      {/* features */}
      <div className="">
        {renderHeader("features", "Instagram Capabilities List")}
        {isOpenFeatures && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["features", "badge"], "Capabilities Badge", "Features")}
              {renderTextInput(["features", "title"], "Capabilities Main Title", "Grow Your Brand on Instagram Automatically")}
            </div>
            <label className={labelClass}>Capabilities Details</label>
            {featList.map((feat: any, idx: number) => (
              <div key={idx} className="sm:p-5 p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                <Button
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </Button>
                <div className="text-xs font-black text-slate-450 uppercase font-bold">CAPABILITY #{idx + 1}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Badge</Label>
                    <Input
                      type="text"
                      value={feat?.badge || ""}
                      onChange={(e) => handleFeatChange(idx, "badge", e.target.value)}
                      placeholder="e.g. Boost Sales"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Feature Title</Label>
                    <Input
                      type="text"
                      value={feat?.title || ""}
                      onChange={(e) => handleFeatChange(idx, "title", e.target.value)}
                      placeholder="e.g. Reply Instantly"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <Label className="block text-xs font-bold text-slate-650 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Image Asset</Label>
                    <PageMediaUploadField
                      value={feat?.image || ""}
                      onChange={(uploadedUrl) => handleFeatChange(idx, "image", uploadedUrl)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddFeature}
              className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Capability
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
