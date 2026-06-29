"use client";

import { Button } from "@/src/elements/ui/button";
import ConfirmModal from "@/src/shared/ConfirmModal";
import { PlanCardProps } from "@/src/types/components";
import { Check, Pencil, Trash2, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/src/redux/hooks";
import { numericFeatures, booleanFeatures } from "@/src/data/Plans";
import { PlanFeatures } from "@/src/types/store";
import { ROUTES } from "../../constants";
import Can from "../shared/Can";

const PlanCard = ({ plan, onDelete, isLoading, isHighlighted }: PlanCardProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const settings = useAppSelector((state) => state.settings.data);
  const defaultCurrencyCode = settings?.default_currency?.code || "USD";

  const handleDeleteClick = () => {
    setDeleteId(plan._id);
  };

  const handleEditClick = () => {
    router.push(`${ROUTES.ManagePlansEdit}/${plan._id}`);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const formatPrice = (price: number, currency: string = defaultCurrencyCode) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBillingCycleDays = (cycle: string, trialDays: number) => {
    if (trialDays > 0) {
      return t("plan_billing_trial", { days: trialDays });
    }
    switch (cycle) {
      case "monthly":
        return t("plan_billing_per_month");
      case "yearly":
        return t("plan_billing_per_year");
      case "lifetime":
        return t("plan_billing_lifetime");
      case "free Trial":
        return t("plan_free_trial");
      default:
        return "";
    }
  };

  const getFeaturesList = () => {
    return numericFeatures
      .filter((feature) => {
        if (feature.hasToggle) {
          if (plan.enabled_features) {
            return !!plan.enabled_features[feature.id];
          }
          return true;
        }
        return true;
      })
      .map((feature) => {
        const value = plan.features[feature.id as keyof PlanFeatures];
        if (value === undefined || value === null) return null;

        const label = t(`plan_features_${feature.id}`);
        const cleanLabel = label.split("(")[0].trim();
        const displayValue = value === 0 ? t("plan_features_unlimited") || "Unlimited" : value;
        return `${displayValue} ${cleanLabel}`;
      })
      .filter(Boolean) as string[];
  };

  const getCapabilitiesList = () => {
    return booleanFeatures.filter((feature) => !!plan.features[feature.id as keyof PlanFeatures]).map((feature) => t(`plan_features_${feature.id}`));
  };

  const features = getFeaturesList();
  const capabilities = getCapabilitiesList();

  const LIMIT = 6;
  const showFeatures = isExpanded ? features : features.slice(0, LIMIT);
  const showCapabilities = isExpanded ? capabilities : capabilities.slice(0, LIMIT);
  const hasMore = features.length > LIMIT || capabilities.length > LIMIT;

  return (
    <>
      <div
        className={`
        relative bg-white dark:bg-(--card-color) rounded-lg border p-6 transition-all duration-500 flex flex-col w-full ring-1 ring-(--text-green-primary)
        ${isHighlighted ? "" : "border-slate-200 dark:border-(--card-border-color)"}
        ${plan.is_featured && !isHighlighted ? "border-(--text-green-primary) shadow-sm" : ""}
      `}
        style={{ minHeight: "580px" }}
      >
        {/* Most Popular Badge */}
        {plan.is_featured && (
          <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-10">
            <span className="flex items-center gap-1 px-3 sm:px-4 py-1 sm:py-1.5 bg-(--text-green-primary) text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg whitespace-nowrap">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t("plan_most_popular")}</span>
            </span>
          </div>
        )}

        {/* ── ZONE 1: Plan Header (always fully visible) ── */}
        <div className="text-center mb-5 shrink-0">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 truncate">{plan.name}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{plan.description || t("plan_perfect_plan")}</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-medium text-slate-900 dark:text-white">{plan.currency.symbol}</span>
            <span className="text-5xl font-bold text-slate-900 dark:text-white">{formatPrice(plan.price, plan.currency.code).replace(/[^0-9.,]/g, "")}</span>
            <span className="text-slate-600 dark:text-slate-400 text-sm">{getBillingCycleDays(plan.billing_cycle, plan.trial_days)}</span>
          </div>
          {plan.original_price && plan.original_price > plan.price && (
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 line-through">{formatPrice(plan.original_price, plan.currency.code)}</p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-(--card-border-color) mb-4 shrink-0" />

        {/* ── ZONE 2: Features (flex-1, clips when collapsed, expands when toggled) ── */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {/* Usage Limits */}
          {showFeatures.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">{t("plan_usage_limits")}</h4>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-3">
                {showFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-1.5">
                    <div className="mt-0.5 w-4 h-4 shrink-0 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/20">
                      <Check className="w-2 h-2 text-(--text-green-primary)" />
                    </div>
                    <span className="text-xs text-slate-700 dark:text-slate-300 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Capabilities */}
          {showCapabilities.length > 0 && (
            <div className="mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">{t("plan_capabilities")}</h4>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-3">
                {showCapabilities.map((feature, index) => (
                  <li key={index} className="flex items-start gap-1.5">
                    <div className="mt-0.5 w-4 h-4 shrink-0 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/20">
                      <Check className="w-2 h-2 text-(--text-green-primary)" />
                    </div>
                    <span className="text-xs text-slate-700 dark:text-slate-300 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── ZONE 3: Footer — View More toggle + Action Buttons (always pinned at bottom) ── */}
        <div className="shrink-0 mt-4">
          {/* View More / Less toggle */}
          {hasMore && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="w-full mb-3 text-xs font-bold flex items-center justify-center gap-1 py-1 rounded-md transition-all cursor-pointer text-(--text-green-primary) hover:bg-emerald-50 dark:hover:bg-emerald-900/10 focus:outline-none"
            >
              {isExpanded ? (
                <>
                  <span>{t("view_less") || "View Less"}</span>
                  <ChevronUp className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  <span>{t("view_more") || "View More"}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Can permission="update.plans">
              <Button
                onClick={handleEditClick}
                disabled={isLoading}
                className="shadow-none flex-1 px-3 py-5 rounded-lg font-semibold transition-all flex items-center justify-center bg-primary text-white hover:opacity-90"
              >
                <Pencil className="w-4 h-4 mr-1.5 shrink-0" />
                {t("plan_update_button")}
              </Button>
            </Can>
            <Can permission="delete.plans">
              <Button
                onClick={handleDeleteClick}
                disabled={isLoading}
                className="shadow-none flex-1 px-3 py-5 rounded-lg font-semibold dark:bg-red-900/20 text-red-600 dark:text-red-400 bg-red-100 hover:bg-red-200 dark:hover:bg-red-800/30 transition-colors flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4 mr-1.5 shrink-0" />
                {t("common_delete")}
              </Button>
            </Can>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isLoading}
        title={t("plan_delete")}
        subtitle={t("common_delete_confirmation", {
          item: t("nav_manage_plan"),
        })}
        confirmText={t("common_delete")}
        cancelText={t("common_cancel")}
        variant="danger"
        loadingText={t("common_deleting")}
      />
    </>
  );
};

export default PlanCard;
