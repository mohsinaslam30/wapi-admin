"use client";

import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { AppSettings, useGetSettingsQuery } from "@/src/redux/api/settingApi";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import SettingCard from "../shared/SettingCard";
import { ImageBaseUrl } from "@/src/constants";
import { Button } from "@/src/elements/ui/button";
import { Eye, EyeOff, QrCode, UserPlus, ExternalLink, Check } from "lucide-react";

const connectionMethods = [
  { id: "manual", label: "Manual", description: "Direct number entry" },
  { id: "qr_scan", label: "QR Scan", description: "Scan to connect" },
  { id: "embedded_signup", label: "Embedded Signup", description: "Meta onboarding flow" },
];

const WhatsAppSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);
  const { data: storedSettings } = useGetSettingsQuery();

  const onChange = (key: keyof AppSettings, value: AppSettings[keyof AppSettings]) => {
    dispatch(updateSettingField({ key, value }));
  };

  const toggleConnectionMethod = (id: string) => {
    const currentMethods = settings.connection_method || [];
    let newMethods;
    if (currentMethods.includes(id)) {
      if (currentMethods.length <= 1) return;
      newMethods = currentMethods.filter((m) => m !== id);
    } else {
      newMethods = [...currentMethods, id];
    }
    onChange("connection_method", newMethods);
  };

  return (
    <div className="space-y-5">
      <SettingCard title="Connection Methods" description="Select which connection methods should be available for users to connect their WhatsApp accounts.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {connectionMethods.map((method) => {
            const isSelected = (settings.connection_method || []).includes(method.id);
            return (
              <div key={method.id} onClick={() => toggleConnectionMethod(method.id)} className={`relative flex flex-col p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer group ${isSelected ? "border-(--text-green-primary) bg-(--text-green-primary)/5 shadow-sm" : "border-slate-100 dark:border-(--card-border-color) bg-transparent hover:border-slate-200 dark:hover:border-(--card-border-color)"}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-(--text-green-primary) text-white" : "bg-slate-100 dark:bg-(--page-body-bg) text-slate-500"}`}>
                    {method.id === "manual" && <UserPlus className="w-4 h-4" />}
                    {method.id === "qr_scan" && <QrCode className="w-4 h-4" />}
                    {method.id === "embedded_signup" && <ExternalLink className="w-4 h-4" />}
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-(--text-green-primary) flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <h4 className={`text-sm font-bold ${isSelected ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>{method.label}</h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{method.description}</p>
              </div>
            );
          })}
        </div>
      </SettingCard>

      <SettingCard
        title="WhatsApp API Credentials"
        description="Configure your Meta WhatsApp Business API credentials."
        rightElement={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange("show_whatsapp_config", !settings.show_whatsapp_config)}
              className="flex items-center gap-2 border-primary/20 hover:bg-primary/5 dark:bg-(--dark-body) hover:text-primary transition-all duration-200"
            >
              {settings.show_whatsapp_config ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Show
                </>
              )}
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5 flex flex-col">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">App ID</Label>
            <Input
              type={storedSettings?.show_whatsapp_config ? "text" : "password"}
              value={storedSettings?.show_whatsapp_config ? (settings.app_id ?? "") : (settings.app_id ? "••••••••" : "")}
              onChange={(e) => onChange("app_id", e.target.value)}
              placeholder="Your Meta App ID"
              readOnly={!storedSettings?.show_whatsapp_config}
              className={`h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3 ${!storedSettings?.show_whatsapp_config ? "opacity-70 cursor-not-allowed" : ""}`}
            />
          </div>
          <div className="space-y-1.5 flex flex-col">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">App Secret</Label>
            <Input
              type={storedSettings?.show_whatsapp_config ? "text" : "password"}
              value={storedSettings?.show_whatsapp_config ? (settings.app_secret ?? "") : (settings.app_secret ? "••••••••" : "")}
              onChange={(e) => onChange("app_secret", e.target.value)}
              placeholder="Your Meta App Secret"
              readOnly={!storedSettings?.show_whatsapp_config}
              className={`h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3 ${!storedSettings?.show_whatsapp_config ? "opacity-70 cursor-not-allowed" : ""}`}
            />
          </div>
          <div className="space-y-1.5 flex flex-col">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Configuration ID</Label>
            <Input
              type={storedSettings?.show_whatsapp_config ? "text" : "password"}
              value={storedSettings?.show_whatsapp_config ? (settings.configuration_id ?? "") : (settings.configuration_id ? "••••••••" : "")}
              onChange={(e) => onChange("configuration_id", e.target.value)}
              placeholder="WhatsApp Configuration ID"
              readOnly={!storedSettings?.show_whatsapp_config}
              className={`h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3 ${!storedSettings?.show_whatsapp_config ? "opacity-70 cursor-not-allowed" : ""}`}
            />
          </div>
          <div className="space-y-1.5 flex flex-col">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Webhook Verification Token</Label>
            <Input
              type={storedSettings?.show_whatsapp_config ? "text" : "password"}
              value={storedSettings?.show_whatsapp_config ? (settings.webhook_verification_token ?? "") : (settings.webhook_verification_token ? "••••••••" : "")}
              onChange={(e) => onChange("webhook_verification_token", e.target.value)}
              placeholder="Webhook verification token"
              readOnly={!storedSettings?.show_whatsapp_config}
              className={`h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3 ${!storedSettings?.show_whatsapp_config ? "opacity-70 cursor-not-allowed" : ""}`}
            />
          </div>
          <div className="space-y-1.5 flex flex-col md:col-span-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp Webhook URL</Label>
            <Input
              type={storedSettings?.show_whatsapp_config ? "text" : "password"}
              value={storedSettings?.show_whatsapp_config ? `${ImageBaseUrl ?? ""}/${settings.whatsapp_webhook_url ?? ""}` : (settings.whatsapp_webhook_url ? "••••••••" : "")}
              onChange={(e) => onChange("whatsapp_webhook_url", e.target.value)}
              placeholder="https://yourdomain.com/api/webhook/whatsapp"
              className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3"
              disabled
            />
          </div>
        </div>
      </SettingCard>
    </div>
  );
};

export default WhatsAppSettings;
