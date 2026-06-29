/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageMediaUploadField } from "../PageMediaUploadField";
import { SharedFormProps } from "@/src/types/landingPage";

export const CtwaForm: React.FC<SharedFormProps> = ({
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
  const isOpenHero = activeSection === "hero";
  const isOpenStructure = activeSection === "structure";
  const isOpenFeatures = activeSection === "features";
  const isOpenStepsLaunch = activeSection === "steps_launch";
  const isOpenFaq = activeSection === "faqs";

  // Structure Steps List
  const structureSteps = Array.isArray(data.structure?.steps) ? data.structure.steps : [];
  const handleStructureStepChange = (idx: number, field: string, val: string) => {
    const updated = [...structureSteps];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["structure", "steps"], updated);
  };
  const handleAddStructureStep = () => {
    updateField(["structure", "steps"], [...structureSteps, { title: "", description: "" }]);
  };
  const handleRemoveStructureStep = (idx: number) => {
    const updated = [...structureSteps];
    updated.splice(idx, 1);
    updateField(["structure", "steps"], updated);
  };

  // Features List
  const featuresItems = Array.isArray(data.features?.items) ? data.features.items : [];
  const handleFeatureChange = (idx: number, field: string, val: string) => {
    const updated = [...featuresItems];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["features", "items"], updated);
  };
  const handleAddFeature = () => {
    updateField(["features", "items"], [...featuresItems, { icon: "Layers", title: "", description: "", image: "" }]);
  };
  const handleRemoveFeature = (idx: number) => {
    const updated = [...featuresItems];
    updated.splice(idx, 1);
    updateField(["features", "items"], updated);
  };

  // Steps Launch Wizard List
  const launchSteps = Array.isArray(data.steps_launch?.steps) ? data.steps_launch.steps : [];
  const handleLaunchStepChange = (idx: number, field: string, val: string) => {
    const updated = [...launchSteps];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["steps_launch", "steps"], updated);
  };
  const handleAddLaunchStep = () => {
    updateField(["steps_launch", "steps"], [...launchSteps, { title: "", description: "" }]);
  };
  const handleRemoveLaunchStep = (idx: number) => {
    const updated = [...launchSteps];
    updated.splice(idx, 1);
    updateField(["steps_launch", "steps"], updated);
  };

  // FAQs List
  const faqList = Array.isArray(data.faqs?.items) ? data.faqs.items : [];
  const handleFaqChange = (idx: number, field: string, val: string) => {
    const updated = [...faqList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["faqs", "items"], updated);
  };
  const handleAddFaq = () => {
    updateField(["faqs", "items"], [...faqList, { question: "", answer: "" }]);
  };
  const handleRemoveFaq = (idx: number) => {
    const updated = [...faqList];
    updated.splice(idx, 1);
    updateField(["faqs", "items"], updated);
  };

  return (
    <div className="bg-white dark:bg-(--card-color) rounded-2xl border border-gray-100 dark:border-(--card-border-color) shadow-sm divide-y divide-gray-100 dark:divide-(--card-border-color)">
      {/* 1. Hero Section */}
      <div className="rounded-t-2xl overflow-hidden">
        {renderHeader("hero", "Hero Section Layout")}
        {isOpenHero && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["hero", "badge"], "Hero Badge Text", "e.g. Click to WhatsApp Ads")}
              {renderTextInput(["hero", "title"], "Hero Title", "e.g. Turn Facebook & Instagram ads into live WhatsApp conversations")}
            </div>
            <div className="w-full">
              <label className={labelClass}>Hero Description</label>
              <textarea
                value={data?.hero?.description || ""}
                onChange={(e) => updateField(["hero", "description"], e.target.value)}
                placeholder="Overview details explaining the value proposition..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["hero", "button_text"], "Primary Button Text", "Launch Your First Campaign")}
              {renderTextInput(["hero", "button_url"], "Primary Button URL", "/auth/signup")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderMediaUploadInput(["hero", "image"], "Side Graphic / Flow Mockup Image")}
            </div>
            {renderStringArrayInput(["hero", "bullets"], "Hero Trust Indicators (Bullet Points)")}
          </div>
        )}
      </div>

      {/* 2. Campaign Structure Section */}
      <div>
        {renderHeader("structure", "Campaign Structure Section")}
        {isOpenStructure && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["structure", "badge"], "Section Badge", "Structure")}
              {renderTextInput(["structure", "title"], "Section Title", "Campaign hierarchy, visualized")}
              {renderTextInput(["structure", "subtitle"], "Section Subtitle", "Three levels that define your ad strategy")}
            </div>

            <div className="space-y-4 mt-4">
              <label className={labelClass}>Structure Steps</label>
              {structureSteps.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveStructureStep(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold">LEVEL #{idx + 1}</div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400">Step Title</label>
                    <input
                      type="text"
                      value={step?.title || ""}
                      onChange={(e) => handleStructureStepChange(idx, "title", e.target.value)}
                      placeholder="e.g. Campaigns"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400">Step Description</label>
                    <textarea
                      value={step?.description || ""}
                      onChange={(e) => handleStructureStepChange(idx, "description", e.target.value)}
                      placeholder="Details about this step..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddStructureStep}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Level Card
            </button>
          </div>
        )}
      </div>

      {/* 3. Features Section */}
      <div>
        {renderHeader("features", "Features List")}
        {isOpenFeatures && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["features", "badge"], "Section Badge", "Features")}
              {renderTextInput(["features", "title"], "Section Title", "Built for campaign success")}
            </div>

            <div className="space-y-4 mt-4">
              <label className={labelClass}>Feature Items</label>
              {featuresItems.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold">FEATURE #{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Title</label>
                      <input
                        type="text"
                        value={item?.title || ""}
                        onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                        placeholder="e.g. Asset Synchronization"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Icon Name (lucide-react)</label>
                      <input
                        type="text"
                        value={item?.icon || ""}
                        onChange={(e) => handleFeatureChange(idx, "icon", e.target.value)}
                        placeholder="e.g. Layers, Compass, Users, Palette..."
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-650 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Feature Image (optional)</label>
                      <PageMediaUploadField
                        value={item?.image || ""}
                        onChange={(uploadedUrl) => handleFeatureChange(idx, "image", uploadedUrl)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400">Description</label>
                    <textarea
                      value={item?.description || ""}
                      onChange={(e) => handleFeatureChange(idx, "description", e.target.value)}
                      placeholder="Brief details about this feature..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddFeature}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Feature Card
            </button>
          </div>
        )}
      </div>

      {/* 4. Wizard Steps Launch Section */}
      <div>
        {renderHeader("steps_launch", "Wizard Steps Launch Section")}
        {isOpenStepsLaunch && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["steps_launch", "badge"], "Section Badge", "Wizard")}
              {renderTextInput(["steps_launch", "title"], "Section Title", "Three simple steps to launch")}
            </div>
            <div className="w-full">
              <label className={labelClass}>Section Description</label>
              <textarea
                value={data?.steps_launch?.description || ""}
                onChange={(e) => updateField(["steps_launch", "description"], e.target.value)}
                placeholder="Launch process overview details..."
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="space-y-4 mt-4">
              <label className={labelClass}>Wizard Steps</label>
              {launchSteps.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveLaunchStep(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold">WIZARD STEP #{idx + 1}</div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400">Step Title</label>
                    <input
                      type="text"
                      value={step?.title || ""}
                      onChange={(e) => handleLaunchStepChange(idx, "title", e.target.value)}
                      placeholder="e.g. Campaign Setup"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400">Step Description</label>
                    <textarea
                      value={step?.description || ""}
                      onChange={(e) => handleLaunchStepChange(idx, "description", e.target.value)}
                      placeholder="Details about what to do in this wizard step..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddLaunchStep}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Wizard Step
            </button>
          </div>
        )}
      </div>

      {/* 5. FAQs Section */}
      <div className="rounded-b-2xl overflow-hidden">
        {renderHeader("faqs", "Frequently Asked Questions")}
        {isOpenFaq && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["faqs", "badge"], "FAQs Badge", "FAQs")}
              {renderTextInput(["faqs", "title"], "FAQs Section Title", "Click to WhatsApp Ads — common questions")}
            </div>
            <div className="space-y-4 mt-4">
              <label className={labelClass}>FAQ Items</label>
              {faqList.map((faq: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold mb-2">FAQ ITEM #{idx + 1}</div>
                  <div className="grid grid-cols-1 gap-3 max-w-[90%]">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Question</label>
                      <input
                        type="text"
                        value={faq?.question || ""}
                        onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                        placeholder="e.g. What is Click to WhatsApp Ads?"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Answer</label>
                      <textarea
                        value={faq?.answer || ""}
                        onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                        placeholder="FAQ answer text..."
                        rows={2}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddFaq}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add FAQ Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
