/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageMediaUploadField } from "../PageMediaUploadField";
import { SharedFormProps } from "@/src/types/landingPage";
import { Button } from "@/src/elements/ui/button";
import { Label } from "@/src/elements/ui/label";
import { Input } from "@/src/elements/ui/input";
import { Textarea } from "@/src/elements/ui/textarea";

export const SharedInboxForm: React.FC<SharedFormProps> = ({
  data,
  updateField,
  renderHeader,
  renderTextInput,
  activeSection,
  labelClass,
  inputClass,
  renderStringArrayInput,
}) => {
  const isOpenHero = activeSection === "hero";
  const isOpenSandbox = activeSection === "sandbox";
  const isOpenFeatures = activeSection === "features";
  const isOpenTeam = activeSection === "team";
  const isOpenCounter = activeSection === "counter";
  const isOpenFaq = activeSection === "faqs";

  // Dynamic arrays
  const featureCards = Array.isArray(data.features?.cards) ? data.features.cards : [];
  const handleFeatureCardChange = (idx: number, field: string, val: string) => {
    const updated = [...featureCards];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["features", "cards"], updated);
  };
  const handleAddFeatureCard = () => {
    updateField(["features", "cards"], [...featureCards, { icon: "Sparkles", title: "", description: "" }]);
  };
  const handleRemoveFeatureCard = (idx: number) => {
    const updated = [...featureCards];
    updated.splice(idx, 1);
    updateField(["features", "cards"], updated);
  };

  const teamCards = Array.isArray(data.team?.cards) ? data.team.cards : [];
  const handleTeamCardChange = (idx: number, field: string, val: string) => {
    const updated = [...teamCards];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["team", "cards"], updated);
  };
  const handleAddTeamCard = () => {
    updateField(["team", "cards"], [...teamCards, { icon: "Sparkles", title: "", description: "" }]);
  };
  const handleRemoveTeamCard = (idx: number) => {
    const updated = [...teamCards];
    updated.splice(idx, 1);
    updateField(["team", "cards"], updated);
  };

  const counterList = Array.isArray(data.counter?.counters) ? data.counter.counters : [];
  const handleCounterChange = (idx: number, field: string, val: string) => {
    const updated = [...counterList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["counter", "counters"], updated);
  };
  const handleAddCounter = () => {
    updateField(["counter", "counters"], [...counterList, { counts: "", title: "", description: "" }]);
  };
  const handleRemoveCounter = (idx: number) => {
    const updated = [...counterList];
    updated.splice(idx, 1);
    updateField(["counter", "counters"], updated);
  };

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
      {/* 1. Hero Accordion */}
      <div className="rounded-t-lg overflow-hidden">
        {renderHeader("hero", "Hero Section Layout")}
        {isOpenHero && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["hero", "badge"], "Hero Badge", "Omnichannel Team Hub")}
              {renderTextInput(["hero", "title"], "Hero Title", "One Unified Shared Inbox for Collaboration")}
            </div>
            <div className="w-full">
              <Label className={labelClass}>Hero Subtitle</Label>
              <Textarea
                value={data?.hero?.subtitle || ""}
                onChange={(e) => updateField(["hero", "subtitle"], e.target.value)}
                placeholder="Describe the value proposition..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="w-full">
              <PageMediaUploadField
                label="Hero Mockup Image (Optional — replaces default visual mockup)"
                value={data?.hero?.image || ""}
                onChange={(url) => updateField(["hero", "image"], url)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["hero", "button_text"], "Primary Button Text", "Start Free Trial")}
              {renderTextInput(["hero", "button_url"], "Primary Button URL", "/auth/signup")}
            </div>
            {renderStringArrayInput(["hero", "bullets"], "Hero Bullets / Key Points")}
          </div>
        )}
      </div>

      {/* 2. Sandbox Accordion */}
      <div>
        {renderHeader("sandbox", "Interactive Sandbox Section")}
        {isOpenSandbox && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["sandbox", "badge"], "Sandbox Badge", "Interactive Sandbox")}
              {renderTextInput(["sandbox", "title"], "Sandbox Title", "Take the Team Inbox for a Test Drive")}
            </div>
            <div className="w-full">
              <Label className={labelClass}>Sandbox Subtitle</Label>
              <Textarea
                value={data?.sandbox?.subtitle || ""}
                onChange={(e) => updateField(["sandbox", "subtitle"], e.target.value)}
                placeholder="Click agent assignments, generate replies..."
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="w-full">
              <PageMediaUploadField
                label="Sandbox Screenshot / Image (Optional — overrides interactive mockup completely)"
                value={data?.sandbox?.image || ""}
                onChange={(url) => updateField(["sandbox", "image"], url)}
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Features Accordion */}
      <div>
        {renderHeader("features", "Core Features Grid")}
        {isOpenFeatures && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["features", "badge"], "Features Badge", "Engineered for Results")}
              {renderTextInput(["features", "title"], "Features Title", "Everything You Need to Automate Customer Success")}
            </div>
            <div className="space-y-6 mt-4 flex flex-col">
              <Label className={labelClass}>Feature Cards</Label>
              <div className="grid grid-cols-1 gap-4">
                {featureCards.map((card: any, idx: number) => (
                  <div key={idx} className="sm:p-5 p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative space-y-3">
                    <Button
                      type="button"
                      onClick={() => handleRemoveFeatureCard(idx)}
                      className="absolute bg-[unset] w-10 h-10  shadow-xs top-4 dark:hover:bg-red-900/20 right-4 rtl:right-[unset] rtl:left-4 p-1.5! text-red-500 hover:bg-red-50 rounded-lg dark:bg-(--page-body-bg)"
                    >
                      <Trash2 size={16} />
                    </Button>
                    <div className="text-xs font-black text-slate-455 uppercase font-bold">CARD #{idx + 1}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-bold text-slate-650">Card Title</Label>
                        <Input
                          type="text"
                          value={card?.title || ""}
                          onChange={(e) => handleFeatureCardChange(idx, "title", e.target.value)}
                          placeholder="e.g. Smart Agent Routing"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-650">Icon Name (Lucide)</Label>
                        <Input
                          type="text"
                          value={card?.icon || ""}
                          onChange={(e) => handleFeatureCardChange(idx, "icon", e.target.value)}
                          placeholder="e.g. Users, Brain, Inbox"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Card Description</Label>
                      <Textarea
                        value={card?.description || ""}
                        onChange={(e) => handleFeatureCardChange(idx, "description", e.target.value)}
                        placeholder="Describe this feature..."
                        rows={2}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={handleAddFeatureCard}
                className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white hover:bg-(--text-green-primary)! items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
              >
                <Plus size={14} /> Add Feature Card
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Team Accordion */}
      <div>
        {renderHeader("team", "Behind the Scenes / Team Collaboration")}
        {isOpenTeam && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["team", "badge"], "Team Badge", "Team Collaboration")}
              {renderTextInput(["team", "title"], "Team Title", "Build Better Collaborations Behind the Scenes")}
            </div>
            <div className="w-full">
              <Label className={labelClass}>Section Description</Label>
              <Textarea
                value={data?.team?.description || ""}
                onChange={(e) => updateField(["team", "description"], e.target.value)}
                placeholder="Explain how team collaboration works..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="w-full">
              <PageMediaUploadField
                label="Side Graphic Image (Optional)"
                value={data?.team?.side_image || ""}
                onChange={(url) => updateField(["team", "side_image"], url)}
              />
            </div>
            <div className="space-y-6 mt-4">
              <Label className={labelClass}>Team Collaboration Cards</Label>
              <div className="grid grid-cols-1 gap-4">
                {teamCards.map((card: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative space-y-3">
                    <Button
                      type="button"
                      onClick={() => handleRemoveTeamCard(idx)}
                      className="absolute bg-[unset] h-[unset] dark:bg-(--page-body-bg) shadow-xs w-10 h-10 dark:hover:bg-red-900/20! top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5! text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </Button>
                    <div className="text-xs font-black text-slate-455 uppercase font-bold">CARD #{idx + 1}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-bold text-slate-650">Card Title</Label>
                        <Input
                          type="text"
                          value={card?.title || ""}
                          onChange={(e) => handleTeamCardChange(idx, "title", e.target.value)}
                          placeholder="e.g. Prevent Collision"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-650">Icon Name (Lucide)</Label>
                        <Input
                          type="text"
                          value={card?.icon || ""}
                          onChange={(e) => handleTeamCardChange(idx, "icon", e.target.value)}
                          placeholder="e.g. Layers, Tag"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Card Description</Label>
                      <Textarea
                        value={card?.description || ""}
                        onChange={(e) => handleTeamCardChange(idx, "description", e.target.value)}
                        placeholder="Describe this coordination feature..."
                        rows={2}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={handleAddTeamCard}
                className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white hover:bg-(--text-green-primary)! items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
              >
                <Plus size={14} /> Add Collaboration Card
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 5. Counter Accordion */}
      <div>
        {renderHeader("counter", "Performance Impact metrics")}
        {isOpenCounter && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["counter", "badge"], "Counter Badge", "Performance Impact")}
              {renderTextInput(["counter", "title"], "Counter Title", "Grow Your Business on Solid Numbers")}
            </div>
            <div className="w-full">
              <Label className={labelClass}>Counter Subtitle</Label>
              <Textarea
                value={data?.counter?.subtitle || ""}
                onChange={(e) => updateField(["counter", "subtitle"], e.target.value)}
                placeholder="Describe metric highlights..."
                rows={2}
                className={`${inputClass} resize-none min-h-25!`}
              />
            </div>
            <div className="space-y-6 mt-4">
              <label className={labelClass}>Metric Counters</label>
              <div className="grid grid-cols-1 gap-4">
                {counterList.map((c: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative space-y-3">
                    <Button
                      type="button"
                      onClick={() => handleRemoveCounter(idx)}
                      className="absolute bg-[unset] w-10 h-10 shadow-xs dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={16} />
                    </Button>
                    <div className="text-xs font-black text-slate-455 uppercase font-bold">METRIC #{idx + 1}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-bold text-slate-650">Metric Count/Value</Label>
                        <Input
                          type="text"
                          value={c?.counts || ""}
                          onChange={(e) => handleCounterChange(idx, "counts", e.target.value)}
                          placeholder="e.g. 75% or 10x"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-slate-650">Metric Title</Label>
                        <Input
                          type="text"
                          value={c?.title || ""}
                          onChange={(e) => handleCounterChange(idx, "title", e.target.value)}
                          placeholder="e.g. Quicker Response Times"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Metric Description</Label>
                      <Textarea
                        value={c?.description || ""}
                        onChange={(e) => handleCounterChange(idx, "description", e.target.value)}
                        placeholder="Describe what this metric represents..."
                        rows={2}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={handleAddCounter}
                className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white hover:bg-(--text-green-primary)! items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
              >
                <Plus size={14} /> Add Metric Counter
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 6. FAQs Accordion */}
      <div className="rounded-b-2xl overflow-hidden">
        {renderHeader("faqs", "Frequently Asked Questions")}
        {isOpenFaq && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["faqs", "badge"], "FAQs Badge", "FAQs")}
              {renderTextInput(["faqs", "title"], "FAQs Section Title", "Got Questions about the Shared Inbox?")}
            </div>
            <div className="space-y-4 mt-4">
              <Label className={labelClass}>FAQ Items</Label>
              {faqList.map((faq: any, idx: number) => (
                <div key={idx} className="p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative">
                  <Button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="absolute bg-[unset] h-[unset] dark:bg-(--page-body-bg) shadow-xs w-10 h-10 dark:hover:bg-red-900/20 top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5! text-red-500 hover:bg-red-50 rounded-lg"
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
                        placeholder="e.g. Do agents need separate devices?"
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
              className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white hover:bg-(--text-green-primary)! items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add FAQ Question
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
