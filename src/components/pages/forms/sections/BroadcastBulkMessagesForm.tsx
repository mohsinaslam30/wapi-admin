/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageMediaUploadField } from "../PageMediaUploadField";
import { SharedFormProps } from "@/src/types/landingPage";
import { Textarea } from "@/src/elements/ui/textarea";
import { Label } from "@/src/elements/ui/label";
import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";

export const BroadcastBulkMessagesForm: React.FC<SharedFormProps> = ({
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
  const isOpenHeroBroadcast = activeSection === "hero";
  const isOpenCampaign = activeSection === "campaign_settings";
  const isOpenTemplateTypes = activeSection === "template_types";
  const isOpenFaq = activeSection === "faqs";

  // Campaign Settings Features
  const campaignFeatures = Array.isArray(data.campaign_settings?.features) ? data.campaign_settings.features : [];
  const handleCampaignFeatureChange = (idx: number, field: string, val: string) => {
    const updated = [...campaignFeatures];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["campaign_settings", "features"], updated);
  };
  const handleAddCampaignFeature = () => {
    updateField(["campaign_settings", "features"], [...campaignFeatures, { title: "", description: "" }]);
  };
  const handleRemoveCampaignFeature = (idx: number) => {
    const updated = [...campaignFeatures];
    updated.splice(idx, 1);
    updateField(["campaign_settings", "features"], updated);
  };

  // Template Types
  const templateTypes = Array.isArray(data.template_types?.types) ? data.template_types.types : [];
  const handleTemplateTypeChange = (idx: number, field: string, val: string) => {
    const updated = [...templateTypes];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["template_types", "types"], updated);
  };
  const handleAddTemplateType = () => {
    updateField(["template_types", "types"], [...templateTypes, { title: "", description: "", icon: "", image: "" }]);
  };
  const handleRemoveTemplateType = (idx: number) => {
    const updated = [...templateTypes];
    updated.splice(idx, 1);
    updateField(["template_types", "types"], updated);
  };

  // FAQs
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
    <div className="bg-white dark:bg-(--card-color) rounded-lg border border-gray-100 dark:border-(--card-border-color) shadow-sm divide-y divide-gray-100 dark:divide-(--card-border-color)">
      {/* 1. Hero Section */}
      <div className="rounded-t-lg overflow-hidden">
        {renderHeader("hero", "Hero Section Layout")}
        {isOpenHeroBroadcast && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["hero", "badge"], "Hero Badge Text", "e.g. BROADCAST CAMPAIGNS")}
              {renderTextInput(["hero", "title"], "Hero Title", "e.g. Broadcast Official WhatsApp Messages to Thousands")}
            </div>
            <div className="w-full">
              <Label className={labelClass}>Hero Subtitle</Label>
              <Textarea
                value={data?.hero?.subtitle || ""}
                onChange={(e) => updateField(["hero", "subtitle"], e.target.value)}
                placeholder="Sub-headline explaining the value proposition..."
                rows={3}
                className={`${inputClass} resize-none min-h-25!`}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["hero", "button_text"], "Primary Button Text", "Start Broadcasting Free")}
              {renderTextInput(["hero", "button_url"], "Primary Button URL", "/auth/signup")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderMediaUploadInput(["hero", "side_image"], "Side Image/GIF Asset")}
            </div>
            {renderStringArrayInput(["hero", "bullet_points"], "Hero Bullet Points (Trust Indicators)")}
          </div>
        )}
      </div>

      {/* 2. Campaign Settings Section */}
      <div>
        {renderHeader("campaign_settings", "Campaign Settings Features Grid")}
        {isOpenCampaign && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["campaign_settings", "badge"], "Section Badge", "Campaign Settings")}
              {renderTextInput(["campaign_settings", "title"], "Section Title", "High-Converting WhatsApp Marketing Campaign Features")}
              {renderTextInput(["campaign_settings", "subtitle"], "Section Subtitle", "Connect templates and segmented subscriber lists...")}
            </div>
            <div className="space-y-4 mt-4">
              <label className={labelClass}>Campaign Features List</label>
              {campaignFeatures.map((feat: any, idx: number) => (
                <div key={idx} className="sm:p-5 p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                  <Button
                    type="button"
                    onClick={() => handleRemoveCampaignFeature(idx)}
                    className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold">FEATURE #{idx + 1}</div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Feature Title</Label>
                    <Input
                      type="text"
                      value={feat?.title || ""}
                      onChange={(e) => handleCampaignFeatureChange(idx, "title", e.target.value)}
                      placeholder="e.g. Meta Approved Templates"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Feature Description</Label>
                    <Textarea
                      value={feat?.description || ""}
                      onChange={(e) => handleCampaignFeatureChange(idx, "description", e.target.value)}
                      placeholder="Feature details..."
                      rows={2}
                      className={`${inputClass} resize-none min-h-25!`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={handleAddCampaignFeature}
              className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Campaign Feature
            </Button>
          </div>
        )}
      </div>

      {/* 3. Template Types Section */}
      <div>
        {renderHeader("template_types", "Marketing Template Types")}
        {isOpenTemplateTypes && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["template_types", "badge"], "Section Badge", "Template Builder")}
              {renderTextInput(["template_types", "title"], "Section Title", "Marketing Template Types")}
              {renderTextInput(["template_types", "description"], "Section Description", "Choose the type of marketing experience to deliver.")}
            </div>
            <div className="space-y-4 mt-4">
              <Label className={labelClass}>Template Types</Label>
              {templateTypes.map((type: any, idx: number) => (
                <div key={idx} className="sm:p-5 p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                  <Button
                    type="button"
                    onClick={() => handleRemoveTemplateType(idx)}
                    className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold">TYPE #{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Type Title</Label>
                      <Input
                        type="text"
                        value={type?.title || ""}
                        onChange={(e) => handleTemplateTypeChange(idx, "title", e.target.value)}
                        placeholder="e.g. Standard"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Icon Name (lucide-react)</Label>
                      <Input
                        type="text"
                        value={type?.icon || ""}
                        onChange={(e) => handleTemplateTypeChange(idx, "icon", e.target.value)}
                        placeholder="e.g. Tag, Gift, Ticket, Phone..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Type Description</Label>
                    <Textarea
                      value={type?.description || ""}
                      onChange={(e) => handleTemplateTypeChange(idx, "description", e.target.value)}
                      placeholder="Describe this template type..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div>
                    <PageMediaUploadField
                      label="Type Preview Image (optional)"
                      value={type?.image || ""}
                      onChange={(url) => handleTemplateTypeChange(idx, "image", url)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={handleAddTemplateType}
              className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Template Type
            </Button>
          </div>
        )}
      </div>

      {/* 4. FAQs Section */}
      <div className="rounded-b-2xl overflow-hidden">
        {renderHeader("faqs", "Frequently Asked Questions")}
        {isOpenFaq && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["faqs", "badge"], "FAQs Badge", "FAQs")}
              {renderTextInput(["faqs", "title"], "FAQs Section Title", "Got Questions about Broadcast Campaigns?")}
            </div>
            <div className="space-y-4 mt-4">
              <Label className={labelClass}>FAQ Items</Label>
              {faqList.map((faq: any, idx: number) => (
                <div key={idx} className="p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative">
                  <Button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold mb-2">FAQ ITEM #{idx + 1}</div>
                  <div className="grid grid-cols-1 gap-3 pr-14 sm:pr-14 max-w-full">
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Question</Label>
                      <Input
                        type="text"
                        value={faq?.question || ""}
                        onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                        placeholder="e.g. What is the difference between Utility and Marketing templates?"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Answer</Label>
                      <Textarea
                        value={faq?.answer || ""}
                        onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                        placeholder="FAQ answer text..."
                        rows={2}
                        className={`${inputClass} resize-none min-h-25!`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={handleAddFaq}
              className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add FAQ Question
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
