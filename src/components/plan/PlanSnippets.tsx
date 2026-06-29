"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Plus, Copy, Trash2, Check, ExternalLink } from "lucide-react";
import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/src/elements/ui/dialog";
import { Checkbox } from "@/src/elements/ui/checkbox";
import CommonHeader from "../../shared/CommonHeader";
import ConfirmModal from "@/src/shared/ConfirmModal";
import { useGetAllPlansQuery } from "@/src/redux/api/planApi";
import {
  useGetAllPlanSnippetsQuery,
  useCreatePlanSnippetMutation,
  useDeletePlanSnippetMutation,
} from "@/src/redux/api/planSnippetApi";
import { API_URL } from "../../constants/route";

const THEME_COLORS = [
  { name: "Emerald", value: "#10b981" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
];

const PlanSnippets = () => {
  const { t } = useTranslation();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [snippetName, setSnippetName] = useState("");
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [themeColor, setThemeColor] = useState("#10b981");
  const [snippetTitle, setSnippetTitle] = useState("Choose Your Plan");
  const [snippetDesc, setSnippetDesc] = useState("Select a plan that fits your business needs. Simple setup, upgrade anytime.");

  // API calls
  const { data: snippetsData, isLoading: isSnippetsLoading, refetch } = useGetAllPlanSnippetsQuery({});
  const { data: plansData, isLoading: isPlansLoading } = useGetAllPlansQuery({ limit: 100 });
  const [createSnippet, { isLoading: isCreating }] = useCreatePlanSnippetMutation();
  const [deleteSnippet, { isLoading: isDeleting }] = useDeletePlanSnippetMutation();

  const snippets = snippetsData?.data?.snippets || [];
  const plans = plansData?.data?.plans || [];

  const handleCopyCode = (token: string) => {
    // Generate script url relative to api base url
    const scriptUrl = `${API_URL}/plan-snippets/widget.js`;
    const embedCode = `<div data-wapi-snippet="${token}"></div>\n<script src="${scriptUrl}"></script>`;

    navigator.clipboard.writeText(embedCode);
    setCopiedToken(token);
    toast.success("Embed code copied to clipboard!");
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalId) return;
    try {
      await deleteSnippet(deleteModalId).unwrap();
      toast.success("Snippet deleted successfully!");
      setDeleteModalId(null);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete snippet");
    }
  };

  const handleCreateSnippet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!snippetName.trim()) {
      toast.error("Snippet name is required");
      return;
    }
    if (selectedPlans.length === 0) {
      toast.error("Select at least one plan");
      return;
    }

    try {
      await createSnippet({
        name: snippetName,
        plan_ids: selectedPlans,
        theme_color: themeColor,
        title: snippetTitle,
        description: snippetDesc,
      }).unwrap();

      toast.success("Embed snippet created successfully!");
      setIsModalOpen(false);
      setSnippetName("");
      setSnippetTitle("Choose Your Plan");
      setSnippetDesc("Select a plan that fits your business needs. Simple setup, upgrade anytime.");
      setSelectedPlans([]);
      setThemeColor("#10b981");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create snippet");
    }
  };

  const handlePlanToggle = (planId: string) => {
    setSelectedPlans((prev) =>
      prev.includes(planId) ? prev.filter((id) => id !== planId) : [...prev, planId]
    );
  };

  return (
    <div className="space-y-6">
      <CommonHeader
        title="Pricing Snippets"
        description="Select plans, choose custom colors, and generate embed codes to place pricing tables anywhere on your site."
        addLabel="Create Snippet"
        onAddClick={() => setIsModalOpen(true)}
        addPermission="create.plans"
        isLoading={isSnippetsLoading}
      />

      {isSnippetsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-white dark:bg-(--card-color) animate-pulse border border-slate-100 dark:border-(--card-border-color) rounded-xl" />
          ))}
        </div>
      ) : snippets.length === 0 ? (
        <div className="bg-white dark:bg-(--card-color) rounded-lg border border-slate-100 dark:border-(--card-border-color) shadow-sm sm:p-16 p-4 text-center">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-4">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No Plan Snippets Yet</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:mb-6 mb-4">
            Create your first pricing embed snippet to display live pricing cards on your external landing page or website.
          </p>
          <Button onClick={() => setIsModalOpen(true)} className="text-white px-4.5 py-5">
            Create First Snippet
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <div
              key={snippet._id}
              className="bg-white dark:bg-(--card-color) border border-slate-100 dark:border-(--card-border-color) rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="sm:p-6 p-4 flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white truncate max-w-[70%]">
                    {snippet.name}
                  </h4>
                  <div
                    className="w-4 h-4 rounded-full border border-black/5"
                    style={{ backgroundColor: snippet.theme_color }}
                    title={`Color: ${snippet.theme_color}`}
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-500">
                    Included Plans ({snippet.plan_ids.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {snippet.plan_ids.map((plan) => (
                      <span
                        key={plan._id}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-50 dark:bg-(--dark-body) text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-none"
                      >
                        {plan.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-600 dark:text-slate-500 ">
                    Embed Script Code
                  </Label>
                  <div className="relative">
                    <pre className="text-xs bg-slate-50 dark:bg-(--dark-body) p-3 rounded-lg overflow-x-auto text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-none select-all font-mono leading-relaxed h-[85px] flex flex-col justify-center whitespace-pre-wrap break-all custom-scrollbar">
                      {`<div data-wapi-snippet="${snippet.token}"></div>\n<script src="${API_URL}/plan-snippets/widget.js"></script>`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50/50 dark:bg-black/5 border-t border-slate-100 dark:border-(--card-border-color) flex items-center justify-between gap-3">
                <Button
                  onClick={() => handleCopyCode(snippet.token)}
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 h-9! px-4.5 py-5 text-xs font-bold border-slate-200 dark:bg-(--page-body-bg) dark:hover:bg-(--table-hover) dark:border-(--card-border-color) shadow-none"
                >
                  {copiedToken === snippet.token ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Embed Code
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setDeleteModalId(snippet._id)}
                  variant="outline"
                  size="sm"
                  className="h-9! px-3! py-5! text-red-500 hover:bg-red-50 hover:text-red-600 border-red-100 hover:border-red-200 shadow-none dark:hover:bg-red-900/20 dark:bg-(--page-body-bg) dark:border-(--card-border-color)"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl! max-w-[calc(100%-2rem)]! max-h-[90vh] rounded-lg! gap-0! sm:p-6 p-4 overflow-y-auto no-scrollbar bg-white dark:bg-(--card-color) dark:border-(--card-border-color)">
          <DialogHeader>
            <DialogTitle className="text-lg text-left rtl:text-right font-bold text-slate-900 dark:text-white">
              Create Plan Snippet
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateSnippet} className="space-y-5 pt-4 ">
            <div className="space-y-2 flex flex-col">
              <Label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Snippet Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Website Home Pricing"
                value={snippetName}
                onChange={(e) => setSnippetName(e.target.value)}
                required
                className="w-full bg-(-input-color) dark:bg-(--page-body-bg) border-(--input-border-color) dark:border-(--card-border-color) focus:border-(--text-green-primary) rounded-lg"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <Label htmlFor="title" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Display Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Choose Your Plan"
                value={snippetTitle}
                onChange={(e) => setSnippetTitle(e.target.value)}
                required
                className="w-full bg-(--input-color) dark:bg-(--page-body-bg) border-(--input-border-color) dark:border-(--card-border-color) focus:border-(--text-green-primary) rounded-lg"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <Label htmlFor="description" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Display Description
              </Label>
              <Input
                id="description"
                placeholder="e.g. Select a plan that fits your business needs..."
                value={snippetDesc}
                onChange={(e) => setSnippetDesc(e.target.value)}
                required
                className="w-full bg-(--input-color) dark:bg-(--page-body-bg) border-(--input-border-color) dark:border-(--card-border-color) focus:border-(--text-green-primary) rounded-lg"
              />
            </div>

            <div className="space-y-3 flex flex-col">
              <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Select Plans to Include
              </Label>
              {isPlansLoading ? (
                <p className="text-xs text-slate-500">Loading plans...</p>
              ) : (
                <div className="max-h-48 overflow-y-auto space-y-2 border border-slate-100 dark:border-(--card-border-color) p-3 rounded-lg bg-slate-50/50 dark:bg-black/5 custom-scrollbar">
                  {plans.map((plan) => (
                    <div key={plan._id} className="flex items-center gap-3 py-1">
                      <Checkbox
                        id={`plan-${plan._id}`}
                        checked={selectedPlans.includes(plan._id)}
                        onCheckedChange={() => handlePlanToggle(plan._id)}
                        className="border-slate-300"
                      />
                      <Label
                        htmlFor={`plan-${plan._id}`}
                        className="text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer flex-1"
                      >
                        {plan.name} <span className="text-xs text-slate-400">({plan.billing_cycle})</span>
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Theme Color
              </Label>
              <div className="flex flex-wrap gap-2">
                {THEME_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setThemeColor(color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      themeColor === color.value ? "scale-110 border-slate-900 dark:border-white" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-1">
                <Input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-12 h-9 p-0 bg-transparent border-none cursor-pointer"
                />
                <Input
                  type="text"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  placeholder="#10b981"
                  className="w-28 text-xs font-mono text-center uppercase dark:bg-(--page-body-bg) dark:border-(--card-border-color) dark:text-white"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="border-slate-200 px-4.5 py-5 dark:border-(--card-border-color) dark:bg-(--page-body-bg) dark:hover:bg-(--table-hover)"
              >
                Cancel
              </Button>
              <Button type="submit" className="text-white px-4.5 py-5 bg-primary" disabled={isCreating}>
                {isCreating ? "Saving..." : "Generate Code"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmModal
        isOpen={!!deleteModalId}
        onClose={() => setDeleteModalId(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Snippet"
        subtitle="Are you sure you want to delete this plan snippet? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default PlanSnippets;
