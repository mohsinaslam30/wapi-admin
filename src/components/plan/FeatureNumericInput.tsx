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
  disabled = false,
  disabledTooltip,
  note,
}: FeatureNumericInputProps) => {
  const { t } = useTranslation();

  // If no toggle is shown, the feature is effectively always enabled
  const isActuallyEnabled = !disabled && (!showToggle || enabled);

  return (
    <div className={`space-y-2.5 flex flex-col group transition-opacity ${disabled ? "opacity-55" : !isActuallyEnabled ? "opacity-70" : ""}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-focus-within:text-(--text-green-primary) transition-colors">
          {label}
        </Label>
        {showToggle && (
          <Switch
            checked={enabled && !disabled}
            disabled={disabled}
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
                disabled={!isActuallyEnabled || disabled}
                onChange={(e) => onChange(e.target.value)}
                className={`dark:bg-page-body p-3 dark:border-(--card-border-color) h-11 bg-gray-50/50 border-gray-200 focus:border-(--text-green-primary) focus:ring-1 focus:ring-(--text-green-primary) transition-all rounded-lg ${(!isActuallyEnabled || disabled) ? "cursor-not-allowed bg-gray-100 dark:bg-(--page-body-bg)" : ""}`}
              />
            </div>
          </TooltipTrigger>
          {(disabled || !isActuallyEnabled) && (
            <TooltipContent className="bg-slate-900 text-white dark:bg-(--page-body-bg) border-none text-xs py-2 px-3 shadow-xl max-w-xs">
              <p>{disabled ? (disabledTooltip || t("plan_feature_disabled_tooltip")) : t("plan_feature_disabled_tooltip")}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      {note && (
        <span className="text-[11px] text-amber-600 dark:text-amber-500/90 font-medium leading-normal block -mt-1 select-none">
          * {note}
        </span>
      )}
    </div>
  );
};

export default FeatureNumericInput;
