"use client";

import { Button } from "@/src/elements/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/elements/ui/dialog";
import { AlertCircle, BookOpen, CheckCircle2, Database, Info, LayoutDashboard, Users } from "lucide-react";

interface PlanGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlanGuideModal({ isOpen, onClose }: PlanGuideModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl! max-w-[calc(100%-2rem)]! max-h-[85vh] overflow-y-auto p-3 pt-0! gap-6 rounded-lg dark:bg-(--card-color) dark:border-(--card-border-color) custom-scrollbar">
        <DialogHeader className="space-y-3 pb-4 pt-3 border-b dark:border-(--card-border-color) bg-white dark:bg-(--card-color) z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl">
              <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <DialogTitle className="sm:text-2xl text-lg text-left rtl:text-right font-bold text-gray-900 dark:text-gray-100 tracking-tight">Plan Creation Guide</DialogTitle>
              <p className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 font-medium">Step-by-step instructions for setting up subscription plans</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Section 1: General Info */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-gray-200">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              1. General Information
            </div>
            <div className="grid gap-3 pl-3.5">
              <div className="flex gap-3 group">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Provide a clear <span className="font-bold text-gray-800 dark:text-gray-200 text-[13px]">Plan Title</span> and a unique <span className="font-bold text-gray-800 dark:text-gray-200 text-[13px]">Slug</span>. The slug is automatically generated but can be customized.
                </p>
              </div>
              <div className="flex gap-3 group">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Write a compelling <span className="font-bold text-gray-800 dark:text-gray-200 text-[13px]">Plan Description</span> to highlight the value proposition to your customers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Pricing */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-gray-200">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              2. Billing & Pricing
            </div>
            <div className="grid gap-3 pl-3.5 border-l-2 border-blue-100 dark:border-blue-900/30 ml-0.5">
              <div className="flex gap-3 items-start p-3 bg-blue-50/50 dark:bg-blue-500/5 rounded-lg border border-blue-100/50 dark:border-blue-500/10 transition-all hover:bg-blue-50 dark:hover:bg-blue-500/10">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Info className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Set the <span className="font-bold text-blue-600 dark:text-blue-400">Price</span> and <span className="font-bold text-blue-600 dark:text-blue-400">Currency</span>. Choose a billing cycle (Monthly, Yearly, etc.) that fits your business model.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Feature Dependencies - CRITICAL */}
          <section className="space-y-5">
            <div className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 ">
              <AlertCircle className="w-5 h-5" />
              Critical Feature Dependencies
            </div>

            <div className="space-y-4 pl-0">
              <p className="text-sm text-gray-600 dark:text-gray-400 px-1 font-medium italic">Our system maintains strict dependencies to ensure platform stability. Disabling certain core features will automatically deactivate their child features:</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Dependency 1 */}
                <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-lg border border-amber-100 dark:border-amber-500/20 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400 font-bold text-[13px]">
                    <Database className="w-4 h-4" />
                    Contacts Dependency
                  </div>
                  <div className="space-y-2">
                    <p className="text-[12px] text-gray-500 dark:text-gray-500 uppercase font-bold tracking-tighter">Disabling Contacts removes access to:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white dark:bg-(--page-body-bg) text-[11px] font-bold rounded-lg border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300">Segments</span>
                      <span className="px-2 py-1 bg-white dark:bg-(--page-body-bg) text-[11px] font-bold rounded-lg border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300">Template Bots</span>
                      <span className="px-2 py-1 bg-white dark:bg-(--page-body-bg) text-[11px] font-bold rounded-lg border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300">Campaigns</span>
                    </div>
                  </div>
                </div>

                {/* Dependency 2 */}
                <div className="p-4 bg-indigo-50 dark:bg-indigo-500/5 rounded-lg border border-indigo-100 dark:border-indigo-500/20 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2.5 text-indigo-700 dark:text-indigo-400 font-bold text-[13px]">
                    <Users className="w-4 h-4" />
                    Agent Dependency
                  </div>
                  <div className="space-y-2">
                    <p className="text-[12px] text-gray-500 dark:text-gray-500 uppercase font-bold tracking-tighter">Disabling Agent removes access to:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white dark:bg-gray-800 text-[11px] font-bold rounded-lg border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300">Teams & Roles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Tips */}
          <section className="sm:p-5 p-4 bg-gray-50 dark:bg-(--page-body-bg) rounded-lg border border-gray-100 dark:border-(--card-border-color) space-y-3">
            <h4 className="flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-gray-200">
              <LayoutDashboard className="w-4 h-4 text-primary" />
              Pro Tips
            </h4>
            <ul className="space-y-2.5">
              <li className="flex flex-wrap gap-2.5 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                Set a <span className="font-bold text-gray-800 dark:text-gray-200">Featured</span> plan to drive more conversions.
              </li>
              <li className="flex flex-wrap gap-2.5 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                Use <span className="font-bold text-gray-800 dark:text-gray-200">0</span> in limit fields to grant <span className="italic font-medium">Unlimited</span> access for that feature.
              </li>
            </ul>
          </section>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose} className="px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-lg shadow-lg transition-all active:scale-95">
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
