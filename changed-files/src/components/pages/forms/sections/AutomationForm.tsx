/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageMediaUploadField } from "../PageMediaUploadField";
import { SharedFormProps } from "@/src/types/landingPage";

export const AutomationForm: React.FC<SharedFormProps> = ({
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
  const isOpenFlowNodes = activeSection === "flow_nodes";
  const isOpenUseCases = activeSection === "use_cases";
  const isOpenFaq = activeSection === "faqs";

  // Flow Nodes List
  const nodesList = Array.isArray(data.flow_nodes?.nodes) ? data.flow_nodes.nodes : [];
  const handleNodeChange = (idx: number, field: string, val: string) => {
    const updated = [...nodesList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["flow_nodes", "nodes"], updated);
  };
  const handleAddNode = () => {
    updateField(
      ["flow_nodes", "nodes"],
      [...nodesList, { name: "", category: "MESSAGING", description: "", icon: "MessageSquare" }]
    );
  };
  const handleRemoveNode = (idx: number) => {
    const updated = [...nodesList];
    updated.splice(idx, 1);
    updateField(["flow_nodes", "nodes"], updated);
  };

  // Use Cases / Tabs List
  const tabsList = Array.isArray(data.use_cases?.tabs) ? data.use_cases.tabs : [];
  const handleTabChange = (idx: number, field: string, val: any) => {
    const updated = [...tabsList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["use_cases", "tabs"], updated);
  };
  const handleAddTab = () => {
    updateField(
      ["use_cases", "tabs"],
      [...tabsList, { title: "", sub_title: "", side_image: "", steps: [{ title: "", description: "" }] }]
    );
  };
  const handleRemoveTab = (idx: number) => {
    const updated = [...tabsList];
    updated.splice(idx, 1);
    updateField(["use_cases", "tabs"], updated);
  };

  // Nested steps inside a tab
  const handleStepChange = (tabIdx: number, stepIdx: number, field: string, val: string) => {
    const updatedTabs = [...tabsList];
    const steps = Array.isArray(updatedTabs[tabIdx]?.steps) ? [...updatedTabs[tabIdx].steps] : [];
    steps[stepIdx] = { ...steps[stepIdx], [field]: val };
    updatedTabs[tabIdx] = { ...updatedTabs[tabIdx], steps };
    updateField(["use_cases", "tabs"], updatedTabs);
  };
  const handleAddStep = (tabIdx: number) => {
    const updatedTabs = [...tabsList];
    const steps = Array.isArray(updatedTabs[tabIdx]?.steps) ? [...updatedTabs[tabIdx].steps] : [];
    updatedTabs[tabIdx] = { ...updatedTabs[tabIdx], steps: [...steps, { title: "", description: "" }] };
    updateField(["use_cases", "tabs"], updatedTabs);
  };
  const handleRemoveStep = (tabIdx: number, stepIdx: number) => {
    const updatedTabs = [...tabsList];
    const steps = Array.isArray(updatedTabs[tabIdx]?.steps) ? [...updatedTabs[tabIdx].steps] : [];
    steps.splice(stepIdx, 1);
    updatedTabs[tabIdx] = { ...updatedTabs[tabIdx], steps };
    updateField(["use_cases", "tabs"], updatedTabs);
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
              {renderTextInput(["hero", "badge"], "Hero Badge Text", "e.g. No-Code Chatbot Builder")}
              {renderTextInput(["hero", "title"], "Hero Title", "e.g. Automate Conversations Visually Without Any Code")}
            </div>
            <div className="w-full">
              <label className={labelClass}>Hero Subtitle</label>
              <textarea
                value={data?.hero?.subtitle || ""}
                onChange={(e) => updateField(["hero", "subtitle"], e.target.value)}
                placeholder="Sub-headline explaining the value proposition..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["hero", "button_text"], "Primary Button Text", "Start Building For Free")}
              {renderTextInput(["hero", "button_url"], "Primary Button URL", "/auth/signup")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderMediaUploadInput(["hero", "image"], "Side Graphic / Flow Mockup Image")}
            </div>
            {renderStringArrayInput(["hero", "bullets"], "Hero Trust Indicators (Bullet Points)")}
          </div>
        )}
      </div>

      {/* 2. Conversational Flow Nodes Section */}
      <div>
        {renderHeader("flow_nodes", "Conversational Flow Nodes Directory")}
        {isOpenFlowNodes && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["flow_nodes", "badge"], "Section Badge", "Visual Blocks Directory")}
              {renderTextInput(["flow_nodes", "title"], "Section Title", "All Conversational Flow Nodes")}
            </div>
            <div className="w-full">
              <label className={labelClass}>Section Description</label>
              <textarea
                value={data?.flow_nodes?.description || ""}
                onChange={(e) => updateField(["flow_nodes", "description"], e.target.value)}
                placeholder="Section overview details..."
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="space-y-4 mt-4">
              <label className={labelClass}>Flow Nodes</label>
              {nodesList.map((node: any, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveNode(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold">NODE #{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Node Name</label>
                      <input
                        type="text"
                        value={node?.name || ""}
                        onChange={(e) => handleNodeChange(idx, "name", e.target.value)}
                        placeholder="e.g. Send Message"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Category Tag</label>
                      <input
                        type="text"
                        value={node?.category || ""}
                        onChange={(e) => handleNodeChange(idx, "category", e.target.value)}
                        placeholder="e.g. MESSAGING, INTEGRATIONS, CRM"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Icon Name (lucide-react)</label>
                      <input
                        type="text"
                        value={node?.icon || ""}
                        onChange={(e) => handleNodeChange(idx, "icon", e.target.value)}
                        placeholder="e.g. MessageSquare, Send, Play, Database..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400">Node Description</label>
                    <textarea
                      value={node?.description || ""}
                      onChange={(e) => handleNodeChange(idx, "description", e.target.value)}
                      placeholder="Brief details about what the block does..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddNode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Flow Node
            </button>
          </div>
        )}
      </div>

      {/* 3. Proven Chatbot Recipes (Use Cases) */}
      <div>
        {renderHeader("use_cases", "Proven Chatbot Recipes (Use Cases)")}
        {isOpenUseCases && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["use_cases", "badge"], "Section Badge", "Use Cases")}
              {renderTextInput(["use_cases", "title"], "Section Title", "Proven Chatbot Flow Recipes")}
            </div>
            <div className="w-full">
              <label className={labelClass}>Section Description</label>
              <textarea
                value={data?.use_cases?.description || ""}
                onChange={(e) => updateField(["use_cases", "description"], e.target.value)}
                placeholder="Section overview details..."
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="space-y-6 mt-4">
              <label className={labelClass}>Recipe Tabs List</label>
              {tabsList.map((tab: any, tabIdx: number) => (
                <div
                  key={tabIdx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-4 relative"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveTab(tabIdx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold">RECIPE TAB #{tabIdx + 1}</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Tab Title</label>
                      <input
                        type="text"
                        value={tab?.title || ""}
                        onChange={(e) => handleTabChange(tabIdx, "title", e.target.value)}
                        placeholder="e.g. Lead Qualification & Booking"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Tab Subtitle</label>
                      <input
                        type="text"
                        value={tab?.sub_title || ""}
                        onChange={(e) => handleTabChange(tabIdx, "sub_title", e.target.value)}
                        placeholder="e.g. 01. LEAD GENERATION"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <PageMediaUploadField
                      label="Side Image Asset (e.g. preview mockup)"
                      value={tab?.side_image || ""}
                      onChange={(uploadedUrl) => handleTabChange(tabIdx, "side_image", uploadedUrl)}
                    />
                  </div>

                  {/* Nested recipe step timeline */}
                  <div className="space-y-3 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Recipe Flow Steps</label>
                    {Array.isArray(tab.steps) && tab.steps.map((step: any, stepIdx: number) => (
                      <div key={stepIdx} className="p-3 rounded-lg border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-(--card-color) space-y-2 relative">
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(tabIdx, stepIdx)}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={13} />
                        </button>
                        <div className="text-[9px] font-black text-slate-400 uppercase">STEP #{stepIdx + 1}</div>
                        <div className="grid grid-cols-1 gap-2">
                          <input
                            type="text"
                            value={step?.title || ""}
                            onChange={(e) => handleStepChange(tabIdx, stepIdx, "title", e.target.value)}
                            placeholder="Step Title (e.g. Send Template)"
                            className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-(--card-color) text-slate-900 dark:text-white"
                          />
                          <textarea
                            value={step?.description || ""}
                            onChange={(e) => handleStepChange(tabIdx, stepIdx, "description", e.target.value)}
                            placeholder="Step Description details..."
                            rows={1}
                            className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-(--card-color) text-slate-900 dark:text-white resize-none"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddStep(tabIdx)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
                    >
                      <Plus size={12} /> Add Recipe Step
                    </button>
                  </div>

                </div>
              ))}
              <button
                type="button"
                onClick={handleAddTab}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
              >
                <Plus size={14} /> Add Recipe Tab
              </button>
            </div>

          </div>
        )}
      </div>

      {/* 4. FAQs Section */}
      <div className="rounded-b-2xl overflow-hidden">
        {renderHeader("faqs", "Frequently Asked Questions")}
        {isOpenFaq && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["faqs", "badge"], "FAQs Badge", "FAQs")}
              {renderTextInput(["faqs", "title"], "FAQs Section Title", "Got Questions about Chatbots & Flows?")}
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
                        placeholder="e.g. Do I need coding skills to build a WhatsApp chatbot?"
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
