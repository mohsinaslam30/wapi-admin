"use client";

import { Label } from "@/src/elements/ui/label";
import { Switch } from "@/src/elements/ui/switch";
import { FeatureToggleProps } from "@/src/types/components";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/elements/ui/tooltip";

const FeatureToggle = ({
  id,
  label,
  description,
  icon,
  checked,
  onCheckedChange,
  disabled = false,
  disabledTooltip,
}: FeatureToggleProps) => {
  const content = (
    <div 
      className={`flex items-start gap-3 py-3 px-3 sm:px-4 rounded-lg border border-gray-100 dark:border-(--card-border-color) transition-all group ${
        disabled 
          ? "opacity-60 cursor-not-allowed bg-gray-50/20 dark:bg-page-body/30" 
          : "hover:border-gray-100 dark:hover:border-(--card-border-color) hover:bg-gray-50/50 dark:hover:bg-page-body cursor-pointer"
      }`}
    >
      <div 
        className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg flex items-center justify-center transition-colors ${
          disabled
            ? "bg-gray-100 text-gray-400 dark:bg-slate-800"
            : "bg-(--text-green-primary)/10 text-(--text-green-primary) group-hover:bg-(--text-green-primary)/20"
        }`}
      >
        <div>{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <Label 
          htmlFor={disabled ? undefined : id} 
          className={`text-sm font-bold text-gray-900 dark:text-gray-200 block leading-tight ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {label}
        </Label>
        <div className="flex items-center justify-between gap-3 mt-1.5">
          <p className="flex-1 min-w-0 text-xs text-gray-500 dark:text-gray-400 leading-normal">{description}</p>
          <Switch 
            id={id} 
            checked={checked} 
            disabled={disabled} 
            onCheckedChange={onCheckedChange} 
            className="data-[state=checked]:bg-(--text-green-primary) shrink-0" 
          />
        </div>
      </div>
    </div>
  );

  if (disabled && disabledTooltip) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full select-none">{content}</div>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-900 text-white dark:bg-(--page-body-bg) border border-slate-800 dark:border-slate-700 text-xs py-2 px-3 shadow-xl max-w-xs leading-normal z-200">
            <p>{disabledTooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

export default FeatureToggle;
