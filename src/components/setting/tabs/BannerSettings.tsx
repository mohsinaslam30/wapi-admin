/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { Button } from "@/src/elements/ui/button";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { AppSettings } from "@/src/redux/api/settingApi";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import SettingCard from "../shared/SettingCard";
import SettingToggle from "../shared/SettingToggle";
import { Megaphone, AlignLeft, AlignCenter, AlignRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const BannerSettings = ({ isLoading }: { isLoading?: boolean }) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);

  const onChange = (key: keyof AppSettings, value: any) => {
    dispatch(updateSettingField({ key, value }));
  };

  // Safe defaults
  const isBanner = settings.is_banner ?? false;
  const bannerText = settings.banner_text ?? "Welcome to our platform! Enjoy our premium services.";
  const bannerPosition = settings.banner_possion ?? "center";
  const bannerBgColor = settings.banner_bg_color ?? "#f59e0b"; // Default amber-500
  const bannerTextColor = settings.banner_text_color ?? "#000000"; // Default black

  const getAlignmentClass = (pos: string) => {
    switch (pos) {
      case "left":
        return "justify-start text-left";
      case "right":
        return "justify-end text-right";
      case "center":
      default:
        return "justify-center text-center";
    }
  };

  return (
    <div className="space-y-5">
      {/* Real-time Premium Preview */}
      <SettingCard title="Live Banner Preview" description="See how your announcement banner will look on the front-end in real-time.">
        <div className="border border-gray-100 dark:border-(--card-border-color) rounded-lg p-6 bg-gray-50 dark:bg-(--dark-body) flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Live Preview:</p>
          {isBanner ? (
            <div
              style={{ backgroundColor: bannerBgColor, color: bannerTextColor }}
              className={`py-2.5 px-4 rounded-md flex items-center gap-2 font-medium text-sm transition-all duration-200 shadow-sm ${getAlignmentClass(bannerPosition)}`}
            >
              <span>{bannerText || "Banner text goes here..."}</span>
            </div>
          ) : (
            <div className="py-6 px-4 rounded-md border border-dashed border-gray-200 dark:border-zinc-700 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 bg-white dark:bg-(--card-color)">
              <Megaphone className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm font-medium">Header Banner is currently disabled</p>
            </div>
          )}
        </div>
      </SettingCard>

      {/* Main Configuration Card */}
      <SettingCard title="Banner Configuration" description="Manage visibility, text alignment, and colors of the front-end header announcement banner.">
        <div className="space-y-6">
          <SettingToggle
            label="Enable Announcement Banner"
            description="Display a premium banner at the top of the header on the front-end."
            checked={isBanner}
            onCheckedChange={(v) => onChange("is_banner", v)}
            disabled={isLoading}
          />

          {isBanner && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-gray-100 dark:border-(--card-border-color) transition-all duration-350 ease-in-out">
              {/* Banner Text Input */}
              <div className="space-y-1.5 flex flex-col md:col-span-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Banner Content Text</Label>
                <Input
                  value={settings.banner_text ?? ""}
                  onChange={(e) => onChange("banner_text", e.target.value)}
                  placeholder="Enter your announcement text..."
                  className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
                  maxLength={150}
                />
                <p className="text-xs text-gray-400 dark:text-gray-500">Max 150 characters.</p>
              </div>

              {/* Banner Position Grid Boxes */}
              <div className="space-y-2.5 flex flex-col md:col-span-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Text Alignment (Position)</Label>
                <div className="grid grid-cols-3 gap-3 [@media(max-width:566px)]:grid-cols-1!">
                  {(["left", "center", "right"] as const).map((pos) => {
                    const isActive = bannerPosition === pos;
                    return (
                      <Button
                        key={pos}
                        type="button"
                        onClick={() => onChange("banner_possion", pos)}
                        className={cn(
                          "relative p-4 h-[54px] rounded-lg border text-sm font-medium transition-all duration-200 w-full flex items-center justify-center gap-2",
                          isActive
                            ? "border-primary bg-primary/5 hover:bg-primary/5 text-primary"
                            : "border-slate-200 dark:border-(--card-border-color) text-slate-500 bg-[unset]! hover:border-primary/40 shadow-none!"
                        )}
                      >
                        {pos === "left" && <AlignLeft className="w-4 h-4 shrink-0" />}
                        {pos === "center" && <AlignCenter className="w-4 h-4 shrink-0" />}
                        {pos === "right" && <AlignRight className="w-4 h-4 shrink-0" />}
                        <span className="capitalize">{pos}</span>
                        {isActive && (
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </span>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Background Color Picker */}
              <div className="space-y-1.5 flex flex-col">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Banner Background Color</Label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-page-body rounded-lg transition-colors border border-gray-100 dark:border-(--card-border-color) group">
                  <div className="relative shrink-0 w-8 h-8 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-sm">
                    <input
                      type="color"
                      value={bannerBgColor}
                      onChange={(e) => onChange("banner_bg_color", e.target.value)}
                      className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer scale-150"
                    />
                    <div className="w-8 h-8 pointer-events-none absolute inset-0" style={{ backgroundColor: bannerBgColor }} />
                  </div>
                  <Input
                    type="text"
                    value={bannerBgColor}
                    onChange={(e) => onChange("banner_bg_color", e.target.value)}
                    placeholder="#f59e0b"
                    className="flex-1 bg-transparent text-sm font-mono font-semibold text-slate-700 dark:text-slate-200 outline-none border-none shadow-none focus-visible:ring-0 p-0 h-auto uppercase"
                  />
                </div>
              </div>

              {/* Text Color Picker */}
              <div className="space-y-1.5 flex flex-col">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Banner Text Color</Label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-page-body rounded-lg transition-colors border border-gray-100 dark:border-(--card-border-color) group">
                  <div className="relative shrink-0 w-8 h-8 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-sm">
                    <input
                      type="color"
                      value={bannerTextColor}
                      onChange={(e) => onChange("banner_text_color", e.target.value)}
                      className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer scale-150"
                    />
                    <div className="w-8 h-8 pointer-events-none absolute inset-0" style={{ backgroundColor: bannerTextColor }} />
                  </div>
                  <Input
                    type="text"
                    value={bannerTextColor}
                    onChange={(e) => onChange("banner_text_color", e.target.value)}
                    placeholder="#000000"
                    className="flex-1 bg-transparent text-sm font-mono font-semibold text-slate-700 dark:text-slate-200 outline-none border-none shadow-none focus-visible:ring-0 p-0 h-auto uppercase"
                  />
                </div>
              </div>

            </div>
          )}
        </div>
      </SettingCard>
    </div>
  );
};

export default BannerSettings;
