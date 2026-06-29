/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageMediaUploadField } from "../PageMediaUploadField";
import { SharedFormProps } from "@/src/types/landingPage";
import { Textarea } from "@/src/elements/ui/textarea";
import { Button } from "@/src/elements/ui/button";
import { Label } from "@/src/elements/ui/label";
import { Input } from "@/src/elements/ui/input";

export const AppointmentBookingForm: React.FC<SharedFormProps> = ({
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
  const isOpenJourney = activeSection === "booking_journey";
  const isOpenUsecases = activeSection === "usecases";
  const isOpenArch = activeSection === "architecture";
  const isOpenFaq = activeSection === "faqs";

  // Booking Journey Steps
  const journeySteps = Array.isArray(data.booking_journey?.steps) ? data.booking_journey.steps : [];
  const handleJourneyStepChange = (idx: number, field: string, val: string) => {
    const updated = [...journeySteps];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["booking_journey", "steps"], updated);
  };
  const handleAddJourneyStep = () => {
    updateField(
      ["booking_journey", "steps"],
      [...journeySteps, { title: "", description: "", image: "" }]
    );
  };
  const handleRemoveJourneyStep = (idx: number) => {
    const updated = [...journeySteps];
    updated.splice(idx, 1);
    updateField(["booking_journey", "steps"], updated);
  };

  // Use Cases Examples
  const usecaseExamples = Array.isArray(data.usecases?.examples) ? data.usecases.examples : [];
  const handleUsecaseExampleChange = (idx: number, field: string, val: string) => {
    const updated = [...usecaseExamples];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["usecases", "examples"], updated);
  };
  const handleAddUsecaseExample = () => {
    updateField(
      ["usecases", "examples"],
      [...usecaseExamples, { title: "", description: "" }]
    );
  };
  const handleRemoveUsecaseExample = (idx: number) => {
    const updated = [...usecaseExamples];
    updated.splice(idx, 1);
    updateField(["usecases", "examples"], updated);
  };

  // Architecture Steps
  const archSteps = Array.isArray(data.architecture?.steps) ? data.architecture.steps : [];
  const handleArchStepChange = (idx: number, field: string, val: string) => {
    const updated = [...archSteps];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["architecture", "steps"], updated);
  };
  const handleAddArchStep = () => {
    updateField(
      ["architecture", "steps"],
      [...archSteps, { title: "", description: "" }]
    );
  };
  const handleRemoveArchStep = (idx: number) => {
    const updated = [...archSteps];
    updated.splice(idx, 1);
    updateField(["architecture", "steps"], updated);
  };

  // FAQ Section Items
  const faqList = Array.isArray(data.faqs?.items) ? data.faqs.items : [];
  const handleFaqChange = (idx: number, field: string, val: string) => {
    const updated = [...faqList];
    updated[idx] = { ...updated[idx], [field]: val };
    updateField(["faqs", "items"], updated);
  };
  const handleAddFaq = () => {
    updateField(
      ["faqs", "items"],
      [...faqList, { question: "", answer: "" }]
    );
  };
  const handleRemoveFaq = (idx: number) => {
    const updated = [...faqList];
    updated.splice(idx, 1);
    updateField(["faqs", "items"], updated);
  };

  return (
    <div className="bg-white dark:bg-(--card-color) rounded-lg border border-gray-100 dark:border-(--card-border-color) shadow-sm divide-y divide-gray-100 dark:divide-(--card-border-color)">
      {/* 1. Hero Section Accordion */}
      <div className="rounded-t-lg overflow-hidden">
        {renderHeader("hero", "Hero Section Layout")}
        {isOpenHero && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["hero", "badge"], "Hero Badge Text", "e.g. Automated Booking")}
              {renderTextInput(["hero", "title"], "Hero Title", "e.g. Automate Appointments on WhatsApp")}
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
              {renderTextInput(["hero", "button_text"], "Primary Button Text", "Start Booking Free")}
              {renderTextInput(["hero", "button_url"], "Primary Button URL", "/auth/signup")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderMediaUploadInput(["hero", "side_image"], "Side Image/GIF Asset")}
            </div>
            {renderStringArrayInput(["hero", "bullet_points"], "Hero Bullet Points (Trust Indicators)")}
          </div>
        )}
      </div>

      {/* 2. Booking Journey Accordion */}
      <div>
        {renderHeader("booking_journey", "In-Chat Booking Journey Steps")}
        {isOpenJourney && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderTextInput(["booking_journey", "badge"], "Journey Section Badge", "SCHEDULING ENGINE")}
              {renderTextInput(["booking_journey", "title"], "Journey Main Title", "The In-Chat Booking Journey")}
              {renderTextInput(["booking_journey", "description"], "Journey Description", "Self-service scheduling within WhatsApp")}
            </div>

            <div className="space-y-6 mt-4">
              <label className={labelClass}>Booking Steps</label>
              {journeySteps.map((step: any, idx: number) => (
                <div key={idx} className="sm:p-5 p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                  <Button
                    type="button"
                    onClick={() => handleRemoveJourneyStep(idx)}
                    className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-455 uppercase font-bold">STEP #{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-slate-650">Step Title</Label>
                      <Input
                        value={step?.title || ""}
                        onChange={(e) => handleJourneyStepChange(idx, "title", e.target.value)}
                        placeholder="e.g. Browse & Select"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <PageMediaUploadField
                        label="Step Image Preview"
                        value={step?.image || ""}
                        onChange={(url) => handleJourneyStepChange(idx, "image", url)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Step Description</Label>
                    <Textarea
                      value={step?.description || ""}
                      onChange={(e) => handleJourneyStepChange(idx, "description", e.target.value)}
                      placeholder="Explain this scheduling step..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={handleAddJourneyStep}
              className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Booking Journey Step
            </Button>
          </div>
        )}
      </div>

      {/* 3. Use Cases Accordion */}
      <div>
        {renderHeader("usecases", "Real-Time Scheduling Automation Examples")}
        {isOpenUsecases && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["usecases", "badge"], "Usecases Badge", "USE CASES")}
              {renderTextInput(["usecases", "title"], "Usecases Section Title", "Real-Time Scheduling Automation Examples")}
            </div>

            <div className="space-y-6 mt-4">
              <Label className={labelClass}>Usecase Examples</Label>
              {usecaseExamples.map((ex: any, idx: number) => (
                <div key={idx} className="sm:p-5 p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                  <Button
                    type="button"
                    onClick={() => handleRemoveUsecaseExample(idx)}
                    className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-450 uppercase font-bold">EXAMPLE #{idx + 1}</div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Example Title</Label>
                    <Input
                      type="text"
                      value={ex?.title || ""}
                      onChange={(e) => handleUsecaseExampleChange(idx, "title", e.target.value)}
                      placeholder="e.g. Medical Clinics"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Example Description</Label>
                    <Textarea
                      value={ex?.description || ""}
                      onChange={(e) => handleUsecaseExampleChange(idx, "description", e.target.value)}
                      placeholder="Detail the usecase application..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={handleAddUsecaseExample}
              className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Usecase Example
            </Button>
          </div>
        )}
      </div>

      {/* 4. Architecture Accordion */}
      <div>
        {renderHeader("architecture", "Robust Appointment Scheduling Architecture")}
        {isOpenArch && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["architecture", "title"], "Architecture Title", "Robust Appointment Scheduling Architecture")}
              {renderTextInput(["architecture", "description"], "Architecture Badge / Engine Description", "Engine Features")}
            </div>

            <div className="space-y-6 mt-4">
              <Label className={labelClass}>Architecture Features</Label>
              {archSteps.map((step: any, idx: number) => (
                <div key={idx} className="sm:p-5 p-4 rounded-lg border border-slate-200 dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--dark-sidebar) space-y-3 relative">
                  <Button
                    type="button"
                    onClick={() => handleRemoveArchStep(idx)}
                    className="absolute bg-[unset] shadow-xs dark:hover:bg-red-900/20 w-10 h-10 dark:bg-(--page-body-bg) top-4 right-4 rtl:right-[unset] rtl:left-4 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="text-xs font-black text-slate-450 uppercase font-bold">FEATURE #{idx + 1}</div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Feature Title</Label>
                    <Input
                      type="text"
                      value={step?.title || ""}
                      onChange={(e) => handleArchStepChange(idx, "title", e.target.value)}
                      placeholder="e.g. Native WhatsApp Flows"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-650">Feature Description</Label>
                    <Textarea
                      value={step?.description || ""}
                      onChange={(e) => handleArchStepChange(idx, "description", e.target.value)}
                      placeholder="Detail the engine feature..."
                      rows={2}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={handleAddArchStep}
              className="flex max-w-fit ml-auto rtl:ml-0 rtl:mr-auto hover:bg-(--text-green-primary)! hover:text-white items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-(--text-green-primary) bg-(--text-green-primary)/10 hover:bg-(--text-green-primary)/15 transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Engine Feature
            </Button>
          </div>
        )}
      </div>

      {/* 5. FAQs Accordions Section */}
      <div className="rounded-b-2xl overflow-hidden">
        {renderHeader("faqs", "Frequently Asked Questions Accordions")}
        {isOpenFaq && (
          <div className="sm:p-5 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderTextInput(["faqs", "badge"], "FAQs Badge", "FAQs")}
              {renderTextInput(["faqs", "title"], "FAQs Section Title", "Questions about Scheduling?")}
            </div>

            <div className="space-y-6 mt-4">
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
                        placeholder="e.g. How does calendar sync prevent overlap?"
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
