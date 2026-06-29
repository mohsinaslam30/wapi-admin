/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageMediaUploadField } from "../PageMediaUploadField";
import { SharedFormProps } from "@/src/types/landingPage";

export const CatalogForm: React.FC<SharedFormProps> = ({
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
  const isOpenLiveDemo = activeSection === "live_demo";
  const isOpenUseCases = activeSection === "use_cases";
  const isOpenCapabilities = activeSection === "capabilities";
  const isOpenFaqs = activeSection === "faqs";

  // Products State
  const productsList = Array.isArray(data.live_demo?.products) ? data.live_demo.products : [];
  const handleProductChange = (idx: number, field: string, val: any) => {
    const updated = [...productsList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["live_demo", "products"], updated);
  };
  const handleAddProduct = () => {
    updateField(["live_demo", "products"], [...productsList, { name: "", category: "", stock: 50, price: 9.99, image: "🏷️" }]);
  };
  const handleRemoveProduct = (idx: number) => {
    const updated = [...productsList];
    updated.splice(idx, 1);
    updateField(["live_demo", "products"], updated);
  };

  // Use Case Tabs State
  const tabsList = Array.isArray(data.use_cases?.tabs) ? data.use_cases.tabs : [];
  const handleTabChange = (idx: number, field: string, val: any) => {
    const updated = [...tabsList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["use_cases", "tabs"], updated);
  };
  const handleAddTab = () => {
    updateField(["use_cases", "tabs"], [...tabsList, { heading: "", title: "", description: "", bullets: [], image: "" }]);
  };
  const handleRemoveTab = (idx: number) => {
    const updated = [...tabsList];
    updated.splice(idx, 1);
    updateField(["use_cases", "tabs"], updated);
  };

  // Tab Bullets State helper
  const handleTabBulletChange = (tabIdx: number, bulletIdx: number, val: string) => {
    const updatedTabs = [...tabsList];
    const updatedBullets = [...(updatedTabs[tabIdx].bullets || [])];
    updatedBullets[bulletIdx] = val;
    updatedTabs[tabIdx] = { ...updatedTabs[tabIdx], bullets: updatedBullets };
    updateField(["use_cases", "tabs"], updatedTabs);
  };
  const handleAddTabBullet = (tabIdx: number) => {
    const updatedTabs = [...tabsList];
    const updatedBullets = [...(updatedTabs[tabIdx].bullets || []), ""];
    updatedTabs[tabIdx] = { ...updatedTabs[tabIdx], bullets: updatedBullets };
    updateField(["use_cases", "tabs"], updatedTabs);
  };
  const handleRemoveTabBullet = (tabIdx: number, bulletIdx: number) => {
    const updatedTabs = [...tabsList];
    const updatedBullets = [...(updatedTabs[tabIdx].bullets || [])];
    updatedBullets.splice(bulletIdx, 1);
    updatedTabs[tabIdx] = { ...updatedTabs[tabIdx], bullets: updatedBullets };
    updateField(["use_cases", "tabs"], updatedTabs);
  };

  // Capabilities features State
  const featuresList = Array.isArray(data.capabilities?.features) ? data.capabilities.features : [];
  const handleFeatureChange = (idx: number, field: string, val: any) => {
    const updated = [...featuresList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["capabilities", "features"], updated);
  };
  const handleAddFeature = () => {
    updateField(["capabilities", "features"], [...featuresList, { title: "", description: "" }]);
  };
  const handleRemoveFeature = (idx: number) => {
    const updated = [...featuresList];
    updated.splice(idx, 1);
    updateField(["capabilities", "features"], updated);
  };

  // FAQs items State
  const faqsList = Array.isArray(data.faqs?.items) ? data.faqs.items : [];
  const handleFaqChange = (idx: number, field: string, val: any) => {
    const updated = [...faqsList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["faqs", "items"], updated);
  };
  const handleAddFaq = () => {
    updateField(["faqs", "items"], [...faqsList, { question: "", answer: "" }]);
  };
  const handleRemoveFaq = (idx: number) => {
    const updated = [...faqsList];
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
              {renderTextInput(["hero", "badge"], "Hero Badge Text", "e.g. WhatsApp Commerce")}
              {renderTextInput(["hero", "title"], "Hero Title", "e.g. Turn WhatsApp into a Direct Storefront")}
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
              {renderTextInput(["hero", "button_text"], "Primary Button Text", "Start Selling Now")}
              {renderTextInput(["hero", "button_url"], "Primary Button URL", "/auth/signup")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderMediaUploadInput(["hero", "image"], "Side Image/GIF Asset")}
            </div>
            {renderStringArrayInput(["hero", "bullets"], "Hero Bullets (Trust Indicators)")}
          </div>
        )}
      </div>

      {/* 2. Live Demo Sandbox Section */}
      <div>
        {renderHeader("live_demo", "Live Demo & Sandbox")}
        {isOpenLiveDemo && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["live_demo", "badge"], "Sandbox Badge", "LIVE DEMO")}
              {renderTextInput(["live_demo", "title"], "Sandbox Title", "Interact with the Catalog & Checkout Sandbox")}
            </div>
            <div className="w-full">
              <label className={labelClass}>Sandbox Description</label>
              <textarea
                value={data?.live_demo?.description || ""}
                onChange={(e) => updateField(["live_demo", "description"], e.target.value)}
                placeholder="Description for the interactive sandbox..."
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["live_demo", "card_title"], "Inventory Card Title", "Store Inventory Manager")}
              {renderTextInput(["live_demo", "card_description"], "Inventory Card Description", "Modify values dynamically...")}
            </div>

            <div className="space-y-4 mt-4">
              <label className={labelClass}>Products List</label>
              {productsList.map((product: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="text-xs font-black text-slate-450 uppercase font-bold">PRODUCT #{idx + 1}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Product Name</label>
                      <input
                        type="text"
                        value={product?.name || ""}
                        onChange={(e) => handleProductChange(idx, "name", e.target.value)}
                        placeholder="e.g. Organic Coffee Blend"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Category</label>
                      <input
                        type="text"
                        value={product?.category || ""}
                        onChange={(e) => handleProductChange(idx, "category", e.target.value)}
                        placeholder="e.g. Beverages"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Icon / Emoji</label>
                      <input
                        type="text"
                        value={product?.image || ""}
                        onChange={(e) => handleProductChange(idx, "image", e.target.value)}
                        placeholder="e.g. ☕"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Stock Count</label>
                      <input
                        type="number"
                        value={product?.stock !== undefined ? product.stock : ""}
                        onChange={(e) => handleProductChange(idx, "stock", Number(e.target.value))}
                        placeholder="e.g. 45"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={product?.price !== undefined ? product.price : ""}
                        onChange={(e) => handleProductChange(idx, "price", Number(e.target.value))}
                        placeholder="e.g. 14.99"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddProduct}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Product
            </button>
          </div>
        )}
      </div>

      {/* 3. Use Cases Tabs Section */}
      <div>
        {renderHeader("use_cases", "Real-Time Catalog Integration Use Cases")}
        {isOpenUseCases && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["use_cases", "badge"], "Use Cases Badge", "USE CASES")}
              {renderTextInput(["use_cases", "title"], "Use Cases Title", "Real-Time Catalog Integration Examples")}
            </div>
            <div className="w-full">
              <label className={labelClass}>Use Cases Description</label>
              <textarea
                value={data?.use_cases?.description || ""}
                onChange={(e) => updateField(["use_cases", "description"], e.target.value)}
                placeholder="Description of the catalog use cases..."
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="space-y-6 mt-4">
              <label className={labelClass}>Use Case Tabs</label>
              {tabsList.map((tab: any, idx: number) => (
                <div key={idx} className="p-5 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveTab(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="text-xs font-black text-slate-450 uppercase font-bold">TAB #{idx + 1}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Tab Heading / Number</label>
                      <input
                        type="text"
                        value={tab?.heading || ""}
                        onChange={(e) => handleTabChange(idx, "heading", e.target.value)}
                        placeholder="e.g. 01. E-Commerce Checkout"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Tab Title</label>
                      <input
                        type="text"
                        value={tab?.title || ""}
                        onChange={(e) => handleTabChange(idx, "title", e.target.value)}
                        placeholder="e.g. Instantly Sync Inventory & Checkout"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400">Tab Description</label>
                    <textarea
                      value={tab?.description || ""}
                      onChange={(e) => handleTabChange(idx, "description", e.target.value)}
                      placeholder="Use case tab explanation..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-450 block mb-1">Bullets</label>
                    <div className="space-y-2 mb-2">
                      {Array.isArray(tab?.bullets) && tab.bullets.map((bullet: string, bIdx: number) => (
                        <div key={bIdx} className="flex gap-2">
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) => handleTabBulletChange(idx, bIdx, e.target.value)}
                            placeholder="Bullet point item..."
                            className={inputClass}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveTabBullet(idx, bIdx)}
                            className="p-2.5 rounded-lg border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 transition-all cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddTabBullet(idx)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-(--text-green-primary) cursor-pointer"
                    >
                      + Add Bullet
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-650 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Tab Image Asset</label>
                    <PageMediaUploadField
                      value={tab?.image || ""}
                      onChange={(url) => handleTabChange(idx, "image", url)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddTab}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Tab
            </button>
          </div>
        )}
      </div>

      {/* 4. Capabilities Section */}
      <div>
        {renderHeader("capabilities", "Catalog Capabilities Features Grid")}
        {isOpenCapabilities && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["capabilities", "badge"], "Capabilities Badge", "Catalog Capabilities")}
              {renderTextInput(["capabilities", "title"], "Capabilities Title", "Everything You Need to Power Mobile Commerce")}
            </div>

            <div className="space-y-4 mt-4">
              <label className={labelClass}>Capabilities List</label>
              {featuresList.map((feature: any, idx: number) => (
                <div key={idx} className="p-5 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="text-xs font-black text-slate-450 uppercase font-bold">FEATURE #{idx + 1}</div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400">Feature Title</label>
                    <input
                      type="text"
                      value={feature?.title || ""}
                      onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                      placeholder="e.g. Meta Catalog Sync"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400">Feature Description</label>
                    <textarea
                      value={feature?.description || ""}
                      onChange={(e) => handleFeatureChange(idx, "description", e.target.value)}
                      placeholder="Feature description..."
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
              <Plus size={14} /> Add Feature
            </button>
          </div>
        )}
      </div>

      {/* 5. FAQs Section */}
      <div className="rounded-b-2xl overflow-hidden">
        {renderHeader("faqs", "Frequently Asked Questions")}
        {isOpenFaqs && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["faqs", "badge"], "FAQs Badge", "FAQs")}
              {renderTextInput(["faqs", "title"], "FAQs Section Title", "Questions about Catalog Integrations?")}
            </div>

            <div className="space-y-4 mt-4">
              <label className={labelClass}>FAQ Items</label>
              {faqsList.map((faq: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="text-xs font-black text-slate-450 uppercase font-bold mb-2">FAQ ITEM #{idx + 1}</div>
                  <div className="grid grid-cols-1 gap-3 max-w-[90%]">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Question</label>
                      <input
                        type="text"
                        value={faq?.question || ""}
                        onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                        placeholder="FAQ Question..."
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400">Answer</label>
                      <textarea
                        value={faq?.answer || ""}
                        onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                        placeholder="FAQ Answer..."
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
