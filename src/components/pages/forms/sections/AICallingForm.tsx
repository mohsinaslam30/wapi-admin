/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Textarea } from "@/src/elements/ui/textarea";
import { SharedFormProps } from "@/src/types/landingPage";
import { Plus, Trash2 } from "lucide-react";
import React from "react";

export const AICallingForm: React.FC<SharedFormProps> = ({
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
  const isOpenCapabilities = activeSection === "capabilities";
  const isOpenFaq = activeSection === "faqs";

  // Capabilities Section Features
  const featList = Array.isArray(data.capabilities?.features)
    ? data.capabilities.features
    : [];
  const handleFeatChange = (idx: number, field: string, val: string) => {
    const updated = [...featList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["capabilities", "features"], updated);
  };
  const handleAddFeature = () => {
    updateField(
      ["capabilities", "features"],
      [...featList, { title: "", description: "", example: "" }],
    );
  };
  const handleRemoveFeature = (idx: number) => {
    const updated = [...featList];
    updated.splice(idx, 1);
    updateField(["capabilities", "features"], updated);
  };

  // FAQ Section Items
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
      {/* 1. Hero Section Accordion */}
      <div className="rounded-t-lg overflow-hidden">
        {renderHeader("hero", "Hero Section Layout")}
        {isOpenHero && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(
                ["hero", "badge"],
                "Hero Badge Text",
                "e.g. WhatsApp Call Agent",
              )}
              {renderTextInput(
                ["hero", "title"],
                "Hero Title",
                "e.g. Automate Voice Calls with AI Call Agents",
              )}
            </div>
            <div className="w-full">
              <Label className={labelClass}>Hero Subtitle</Label>
              <Textarea
                value={data?.hero?.subtitle || ""}
                onChange={(e) =>
                  updateField(["hero", "subtitle"], e.target.value)
                }
                placeholder="Sub-headline explaining the value proposition..."
                rows={3}
                className={`${inputClass} resize-none min-h-25!`}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(
                ["hero", "button_text"],
                "Primary Button Text",
                "Get Started Free",
              )}
              {renderTextInput(
                ["hero", "button_url"],
                "Primary Button URL",
                "/auth/signup",
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderMediaUploadInput(
                ["hero", "side_image"],
                "Side Image/GIF Asset",
              )}
            </div>
            {renderStringArrayInput(
              ["hero", "bullet_points"],
              "Hero Bullet Points (Trust Indicators)",
            )}
          </div>
        )}
      </div>

      {/* 2. Capabilities Section Accordion */}
      <div>
        {renderHeader("capabilities", "Voice Agent Capabilities Grid")}
        {isOpenCapabilities && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(
                ["capabilities", "badge"],
                "Capabilities Badge",
                "PLATFORM FEATURES",
              )}
              {renderTextInput(
                ["capabilities", "title"],
                "Capabilities Main Title",
                "Voice Agent Capabilities",
              )}
              {renderTextInput(
                ["capabilities", "subtitle"],
                "Capabilities Subtitle",
                "Core WhatsApp voice calling features",
              )}
            </div>

            <div className="space-y-6 mt-4">
              <label className={labelClass}>Feature Capabilities List</label>
              {featList.map((feat: any, idx: number) => (
                <div
                  key={idx}
                  className="sm:p-5 p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative"
                >
                  <Button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-450 uppercase font-bold">
                    CAPABILITY #{idx + 1}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-slate-650">
                        Feature Title
                      </Label>
                      <Input
                        type="text"
                        value={feat?.title || ""}
                        onChange={(e) =>
                          handleFeatChange(idx, "title", e.target.value)
                        }
                        placeholder="e.g. AI Knowledge Training"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-650">
                        Example Bullet Statement
                      </Label>
                      <Input
                        type="text"
                        value={feat?.example || ""}
                        onChange={(e) =>
                          handleFeatChange(idx, "example", e.target.value)
                        }
                        placeholder="e.g. Example: Restaurant agent answering menu..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">
                      Feature Description
                    </Label>
                    <Textarea
                      value={feat?.description || ""}
                      onChange={(e) =>
                        handleFeatChange(idx, "description", e.target.value)
                      }
                      placeholder="Feature details description..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={handleAddFeature}
              className="flex h-11 max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Feature Card
            </Button>
          </div>
        )}
      </div>

      {/* 3. FAQs Accordions Section */}
      <div className="rounded-b-2xl overflow-hidden">
        {renderHeader("faqs", "Frequently Asked Questions Accordions")}
        {isOpenFaq && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["faqs", "badge"], "FAQs Badge", "FAQs")}
              {renderTextInput(
                ["faqs", "title"],
                "FAQs Section Title",
                "Frequently Asked Questions",
              )}
            </div>

            <div className="space-y-6 mt-4">
              <Label className={labelClass}>FAQ Items</Label>
              {faqList.map((faq: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative"
                >
                  <Button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-450 uppercase font-bold mb-2">
                    FAQ ITEM #{idx + 1}
                  </div>
                  <div className="grid grid-cols-1 gap-3 pr-14 sm:pr-14 max-w-full">
                    <div>
                      <Label className="text-xs font-bold text-slate-650">
                        Question
                      </Label>
                      <Input
                        type="text"
                        value={faq?.question || ""}
                        onChange={(e) =>
                          handleFaqChange(idx, "question", e.target.value)
                        }
                        placeholder="e.g. Which AI Models are supported?"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-650">
                        Answer
                      </Label>
                      <Textarea
                        value={faq?.answer || ""}
                        onChange={(e) =>
                          handleFaqChange(idx, "answer", e.target.value)
                        }
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
