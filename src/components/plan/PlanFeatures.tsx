"use client";

import { Check } from "lucide-react";
import { PlanFeaturesProps } from "@/src/types/components";
import FeatureNumericInput from "./FeatureNumericInput";
import FeatureToggle from "./FeatureToggle";
import { booleanFeatures, numericFeatures } from "@/src/data/Plans";
import { useTranslation } from "react-i18next";

const PlanFeatures = ({ features, enabled_features, onFeatureChange, mode = "all" }: PlanFeaturesProps & { mode?: "all" | "numeric" | "boolean" }) => {
  const { t } = useTranslation();

  const showNumeric = mode === "all" || mode === "numeric";
  const showBoolean = mode === "all" || mode === "boolean";

  return (
    <div className="dark:bg-(--card-color) dark:border-(--card-border-color) bg-white rounded-lg shadow-sm sm:p-6 p-4 transition-all">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-(--text-green-primary)/10 flex items-center justify-center">
          <Check className="w-5 h-5 text-(--text-green-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white leading-none">
            {mode === "boolean" ? t("plan_capabilities") : t("plan_plan_features")}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {mode === "boolean" ? t("plan_capabilities_desc") : t("plan_plan_features_desc") || "Configure the limits and capabilities of this plan"}
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {/* Numeric Features */}
        {showNumeric && (
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">{t("plan_usage_limits") || "Usage Limits"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {numericFeatures.map((feature) => {
                const value = features[feature.id as keyof typeof features] as string;
                const isEnabled = enabled_features[feature.id] ?? false;
                return (
                  <FeatureNumericInput
                    key={feature.id}
                    id={feature.id}
                    label={t(`plan_features_${feature.id}`) || feature.label}
                    placeholder={t(`plan_features_${feature.id}_placeholder`) || feature.placeholder}
                    value={value || ""}
                    enabled={isEnabled}
                    showToggle={feature.hasToggle}
                    onEnabledChange={(enabled) => {
                      onFeatureChange(`enabled_${feature.id}`, enabled);
                      // Dependency: contacts -> segments, template_bots, campaigns
                      if (feature.id === "contacts" && !enabled) {
                        onFeatureChange("enabled_segments", false);
                        onFeatureChange("enabled_template_bots", false);
                        onFeatureChange("enabled_campaigns", false);
                      }
                      // Dependency: template_bots -> campaigns
                      if (feature.id === "template_bots" && !enabled) {
                        onFeatureChange("enabled_campaigns", false);
                      }

                      // Dependency: staff -> teams
                      if (feature.id === "staff" && !enabled) {
                        onFeatureChange("enabled_teams", false);
                      }

                      // Dependency: teams -> staff
                      if (feature.id === "teams" && enabled) {
                        onFeatureChange("enabled_staff", true);
                      }

                      // Dependency: segments, template_bots, campaigns -> contacts
                      if (["segments", "template_bots", "campaigns"].includes(feature.id) && enabled) {
                        onFeatureChange("enabled_contacts", true);
                      }
                      // Dependency: campaigns -> template_bots
                      if (feature.id === "campaigns" && enabled) {
                        onFeatureChange("enabled_template_bots", true);
                      }
                    }}
                    onChange={(value) => onFeatureChange(feature.id, value)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Boolean Features with Toggle Switches */}
        {showBoolean && (
          <div className={`${showNumeric ? "border-t border-gray-100 pt-10 dark:border-(--card-border-color)" : ""}`}>
            <h3 className="text-sm font-bold text-gray-400 mb-6">{t("plan_capabilities") || "Capabilities"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {booleanFeatures.map((feature) => {
                const checked = features[feature.id as keyof typeof features] as boolean;
                return <FeatureToggle key={feature.id} id={feature.id} label={t(`plan_features_${feature.id}`) || feature.label} description={t(`plan_features_${feature.id}_desc`) || feature.description} icon={feature.icon} checked={checked ?? false} onCheckedChange={(checked) => onFeatureChange(feature.id, checked)} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanFeatures;
