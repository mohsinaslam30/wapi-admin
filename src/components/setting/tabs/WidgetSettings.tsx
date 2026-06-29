/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { AppSettings } from "@/src/redux/api/settingApi";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import SettingCard from "../shared/SettingCard";
import SettingToggle from "../shared/SettingToggle";
import { useState } from "react";
import { 
  MessageCircle, 
  MessageSquare, 
  Send, 
  Instagram, 
  Facebook, 
  Settings,
  Link
} from "lucide-react";

const WidgetSettings = ({ isLoading }: { isLoading?: boolean }) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);

  const onChange = (key: keyof AppSettings, value: any) => {
    dispatch(updateSettingField({ key, value }));
  };

  // Safe defaults
  const widgetEnabled = settings.widget_enabled ?? true;
  const whatsappUrl = settings.widget_whatsapp_url ?? "";
  const telegramUrl = settings.widget_telegram_url ?? "";
  const instagramUrl = settings.widget_instagram_url ?? "";
  const facebookUrl = settings.widget_facebook_url ?? "";

  const [isPreviewOpen, setIsPreviewOpen] = useState(true);

  // Active channels for preview
  const channels = [
    { id: "whatsapp", name: "WhatsApp", url: whatsappUrl, color: "bg-[#25D366] text-white", icon: MessageSquare },
    { id: "telegram", name: "Telegram", url: telegramUrl, color: "bg-[#0088cc] text-white", icon: Send },
    { id: "instagram", name: "Instagram", url: "https://instagram.com/...", color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white", icon: Instagram, rawUrl: instagramUrl },
    { id: "facebook", name: "Messenger", url: facebookUrl, color: "bg-[#006AFF] text-white", icon: Facebook },
  ].filter(c => c.id === "instagram" ? (c.rawUrl && c.rawUrl.trim() !== "") : (c.url && c.url.trim() !== ""));

  return (
    <div className="space-y-5">
      {/* Real-time Widget Preview */}
      <SettingCard 
        title="Live Widget Preview" 
        description="Interact with the live preview to see how the floating widget will behave on the landing page."
      >
        <div className="border border-gray-100 dark:border-(--card-border-color) rounded-lg p-6 bg-gray-50 dark:bg-(--dark-body) flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Live Preview:</p>
          
          {widgetEnabled ? (
            <div className="relative h-48 border border-dashed border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-(--card-color) flex items-center justify-center overflow-hidden">
              <span className="text-xs text-gray-400 absolute top-3 left-3 select-none pointer-events-none">Bottom-Left Screen Area</span>
              
              {/* Floating Widget Mockup */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                      isPreviewOpen ? "bg-white text-zinc-800 border border-zinc-200" : "bg-primary text-white hover:scale-105"
                    }`}
                  >
                    {isPreviewOpen ? <span className="font-bold text-sm">X</span> : <MessageCircle size={22} />}
                  </button>
                  {isPreviewOpen && (
                    <div className="absolute top-full left-0 mt-1 w-max bg-zinc-800 text-[8px] text-zinc-400 py-0.5 px-1.5 rounded shadow-sm border border-zinc-700 select-none whitespace-nowrap">
                      Widget by <span className="font-semibold text-primary">{settings.app_name || "."}</span>
                    </div>
                  )}
                </div>

                <div 
                  className={`flex items-center gap-2 transition-all duration-500 origin-left ${
                    isPreviewOpen ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 -translate-x-4 pointer-events-none"
                  }`}
                >
                  {channels.length > 0 ? (
                    channels.map((ch, i) => {
                      const Icon = ch.icon;
                      return (
                        <div
                          key={ch.id}
                          style={{ transitionDelay: `${i * 40}ms` }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm cursor-pointer ${ch.color}`}
                          title={ch.name}
                        >
                          <Icon size={16} />
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-xs italic text-gray-400 dark:text-gray-500 ml-1">No channels configured</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-10 px-4 rounded-md border border-dashed border-gray-200 dark:border-zinc-700 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 bg-white dark:bg-(--card-color)">
              <Settings className="w-8 h-8 mb-2 opacity-50 animate-spin" style={{ animationDuration: '4s' }} />
              <p className="text-sm font-medium">Landing Page Widget is currently disabled</p>
            </div>
          )}
        </div>
      </SettingCard>

      {/* Configuration Inputs */}
      <SettingCard 
        title="Landing Widget Configurations" 
        description="Enable/disable and manage the direct links for each channel icon shown in the dynamic landing page widget."
      >
        <div className="space-y-6">
          <SettingToggle
            label="Enable Landing Widget"
            description="Display the floating omnichannel widget on public landing, product details, and custom pages."
            checked={widgetEnabled}
            onCheckedChange={(v) => onChange("widget_enabled", v)}
            disabled={isLoading}
          />

          {widgetEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-gray-100 dark:border-(--card-border-color) transition-all duration-350 ease-in-out">
              
              {/* WhatsApp Redirect URL */}
              <div className="space-y-1.5 flex flex-col">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  WhatsApp Redirect URL
                </Label>
                <div className="relative flex items-center">
                  <Link className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    value={whatsappUrl}
                    onChange={(e) => onChange("widget_whatsapp_url", e.target.value)}
                    placeholder="https://wa.me/your-number"
                    className="pl-9 h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Redirect link for WhatsApp chat icon.</p>
              </div>

              {/* Telegram Redirect URL */}
              <div className="space-y-1.5 flex flex-col">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0088cc]" />
                  Telegram Redirect URL
                </Label>
                <div className="relative flex items-center">
                  <Link className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    value={telegramUrl}
                    onChange={(e) => onChange("widget_telegram_url", e.target.value)}
                    placeholder="https://t.me/your-username"
                    className="pl-9 h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Redirect link for Telegram bot/chat.</p>
              </div>

              {/* Instagram Redirect URL */}
              <div className="space-y-1.5 flex flex-col">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ee2a7b]" />
                  Instagram Redirect URL
                </Label>
                <div className="relative flex items-center">
                  <Link className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    value={instagramUrl}
                    onChange={(e) => onChange("widget_instagram_url", e.target.value)}
                    placeholder="https://instagram.com/your-username"
                    className="pl-9 h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Redirect link for Instagram profile or DM.</p>
              </div>

              {/* Facebook/Messenger Redirect URL */}
              <div className="space-y-1.5 flex flex-col">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#006AFF]" />
                  Facebook Messenger Redirect URL
                </Label>
                <div className="relative flex items-center">
                  <Link className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    value={facebookUrl}
                    onChange={(e) => onChange("widget_facebook_url", e.target.value)}
                    placeholder="https://m.me/your-page"
                    className="pl-9 h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Redirect link for Facebook Messenger chat.</p>
              </div>

            </div>
          )}
        </div>
      </SettingCard>
    </div>
  );
};

export default WidgetSettings;
