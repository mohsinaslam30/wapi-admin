"use client";

import { Button } from "@/src/elements/ui/button";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { ColorConfigFormProps } from "@/src/types/landingPage";
import { Palette } from "lucide-react";
import { useEffect, useState } from "react";

const ColorConfigForm = ({ data, onChange }: ColorConfigFormProps) => {
  const [primaryColor, setPrimaryColor] = useState(
    data?.primary_color || "#25d366",
  );

  useEffect(() => {
    if (data) {
      setPrimaryColor(data.primary_color || "#25d366");
    }
  }, [data]);

  const handlePrimaryColorChange = (color: string) => {
    setPrimaryColor(color);
    onChange({ primary_color: color, gradient: data?.gradient });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-(--card-border-color)">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <Palette className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Page Color Configuration
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Customize the primary color for this page
          </p>
        </div>
      </div>

      {/* Primary Color */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex flex-wrap items-center gap-2">
          Primary Color
          <span className="text-xs font-normal text-gray-700 dark:text-gray-300">
            (Used for buttons, badges, and accents)
          </span>
        </Label>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Input
              type="color"
              value={primaryColor}
              onChange={(e) => handlePrimaryColorChange(e.target.value)}
              className="w-16! h-16! cursor-pointer rounded-lg border-2 border-gray-200 dark:border-(--card-border-color) p-1"
            />
          </div>
          <div className="flex-1">
            <Input
              type="text"
              value={primaryColor}
              onChange={(e) => handlePrimaryColorChange(e.target.value)}
              placeholder="#25d366"
              className="font-mono dark:bg-(--page-body-bg) text-sm"
            />
            <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
              Enter hex color code (e.g., #25d366)
            </p>
          </div>
        </div>
        {/* Color Preview */}
        <div className="mt-3 p-4 rounded-lg bg-gray-50 dark:bg-page-body border border-gray-100 dark:border-(--card-border-color)">
          <p className="text-xs font-medium text-slate-600 dark:text-gray-300 mb-2">
            Preview:
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              className="px-4 py-2 rounded-lg text-white font-medium text-sm transition-all hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              Primary Button
            </Button>
            <div
              className="px-4 py-2 rounded-lg font-medium text-sm"
              style={{
                backgroundColor: `${primaryColor}20`,
                color: primaryColor,
              }}
            >
              Badge
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorConfigForm;
