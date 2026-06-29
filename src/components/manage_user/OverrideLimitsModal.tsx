"use client";

import { booleanFeatures, numericFeatures } from "@/src/data/Plans";
import { omniChannels } from "@/src/data/user";
import { Button } from "@/src/elements/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/elements/ui/dialog";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Switch } from "@/src/elements/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/elements/ui/tooltip";
import { useOverrideSubscriptionLimitsMutation } from "@/src/redux/api/subscriptionApi";
import { OverrideLimitsModalProps } from "@/src/types/user";
import { Info, Loader2, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const OverrideLimitsModal = ({
  isOpen,
  onClose,
  user,
}: OverrideLimitsModalProps) => {
  const { t } = useTranslation();
  const [features, setFeatures] = useState<Record<string, string | boolean>>(
    {},
  );
  const [enabledFeatures, setEnabledFeatures] = useState<
    Record<string, boolean>
  >({});
  const [overrideLimits, { isLoading }] =
    useOverrideSubscriptionLimitsMutation();

  const currentFeatures = (
    user?.current_subscription?.is_custom
      ? user?.current_subscription?.features
      : user?.current_plan?.features
  ) as Record<string, unknown> | undefined;

  const originalFeatures = user?.current_plan?.features as
    | Record<string, unknown>
    | undefined;

  useEffect(() => {
    if (isOpen && currentFeatures) {
      const initial: Record<string, string | boolean> = {};
      const initialEnabled: Record<string, boolean> = {};

      const subEnabledFeatures = user?.current_subscription?.is_custom
        ? user?.current_subscription?.enabled_features
        : user?.current_plan?.enabled_features;

      numericFeatures.forEach(({ id }) => {
        const val = currentFeatures[id];
        initial[id] = val !== undefined ? String(val) : "";
        initialEnabled[id] = subEnabledFeatures?.[id] ?? true;
      });
      booleanFeatures.forEach(({ id }) => {
        const val = currentFeatures[id];
        initial[id] = val !== undefined ? Boolean(val) : false;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFeatures(initial);
      setEnabledFeatures(initialEnabled);
    } else if (isOpen) {
      setFeatures({});
      setEnabledFeatures({});
    }
  }, [isOpen, user, currentFeatures]);

  const handleNumericChange = (id: string, value: string) => {
    setFeatures((prev) => ({ ...prev, [id]: value }));
  };

  const handleBooleanChange = (id: string, val: boolean) => {
    setFeatures((prev) => {
      const updated = { ...prev, [id]: val };
      if (val) {
        // If enabling a child feature, make sure parent is enabled
        const feat = booleanFeatures.find((f) => f.id === id);
        if (feat && (feat as any).parentFeatureId) {
          updated[(feat as any).parentFeatureId] = true;
        }
      } else {
        // If disabling a parent feature, disable all its children
        const feat = booleanFeatures.find((f) => f.id === id);
        if (feat && !(feat as any).parentFeatureId) {
          const childFeats = booleanFeatures.filter(
            (f) => (f as any).parentFeatureId === id,
          );
          childFeats.forEach((child) => {
            updated[child.id] = false;
          });
        }
      }
      return updated;
    });

    if (id === "omnichannel_facebook" && !val) {
      setEnabledFeatures((prevEnabled) => ({
        ...prevEnabled,
        facebookAds_campaign: false,
        facebook_lead: false,
      }));
    }
  };

  const handleEnabledChange = (id: string, val: boolean) => {
    setEnabledFeatures((prev) => {
      const updated = { ...prev, [id]: val };
      // Dependency: contacts -> segments, template_bots, campaigns
      if (id === "contacts" && !val) {
        updated["segments"] = false;
        updated["template_bots"] = false;
        updated["campaigns"] = false;
      }
      // Dependency: template_bots -> campaigns
      if (id === "template_bots" && !val) {
        updated["campaigns"] = false;
      }
      // Dependency: staff -> teams
      if (id === "staff" && !val) {
        updated["teams"] = false;
      }
      // Dependency: teams -> staff
      if (id === "teams" && val) {
        updated["staff"] = true;
      }
      // Dependency: segments, template_bots, campaigns -> contacts
      if (["segments", "template_bots", "campaigns"].includes(id) && val) {
        updated["contacts"] = true;
      }
      // Dependency: campaigns -> template_bots
      if (id === "campaigns" && val) {
        updated["template_bots"] = true;
      }
      return updated;
    });
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      const parsed: Record<string, unknown> = {};
      numericFeatures.forEach(({ id }) => {
        const val = features[id];
        if (val !== "" && val !== undefined) {
          parsed[id] = parseInt(String(val), 10);
        }
      });
      booleanFeatures.forEach(({ id }) => {
        parsed[id] = Boolean(features[id]);
      });

      const isFacebookChannelEnabled = Boolean(
        features["omnichannel_facebook"],
      );
      const finalEnabledFeatures = { ...enabledFeatures };
      if (!isFacebookChannelEnabled) {
        finalEnabledFeatures["facebookAds_campaign"] = false;
        finalEnabledFeatures["facebook_lead"] = false;
      }

      const result = await overrideLimits({
        userId: user._id,
        features: parsed,
        enabled_features: finalEnabledFeatures,
      }).unwrap();
      if (result.success) {
        toast.success(result.message || t("subscription_override_success"));
        onClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || t("common_error"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl! max-w-[calc(100%-2rem)]! gap-0 bg-white dark:bg-(--card-color) border-none rounded-lg p-0! overflow-hidden shadow-2xl">
        <DialogHeader className="sm:p-6 p-4 pb-4 border-b border-slate-100 dark:border-(--card-border-color)">
          <DialogTitle className="font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-amber-500" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-xl font-semibold">
                {t("subscription_override_limits_title")}
              </h4>
              <p className="text-[13px] text-slate-500 dark:text-slate-400 font-normal">
                {t("subscription_override_limits_subtitle", {
                  name: user?.name,
                })}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="sm:p-6 p-4 max-h-[60vh] overflow-y-auto custom-scrollbar space-y-6">
          {/* Info banner */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-400">
              {t("subscription_override_info", {
                defaultValue:
                  "These values will override the user's plan limits.",
              })}
            </p>
          </div>

          {/* Numeric limits */}
          <div>
            <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              {t("common_numeric_limits", { defaultValue: "Numeric Limits" })}
            </h5>
            <div className="grid sm:grid-cols-2 gap-3">
              {numericFeatures.map((feature) => {
                const { id, label, hasToggle } = feature;
                const isFbFeature =
                  id === "facebookAds_campaign" || id === "facebook_lead";
                const isParentDisabled =
                  isFbFeature && !features["omnichannel_facebook"];
                const isActuallyEnabled =
                  (!hasToggle || enabledFeatures[id]) && !isParentDisabled;
                return (
                  <div
                    key={id}
                    className={`space-y-2 p-3 rounded-xl border border-slate-100 dark:border-(--card-border-color) bg-slate-50/30 dark:bg-slate-800/5 transition-all ${!isActuallyEnabled ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-1 flex-1 overflow-hidden">
                        <Label className="text-xs font-semibold text-slate-600 dark:text-slate-300 truncate">
                          {t(`plan_features_${id}`, { defaultValue: label })}
                        </Label>
                        {originalFeatures?.[id] !== undefined && (
                          <div className="flex items-center gap-1">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                              {t("plan_origin", { defaultValue: "Plan" })}:
                            </span>
                            <span className="text-[10px] bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                              {String(originalFeatures[id])}
                            </span>
                          </div>
                        )}
                      </div>
                      {hasToggle && (
                        <Switch
                          checked={
                            (enabledFeatures[id] ?? true) && !isParentDisabled
                          }
                          disabled={isParentDisabled}
                          onCheckedChange={(val) =>
                            handleEnabledChange(id, val)
                          }
                          className="shrink-0"
                        />
                      )}
                    </div>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-full">
                            <Input
                              type="number"
                              min={0}
                              placeholder={t("common_unchanged", {
                                defaultValue: "Unchanged",
                              })}
                              value={
                                features[id] !== undefined
                                  ? String(features[id])
                                  : ""
                              }
                              disabled={!isActuallyEnabled || isParentDisabled}
                              onChange={(e) =>
                                handleNumericChange(id, e.target.value)
                              }
                              className={`h-9 bg-white dark:bg-page-body border-slate-200 dark:border-(--card-border-color) rounded-lg text-sm focus:border-(--text-green-primary) focus:ring-1 focus:ring-(--text-green-primary) transition-all ${!isActuallyEnabled || isParentDisabled ? "cursor-not-allowed" : ""}`}
                            />
                          </div>
                        </TooltipTrigger>
                        {(isParentDisabled || !isActuallyEnabled) && (
                          <TooltipContent className="bg-slate-900 dark:bg-(--page-body-bg) text-white border-none text-xs py-2 px-3 shadow-xl max-w-xs">
                            <p>
                              {isParentDisabled
                                ? t(
                                    "plan_feature_requires_facebook_messenger",
                                  ) || "Requires Facebook Channel to be enabled"
                                : t("plan_feature_disabled_tooltip")}
                            </p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                    {isFbFeature && (
                      <span className="text-[10.5px] text-amber-600 dark:text-amber-500 font-medium block mt-1 select-none">
                        *{" "}
                        {t("plan_feature_requires_facebook_messenger") ||
                          "Requires Facebook Channel to be enabled"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Boolean features */}
          <div>
            <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              {t("common_feature_toggles", { defaultValue: "Feature Toggles" })}
            </h5>
            <div className="grid sm:grid-cols-2 gap-3">
              {booleanFeatures
                .filter(
                  (f) =>
                    !(f as any).parentFeatureId &&
                    !f.id.startsWith("omnichannel_"),
                )
                .map((feature) => {
                  const { id, label } = feature;
                  const isChecked = Boolean(features[id]);

                  return (
                    <Label
                      key={id}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${isChecked ? "border-(--text-green-primary) bg-emerald-50/50 dark:bg-emerald-900/10" : "border-slate-100 dark:border-(--card-border-color)"}`}
                    >
                      <Input
                        type="checkbox"
                        className="w-4 h-4 accent-(--text-green-primary)"
                        checked={isChecked}
                        onChange={(e) =>
                          handleBooleanChange(id, e.target.checked)
                        }
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {t(`plan_features_${id}`, { defaultValue: label })}
                        </span>
                        {originalFeatures?.[id] !== undefined && (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                            {t("plan_origin", { defaultValue: "Plan" })}:{" "}
                            {Boolean(originalFeatures[id])
                              ? t("common_yes", { defaultValue: "Yes" })
                              : t("common_no", { defaultValue: "No" })}
                          </span>
                        )}
                      </div>
                    </Label>
                  );
                })}
            </div>

            {/* Omnichannel Setup Section */}
            <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-3">
              {t("plan_omnichannel_title", {
                defaultValue: "Omnichannel Channels",
              })}
            </h5>
            <div className="space-y-4">
              {omniChannels.map((channel) => {
                const isChecked = Boolean(features[channel.id]);
                const children = booleanFeatures.filter(
                  (f) => (f as any).parentFeatureId === channel.id,
                );

                return (
                  <div
                    key={channel.id}
                    className={`p-4 rounded-xl border border-slate-100 dark:border-(--card-border-color) ${channel.accentColor} transition-all`}
                  >
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-3 cursor-pointer">
                        <Input
                          type="checkbox"
                          className="w-4 h-4 accent-(--text-green-primary)"
                          checked={isChecked}
                          onChange={(e) =>
                            handleBooleanChange(channel.id, e.target.checked)
                          }
                        />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            {channel.title}
                          </span>
                          {originalFeatures?.[channel.id] !== undefined && (
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                              {t("plan_origin", { defaultValue: "Plan" })}:{" "}
                              {Boolean(originalFeatures[channel.id])
                                ? t("common_yes", { defaultValue: "Yes" })
                                : t("common_no", { defaultValue: "No" })}
                            </span>
                          )}
                        </div>
                      </Label>
                    </div>

                    {children.length > 0 && isChecked && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/40">
                        {children.map((child) => {
                          const childChecked = Boolean(features[child.id]);
                          return (
                            <Label
                              key={child.id}
                              className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${childChecked ? "border-(--text-green-primary)/40 bg-emerald-50/30 dark:bg-emerald-900/5" : "border-slate-100 dark:border-(--card-border-color)"}`}
                            >
                              <Input
                                type="checkbox"
                                className="w-3.5 h-3.5 accent-(--text-green-primary)"
                                checked={childChecked}
                                onChange={(e) =>
                                  handleBooleanChange(
                                    child.id,
                                    e.target.checked,
                                  )
                                }
                              />
                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                  {t(`plan_features_${child.id}`, {
                                    defaultValue: child.label,
                                  })}
                                </span>
                                {originalFeatures?.[child.id] !== undefined && (
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-normal">
                                    {t("plan_origin", { defaultValue: "Plan" })}
                                    :{" "}
                                    {Boolean(originalFeatures[child.id])
                                      ? t("common_yes", { defaultValue: "Yes" })
                                      : t("common_no", { defaultValue: "No" })}
                                  </span>
                                )}
                              </div>
                            </Label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:p-6 p-4 pt-0 flex gap-3 border-t border-slate-100 dark:border-(--card-border-color)">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="flex-1 h-11 rounded-lg text-slate-600 dark:text-slate-400 bg-slate-100 hover:bg-slate-200 dark:bg-page-body dark:hover:bg-(--table-hover) transition-all"
          >
            {t("common_cancel")}
          </Button>
          <Button
            type="button"
            disabled={isLoading || !user?.current_plan}
            onClick={handleSave}
            className="flex-1 h-11 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("common_saving")}
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4" />
                {t("common_apply_override", { defaultValue: "Apply Override" })}
              </>
            )}
          </Button>
        </DialogFooter>
        {!user?.current_plan && (
          <p className="text-center text-xs text-red-500 pb-4">
            {t("common_no_active_subscription")}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OverrideLimitsModal;
