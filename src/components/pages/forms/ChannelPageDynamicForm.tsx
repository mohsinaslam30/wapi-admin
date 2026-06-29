/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Textarea } from "@/src/elements/ui/textarea";
import { ChannelPageDynamicFormProps } from "@/src/types/landingPage";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PageMediaUploadField } from "./PageMediaUploadField";
import { AICallingForm } from "./sections/AICallingForm";
import { AppointmentBookingForm } from "./sections/AppointmentBookingForm";
import { AutomationForm } from "./sections/AutomationForm";
import { BroadcastBulkMessagesForm } from "./sections/BroadcastBulkMessagesForm";
import { CatalogForm } from "./sections/CatalogForm";
import { CtwaForm } from "./sections/CtwaForm";
import { FacebookForm } from "./sections/FacebookForm";
import { InstagramForm } from "./sections/InstagramForm";
import { SharedInboxForm } from "./sections/SharedInboxForm";
import { TelegramForm } from "./sections/TelegramForm";
import { WhatsAppForm } from "./sections/WhatsAppForm";
import { WhatsAppFormsForm } from "./sections/WhatsAppFormsForm";

export default function ChannelPageDynamicForm({
  slug,
  dynamicContent,
  onChange,
  title,
  onTitleChange,
}: ChannelPageDynamicFormProps) {
  // Local state for active accordion section
  const [activeSection, setActiveSection] = useState<string | null>("hero");

  // Ensure dynamicContent has correct structure
  const data = dynamicContent || {};

  // Auto upgrade features array to object for Instagram page
  useEffect(() => {
    if (slug === "instagram" && Array.isArray(data.features)) {
      onChange({
        ...data,
        features: {
          badge: "Features",
          title: "Grow Your Brand on Instagram Automatically",
          features: data.features,
        },
      });
    }
  }, [slug, data.features, data, onChange]);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Helper to update deeply nested fields
  const updateField = (path: string[], value: any) => {
    const updated = { ...data };
    let current = updated;
    for (let i = 0; i < path.length - 1; i++) {
      const part = path[i];
      if (!current[part]) {
        current[part] = {};
      }
      current[part] = { ...current[part] };
      current = current[part];
    }
    current[path[path.length - 1]] = value;
    onChange(updated);
  };

  // Render Accordion Header
  const renderHeader = (id: string, label: string) => {
    const isOpen = activeSection === id;
    return (
      <Button
        type="button"
        onClick={() => toggleSection(id)}
        className={`w-full min-h-[57px] h-auto whitespace-normal rounded-none hover:bg-[unset] flex items-center justify-between sm:px-5 px-4 py-4 bg-white dark:bg-(--card-color) ${isOpen ? "border-b border-gray-100 dark:border-(--card-border-color)" : ""} font-semibold dark:text-white text-slate-900 transition-colors text-left`}
      >
        <span className="flex-1 pr-4">{label}</span>
        {isOpen ? (
          <ChevronUp size={18} className="shrink-0" />
        ) : (
          <ChevronDown size={18} className="shrink-0" />
        )}
      </Button>
    );
  };

  // Standard label class
  const labelClass =
    "block text-xs font-bold text-slate-650 dark:text-gray-300 mb-1.5";
  // Standard input class
  const inputClass =
    "w-full h-9 px-4.5 py-2.5 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-white dark:bg-(--page-body-bg) text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:ring-1 focus:ring-(--text-green-primary) focus:border-(--text-green-primary) outline-none transition-all";

  // Render text input field
  const renderTextInput = (path: string[], label: string, placeholder = "") => {
    // Traverse path
    let val = data;
    for (const part of path) {
      val = val?.[part];
    }
    const currentVal = typeof val === "string" ? val : "";

    return (
      <div className="flex-1">
        <Label className={labelClass}>{label}</Label>
        <Input
          type="text"
          value={currentVal}
          onChange={(e) => updateField(path, e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      </div>
    );
  };

  // Render media upload field
  const renderMediaUploadInput = (path: string[], label: string) => {
    let val = data;
    for (const part of path) {
      val = val?.[part];
    }
    const currentVal = typeof val === "string" ? val : "";

    return (
      <div className="w-full">
        <PageMediaUploadField
          label={label}
          value={currentVal}
          onChange={(uploadedUrl) => updateField(path, uploadedUrl)}
        />
      </div>
    );
  };

  // Render String Array Input (e.g. bullets)
  const renderStringArrayInput = (path: string[], label: string) => {
    let list = data;
    for (const part of path) {
      list = list?.[part];
    }
    const arrayList = Array.isArray(list) ? list : [];

    const handleAdd = () => {
      updateField(path, [...arrayList, ""]);
    };

    const handleRemove = (idx: number) => {
      const updated = [...arrayList];
      updated.splice(idx, 1);
      updateField(path, updated);
    };

    const handleItemChange = (idx: number, val: string) => {
      const updated = [...arrayList];
      updated[idx] = val;
      updateField(path, updated);
    };

    return (
      <div className="w-full">
        <Label className={labelClass}>{label}</Label>
        <div className="space-y-2 mb-2">
          {arrayList.map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(idx, e.target.value)}
                placeholder="Bullet point item..."
                className={inputClass}
              />
              <Button
                type="button"
                onClick={() => handleRemove(idx)}
                className="p-2.5! bg-[unset] rounded-lg dark:bg-(--page-body-bg) hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 transition-all cursor-pointer"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          onClick={handleAdd}
          className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
        >
          <Plus size={14} /> Add Item
        </Button>
      </div>
    );
  };

  // Shared Hero Section Form
  const renderHeroSectionForm = (hasSideGif = true) => {
    const sectionKey = "hero_section";
    return (
      <div className="sm:p-5 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderTextInput(
            [sectionKey, "badge"],
            "Badge Text",
            "e.g. Official Connection",
          )}
          {renderTextInput(
            [sectionKey, "title"],
            "Hero Title",
            "Scale sales automatically",
          )}
        </div>
        <div className="w-full">
          <Label className={labelClass}>Hero Subtitle</Label>
          <Textarea
            value={data?.[sectionKey]?.subtitle || ""}
            onChange={(e) =>
              updateField([sectionKey, "subtitle"], e.target.value)
            }
            placeholder="Sub-headline explaining the value proposition..."
            rows={3}
            className={`${inputClass} resize-none min-h-25!`}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderTextInput(
            [sectionKey, "button_text"],
            "Primary Button Text",
            "Try For Free",
          )}
          {renderTextInput(
            [sectionKey, "button_url"],
            "Primary Button URL",
            "/auth/signup",
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderMediaUploadInput(
            [sectionKey, hasSideGif ? "side_gif" : "side_image"],
            hasSideGif ? "Side GIF Asset" : "Side Image Asset",
          )}
        </div>
        {renderStringArrayInput(
          [sectionKey, "bullets"],
          "Hero Trust Indicators (Bullet Points)",
        )}
      </div>
    );
  };

  // Shared Steps Section Form
  const renderStepsSectionForm = () => {
    const sectionKey = "steps";
    const stepsList = Array.isArray(data?.[sectionKey]?.steps)
      ? data[sectionKey].steps
      : [];

    const handleAddStep = () => {
      updateField(
        [sectionKey, "steps"],
        [...stepsList, { title: "", description: "" }],
      );
    };

    const handleRemoveStep = (idx: number) => {
      const updated = [...stepsList];
      updated.splice(idx, 1);
      updateField([sectionKey, "steps"], updated);
    };

    const handleStepChange = (idx: number, field: string, val: string) => {
      const updated = [...stepsList];
      updated[idx] = { ...updated[idx], [field]: val };
      updateField([sectionKey, "steps"], updated);
    };

    return (
      <div className="sm:p-5 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderTextInput(
            [sectionKey, "badge"],
            "Steps Section Badge",
            "How it works",
          )}
          {renderTextInput(
            [sectionKey, "title"],
            "Steps Section Title",
            "Start in 4 Easy Steps",
          )}
          {renderTextInput(
            [sectionKey, "subtitle"],
            "Steps Section Subtitle",
            "Setup takes less than 10 mins",
          )}
        </div>

        <div className="space-y-4 mt-4">
          <Label className={labelClass}>Process Timeline Steps</Label>
          {stepsList.map((step: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-slate-100 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) relative"
            >
              <div className="absolute top-4 right-4 rtl:right-[unset] rtl:left-4">
                <Button
                  type="button"
                  onClick={() => handleRemoveStep(idx)}
                  className="p-1.5 bg-[unset] w-10 h-10 dark:bg-(--page-body-bg) dark:hover:bg-red-900/20 rounded-lg hover:bg-red-50 text-red-500 transition-all cursor-pointer"
                >
                  <Trash2 size={15} />
                </Button>
              </div>

              <div className="text-xs font-black text-slate-650 mb-2">
                STEP #{idx + 1}
              </div>
              <div className="grid grid-cols-1 gap-3 pr-14 sm:pr-14 max-w-full">
                <div>
                  <Input
                    type="text"
                    value={step?.title || ""}
                    onChange={(e) =>
                      handleStepChange(idx, "title", e.target.value)
                    }
                    placeholder="Step title (e.g. Link Your Phone)"
                    className={inputClass}
                  />
                </div>
                <div>
                  <Textarea
                    value={step?.description || ""}
                    onChange={(e) =>
                      handleStepChange(idx, "description", e.target.value)
                    }
                    placeholder="Step description..."
                    rows={2}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          onClick={handleAddStep}
          className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
        >
          <Plus size={14} /> Add Step Card
        </Button>
      </div>
    );
  };

  // Shared Sales / CTA Section Form
  const renderSalesSectionForm = () => {
    const sectionKey = "sales_section";
    return (
      <div className="sm:p-5 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderTextInput(
            [sectionKey, "title"],
            "CTA Headline",
            "Turn Your Channel Into Sales Engine",
          )}
          {renderTextInput(
            [sectionKey, "subtitle"],
            "CTA Sub-headline",
            "Start sending automated campaigns",
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderTextInput(
            [sectionKey, "button2_title"],
            "Button 2 Title",
            "Talk to Sales",
          )}
          {renderTextInput(
            [sectionKey, "button2_description"],
            "Button 2 Link / Path (optional)",
            "",
          )}
        </div>
        {renderStringArrayInput(
          [sectionKey, "bullets"],
          "CTA Footer Trust Pills",
        )}
      </div>
    );
  };

  const sharedProps = {
    data,
    updateField,
    renderHeader,
    renderTextInput,
    renderMediaUploadInput,
    renderStringArrayInput,
    activeSection,
    toggleSection,
    labelClass,
    inputClass,
  };

  const isOpenHero = activeSection === "hero";
  const isOpenSteps = activeSection === "steps";
  const isOpenSales = activeSection === "sales";

  return (
    <div className="w-full space-y-4">
      {/* Title Field (Common to all pages) */}
      <div className="bg-white dark:bg-(--card-color) p-5 rounded-lg border border-gray-100 dark:border-(--card-border-color) shadow-sm">
        <Label className={labelClass}>Page Admin Title</Label>
        <Input
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder="Enter page title (e.g. WhatsApp Automation)"
          className={inputClass}
        />
      </div>

      {slug === "ai_calling" ? (
        <AICallingForm {...sharedProps} />
      ) : slug === "appointment_booking" ? (
        <AppointmentBookingForm {...sharedProps} />
      ) : slug === "broadcast_bulk_messages" ? (
        <BroadcastBulkMessagesForm {...sharedProps} />
      ) : slug === "shared_team_inbox" ? (
        <SharedInboxForm {...sharedProps} />
      ) : slug === "catalog" ||
        slug === "product_catalog" ||
        slug === "product-catalog" ? (
        <CatalogForm {...sharedProps} />
      ) : slug === "automation_builder" || slug === "automation-builder" ? (
        <AutomationForm {...sharedProps} />
      ) : slug === "whatsapp_forms" || slug === "whatsapp-forms" ? (
        <WhatsAppFormsForm {...sharedProps} />
      ) : slug === "ctwa" ? (
        <CtwaForm {...sharedProps} />
      ) : (
        <div className="bg-white dark:bg-(--card-color) rounded-lg border border-gray-100 dark:border-(--card-border-color) shadow-sm divide-y divide-gray-100 dark:divide-(--card-border-color)">
          {/* 1. Hero Section Accordion */}
          <div className="rounded-t-lg overflow-hidden">
            {renderHeader("hero", "Hero Section Layout")}
            {isOpenHero &&
              renderHeroSectionForm(
                slug === "whatsapp" || slug === "instagram",
              )}
          </div>

          {/* Channel specific content blocks */}
          {slug === "whatsapp" && <WhatsAppForm {...sharedProps} />}
          {slug === "instagram" && <InstagramForm {...sharedProps} />}
          {slug === "telegram" && <TelegramForm {...sharedProps} />}
          {slug === "facebook" && <FacebookForm {...sharedProps} />}

          {/* 2. Steps Section Accordion */}
          <div>
            {renderHeader("steps", "Timeline Process Steps")}
            {isOpenSteps && renderStepsSectionForm()}
          </div>

          {/* 3. Sales / CTA Section Accordion */}
          <div className="rounded-b-2xl overflow-hidden">
            {renderHeader("sales", "Call to Action Sales Footer")}
            {isOpenSales && renderSalesSectionForm()}
          </div>
        </div>
      )}
    </div>
  );
}
