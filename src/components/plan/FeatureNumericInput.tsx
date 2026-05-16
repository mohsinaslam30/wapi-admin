"use client";

import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { FeatureNumericInputProps } from "@/src/types/components";
import { Switch } from "@/src/elements/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/elements/ui/tooltip";
import { useTranslation } from "react-i18next";

const FeatureNumericInput = ({
  id,
  label,
  placeholder,
  value,
  enabled,
  showToggle = false,
  onEnabledChange,
  onChange,
}: FeatureNumericInputProps) => {
  const { t } = useTranslation();

  // If no toggle is shown, the feature is effectively always enabled
  const isActuallyEnabled = !showToggle || enabled;

  return (
    <div className={`space-y-2.5 flex flex-col group transition-opacity ${!isActuallyEnabled ? "opacity-70" : ""}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-focus-within:text-(--text-green-primary) transition-colors">
          {label}
        </Label>
        {showToggle && (
          <Switch
            checked={enabled}
            onCheckedChange={onEnabledChange}
            className="data-[state=checked]:bg-(--text-green-primary)"
          />
        )}
      </div>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              <Input
                id={id}
                type="number"
                placeholder={placeholder}
                value={value}
                disabled={!isActuallyEnabled}
                onChange={(e) => onChange(e.target.value)}
                className={`dark:bg-page-body p-3 dark:border-(--card-border-color) h-11 bg-gray-50/50 border-gray-200 focus:border-(--text-green-primary) focus:ring-1 focus:ring-(--text-green-primary) transition-all rounded-lg ${!isActuallyEnabled ? "cursor-not-allowed bg-gray-100 dark:bg-(--page-body-bg)" : ""}`}
              />
            </div>
          </TooltipTrigger>
          {!isActuallyEnabled && (
            <TooltipContent className="bg-slate-900 text-white dark:bg-(--page-body-bg) border-none text-xs py-2 px-3 shadow-xl">
              <p>{t("plan_feature_disabled_tooltip")}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FeatureNumericInput;
