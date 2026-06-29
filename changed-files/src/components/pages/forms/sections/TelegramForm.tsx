/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageMediaUploadField } from "../PageMediaUploadField";
import { SharedFormProps } from "@/src/types/landingPage";
import { Label } from "@/src/elements/ui/label";
import { Textarea } from "@/src/elements/ui/textarea";
import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";

export const TelegramForm: React.FC<SharedFormProps> = ({
  data,
  updateField,
  renderHeader,
  renderTextInput,
  activeSection,
  labelClass,
  inputClass,
}) => {
  const isOpenFeatures = activeSection === "features";

  // Features list
  const featList = Array.isArray(data.features?.features) ? data.features.features : [];
  const handleFeatChange = (idx: number, field: string, val: string) => {
    const updated = [...featList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["features", "features"], updated);
  };
  const handleAddFeature = () => {
    updateField(
      ["features", "features"],
      [...featList, { badge: "", title: "", description: "", image: "" }]
    );
  };
  const handleRemoveFeature = (idx: number) => {
    const updated = [...featList];
    updated.splice(idx, 1);
    updateField(["features", "features"], updated);
  };

  return (
    <div className="">
      {renderHeader("features", "Telegram Bento Grid Features")}
      {isOpenFeatures && (
        <div className="sm:p-5 p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderTextInput(["features", "badge"], "Features Badge", "Built-In Features")}
            {renderTextInput(["features", "title"], "Features Title", "Powerful Features Simple")}
            {renderTextInput(["features", "subtitle"], "Features Subtitle", "Manage chats in real-time")}
          </div>

          <div className="space-y-6 mt-4">
            <label className={labelClass}>Bento Cells Details</label>
            {featList.map((feat: any, idx: number) => (
              <div key={idx} className="sm:p-5 p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                <Button
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </Button>
                <div className="text-xs font-black text-slate-455 uppercase font-bold">CELL #{idx + 1}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Badge</Label>
                    <Input
                      type="text"
                      value={feat?.badge || ""}
                      onChange={(e) => handleFeatChange(idx, "badge", e.target.value)}
                      placeholder="e.g. Quick Connection"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Title</Label>
                    <Input
                      type="text"
                      value={feat?.title || ""}
                      onChange={(e) => handleFeatChange(idx, "title", e.target.value)}
                      placeholder="e.g. Easy Account Setup"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Description</Label>
                    <Textarea
                      value={feat?.description || ""}
                      onChange={(e) => handleFeatChange(idx, "description", e.target.value)}
                      placeholder="Cell details..."
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
              <Plus size={14} /> Add Cell Card
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
