"use client";

import { Check, Facebook, Instagram, Send, Info } from "lucide-react";
import { TwitterIcon } from "@/src/utils/customIcon";
import { PlanFeaturesProps } from "@/src/types/components";
import FeatureNumericInput from "./FeatureNumericInput";
import FeatureToggle from "./FeatureToggle";
import { booleanFeatures, numericFeatures } from "@/src/data/Plans";
import { useTranslation } from "react-i18next";
import { Switch } from "@/src/elements/ui/switch";

interface PlanFeaturesComponentProps extends PlanFeaturesProps {
  mode?: "all" | "numeric" | "boolean";
  omnichannelPlatforms?: string[];
}

const PlanFeatures = ({
  features,
  enabled_features,
  onFeatureChange,
  mode = "all",
  omnichannelPlatforms
}: PlanFeaturesComponentProps) => {
  const { t } = useTranslation();

  const showNumeric = mode === "all" || mode === "numeric";
  const showBoolean = mode === "all" || mode === "boolean";

  const handleToggleChange = (featureId: string, isChecked: boolean) => {
    onFeatureChange(featureId, isChecked);
    if (isChecked) {
      // If enabling a child feature, make sure parent is enabled
      const feat = booleanFeatures.find((f) => f.id === featureId);
      if (feat && (feat as any).parentFeatureId) {
        onFeatureChange((feat as any).parentFeatureId, true);
      }
    } else {
      // If disabling a parent feature, disable all its children
      const feat = booleanFeatures.find((f) => f.id === featureId);
      if (feat && !(feat as any).parentFeatureId) {
        const childFeats = booleanFeatures.filter((f) => (f as any).parentFeatureId === featureId);
        childFeats.forEach((child) => {
          onFeatureChange(child.id, false);
        });
      }
      if (featureId === "omnichannel_facebook") {
        onFeatureChange("enabled_facebookAds_campaign", false);
        onFeatureChange("enabled_facebook_lead", false);
      }
    }
  };

  const channelCards = [
    {
      id: "omnichannel_facebook",
      platform: "facebook",
      title: "Facebook Messenger",
      description: t("plan_features_omnichannel_facebook_desc") || "Enable Facebook Messenger channel integration",
      icon: <Facebook className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      headerClass: "bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-100/50 dark:border-blue-900/20",
      borderClass: "border-t-4 border-t-blue-500",
      accentBg: "bg-blue-100/40 dark:bg-blue-900/20",
      switchColor: "peer-checked:!bg-blue-600",
    },
    {
      id: "omnichannel_instagram",
      platform: "instagram",
      title: "Instagram Direct",
      description: t("plan_features_omnichannel_instagram_desc") || "Enable Instagram Direct channel integration",
      icon: <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
      headerClass: "bg-pink-50/50 dark:bg-pink-900/10 border-b border-pink-100/50 dark:border-pink-900/20",
      borderClass: "border-t-4 border-t-pink-500",
      accentBg: "bg-pink-100/40 dark:bg-pink-900/20",
      switchColor: "peer-checked:!bg-pink-600",
    },
    {
      id: "omnichannel_telegram",
      platform: "telegram",
      title: "Telegram Bot",
      description: t("plan_features_omnichannel_telegram_desc") || "Enable Telegram Bot channel integration",
      icon: <Send className="w-5 h-5 text-sky-500 dark:text-sky-400" />,
      headerClass: "bg-sky-50/50 dark:bg-sky-950/10 border-b border-sky-100/50 dark:border-sky-950/20",
      borderClass: "border-t-4 border-t-sky-500",
      accentBg: "bg-sky-100/40 dark:bg-sky-950/20",
      switchColor: "peer-checked:!bg-sky-500",
    },
    // {
    //   id: "omnichannel_twitter",
    //   platform: "twitter",
    //   title: "Twitter Channel",
    //   description: t("plan_features_omnichannel_twitter_desc") || "Enable Twitter / X channel integration",
    //   icon: <TwitterIcon className="w-5 h-5 text-black dark:text-white" />,
    //   headerClass: "bg-gray-50/50 dark:bg-gray-900/10 border-b border-gray-100/50 dark:border-gray-900/20",
    //   borderClass: "border-t-4 border-t-black dark:border-t-white",
    //   accentBg: "bg-gray-100/40 dark:bg-gray-900/20",
    //   switchColor: "peer-checked:!bg-black",
    // },
  ];

  return (
    <div className="space-y-8 w-full">
      {/* Numeric Features */}
      {showNumeric && (
        <div className="dark:bg-(--card-color) dark:border-(--card-border-color) bg-white rounded-lg shadow-sm sm:p-6 p-4 border border-gray-100/80 dark:border-(--card-border-color) transition-all">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-(--text-green-primary)/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-(--text-green-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white leading-none">
                {t("plan_plan_features")}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {t("plan_plan_features_desc") || "Configure the limits and capabilities of this plan"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-400 mb-6">{t("plan_usage_limits") || "Usage Limits"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {numericFeatures.map((feature) => {
                const value = features[feature.id as keyof typeof features] as string;
                const isEnabled = enabled_features[feature.id] ?? false;
                const isFacebookChannelEnabled = !!features.omnichannel_facebook;
                const isFbFeature = feature.id === "facebookAds_campaign" || feature.id === "facebook_lead";
                const isDisabled = isFbFeature && !isFacebookChannelEnabled;
                const noteText = isFbFeature
                  ? (t("plan_feature_requires_facebook_messenger") || "Requires Facebook Channel to be enabled")
                  : undefined;

                return (
                  <FeatureNumericInput
                    key={feature.id}
                    id={feature.id}
                    label={t(`plan_features_${feature.id}`) || feature.label}
                    placeholder={t(`plan_features_${feature.id}_placeholder`) || feature.placeholder}
                    value={value || ""}
                    enabled={isEnabled}
                    showToggle={feature.hasToggle}
                    disabled={isDisabled}
                    disabledTooltip={noteText}
                    note={noteText}
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
        </div>
      )}

      {/* Boolean Features */}
      {showBoolean && (
        <>
          {/* Card 1: General Capabilities */}
          <div className="dark:bg-(--card-color) dark:border-(--card-border-color) bg-white rounded-lg shadow-sm sm:p-6 p-4 border border-gray-100/80 dark:border-(--card-border-color) transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-(--text-green-primary)/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-(--text-green-primary)" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-gray-900 dark:text-white leading-none">
                  {t("plan_capabilities") || "Capabilities"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t("plan_capabilities_desc") || "Enable or disable global capabilities for this plan"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {booleanFeatures
                .filter((f) => !(f as any).parentFeatureId && !f.id.startsWith("omnichannel_"))
                .map((feature) => {
                  const checked = features[feature.id as keyof typeof features] as boolean;
                  return (
                    <FeatureToggle
                      key={feature.id}
                      id={feature.id}
                      label={t(`plan_features_${feature.id}`) || feature.label}
                      description={t(`plan_features_${feature.id}_desc`) || feature.description}
                      icon={feature.icon}
                      checked={checked ?? false}
                      onCheckedChange={(val) => handleToggleChange(feature.id, val)}
                    />
                  );
                })}
            </div>
          </div>

          {/* 3 Channels Cards Stack */}
          <div className="grid grid-cols-1 gap-6">
            {channelCards.map((card) => {
              const platformDisabled = omnichannelPlatforms ? !omnichannelPlatforms.includes(card.platform) : false;
              const parentChecked = platformDisabled ? false : (features[card.id as keyof typeof features] as boolean);
              const children = booleanFeatures.filter((f) => (f as any).parentFeatureId === card.id);

              return (
                <div
                  key={card.id}
                  className={`flex flex-col bg-white dark:bg-(--card-color) rounded-lg shadow-sm border border-gray-100 dark:border-(--card-border-color) overflow-hidden transition-all duration-200 hover:shadow-md ${card.borderClass} ${platformDisabled ? "opacity-60" : ""}`}
                >
                  {/* Card Header */}
                  <div className={`p-4 flex items-center justify-between ${card.headerClass}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.accentBg}`}>
                        {card.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-950 dark:text-white leading-tight">
                          {card.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                          {platformDisabled ? t("plan_features_disabled_omnichannel_tooltip") : t("plan_channel_subfeatures") || "Channel Subfeatures"}
                        </p>
                      </div>
                    </div>
                    {!platformDisabled && (
                      <Switch
                        id={card.id}
                        checked={parentChecked}
                        onCheckedChange={(val) => handleToggleChange(card.id, val)}
                        className={card.switchColor}
                      />
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    {platformDisabled ? (
                      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 dark:bg-page-body/30 text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <Info className="w-4 h-4 shrink-0 text-gray-400 mt-0.5" />
                        <span>{t("plan_features_disabled_omnichannel_tooltip") || "To enable this channel, please select it in Channel Platforms system settings."}</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3.5">
                        {children.map((child) => {
                          const childChecked = (features[child.id as keyof typeof features] as boolean) ?? false;
                          // Child toggles are disabled if the parent channel is not checked
                          const isChildDisabled = !parentChecked;

                          return (
                            <div
                              key={child.id}
                              className={`transition-opacity duration-200 ${isChildDisabled ? "opacity-45" : "opacity-100"}`}
                            >
                              <FeatureToggle
                                id={child.id}
                                label={t(`plan_features_${child.id}`) || child.label}
                                description={t(`plan_features_${child.id}_desc`) || child.description}
                                icon={child.icon}
                                checked={childChecked}
                                disabled={isChildDisabled}
                                onCheckedChange={(val) => handleToggleChange(child.id, val)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default PlanFeatures;
