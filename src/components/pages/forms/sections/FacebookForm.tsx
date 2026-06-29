/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageMediaUploadField } from "../PageMediaUploadField";
import { SharedFormProps } from "@/src/types/landingPage";
import { Button } from "@/src/elements/ui/button";
import { Label } from "@/src/elements/ui/label";
import { Input } from "@/src/elements/ui/input";
import { Textarea } from "@/src/elements/ui/textarea";

export const FacebookForm: React.FC<SharedFormProps> = ({
  data,
  updateField,
  renderHeader,
  renderTextInput,
  activeSection,
  labelClass,
  inputClass,
}) => {
  const isOpenFeatures = activeSection === "features";
  const isOpenTools = activeSection === "tools";

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

  // Tools List
  const toolList = Array.isArray(data.tools?.tools) ? data.tools.tools : [];
  const handleToolChange = (idx: number, field: string, val: string) => {
    const updated = [...toolList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["tools", "tools"], updated);
  };
  const handleAddTool = () => {
    updateField(
      ["tools", "tools"],
      [...toolList, { icon: "", title: "", description: "" }]
    );
  };
  const handleRemoveTool = (idx: number) => {
    const updated = [...toolList];
    updated.splice(idx, 1);
    updateField(["tools", "tools"], updated);
  };

  return (
    <>
      {/* zig-zag features */}
      <div className="">
        {renderHeader("features", "Facebook Zig-zag Features")}
        {isOpenFeatures && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["features", "badge"], "Features Section Badge", "Core Features")}
              {renderTextInput(["features", "title"], "Features Section Title", "Grow Your Facebook Page Automatically")}
              {renderTextInput(["features", "subtitle"], "Features Section Subtitle", "Manage conversations")}
            </div>

            <div className="space-y-6 mt-4">
              <Label className={labelClass}>Features List</Label>
              {featList.map((feat: any, idx: number) => (
                <div key={idx} className="sm:p-5 p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                  <Button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-450 uppercase font-bold">FEATURE #{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Badge</Label>
                      <Input
                        type="text"
                        value={feat?.badge || ""}
                        onChange={(e) => handleFeatChange(idx, "badge", e.target.value)}
                        placeholder="e.g. Pages Connection"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Title</Label>
                      <Input
                        type="text"
                        value={feat?.title || ""}
                        onChange={(e) => handleFeatChange(idx, "title", e.target.value)}
                        placeholder="e.g. Link Your Pages"
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
                        placeholder="Description details..."
                        rows={2}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-650 dark:text-gray-400 mb-1.5">Image Asset</label>
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
                <Plus size={14} /> Add Zig-zag Feature
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* tools pills */}
      <div className="">
        {renderHeader("tools", "Facebook Tools Pills Grid")}
        {isOpenTools && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["tools", "badge"], "Tools Section Badge", "Complete Tools")}
              {renderTextInput(["tools", "title"], "Tools Section Title", "Built-In Page & Message Tools")}
              {renderTextInput(["tools", "sub_title"], "Tools Section Subtitle", "Every tool you need")}
            </div>

            <div className="space-y-6 mt-4">
              <Label className={labelClass}>Tools Details</Label>
              {toolList.map((tool: any, idx: number) => (
                <div key={idx} className="p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative">
                  <Button
                    type="button"
                    onClick={() => handleRemoveTool(idx)}
                    className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={15} />
                  </Button>
                  <div className="text-xs font-black text-slate-450 uppercase font-bold mb-2">TOOL #{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-14 sm:pr-14">
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Lucide Icon Name</Label>
                      <Input
                        type="text"
                        value={tool?.icon || ""}
                        onChange={(e) => handleToolChange(idx, "icon", e.target.value)}
                        placeholder="e.g. Inbox, Tag, BarChart2"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Tool Title</Label>
                      <Input
                        type="text"
                        value={tool?.title || ""}
                        onChange={(e) => handleToolChange(idx, "title", e.target.value)}
                        placeholder="e.g. Unified Inbox"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="mt-2 pr-14 sm:pr-14">
                    <Label className="text-xs font-bold text-slate-650">Tool Description</Label>
                    <Input
                      type="text"
                      value={tool?.description || ""}
                      onChange={(e) => handleToolChange(idx, "description", e.target.value)}
                      placeholder="Tool description..."
                      className={inputClass}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={handleAddTool}
                className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
              >
                <Plus size={14} /> Add Tool Card
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
