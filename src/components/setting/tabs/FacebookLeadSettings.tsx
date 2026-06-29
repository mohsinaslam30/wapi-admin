"use client";

import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { AppSettings } from "@/src/redux/api/settingApi";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import SettingCard from "../shared/SettingCard";
import { ImageBaseUrl } from "@/src/constants";
import { useTranslation } from "react-i18next";
import { Facebook, Lock, Globe, Eye, EyeOff, Instagram } from "lucide-react";
import { useState } from "react";
import { Button } from "@/src/elements/ui/button";

const FacebookLeadSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);
  const [showVerifyToken, setShowVerifyToken] = useState(false);

  const onChange = (key: keyof AppSettings, value: AppSettings[keyof AppSettings]) => {
    dispatch(updateSettingField({ key, value }));
  };

  return (
    <div className="space-y-5">
      <SettingCard
        title={t("settings_tabs_facebook_lead")}
        description={t("settings_tabs_facebook_lead_desc")}
      >
        <div className="space-y-6">
          {/* Webhook URL Section */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-(--text-green-primary)" />
              {t("settings_facebook_lead_webhook_url")}
            </Label>
            <div className="relative group">
              <Input
                type="text"
                value={settings.facebook_lead_webhook_url ? `${ImageBaseUrl ?? ""}/${settings.facebook_lead_webhook_url}` : ""}
                placeholder="https://yourdomain.com/api/webhook/facebook-lead"
                className="h-12 bg-slate-50 dark:bg-page-body/50 border-slate-200 dark:border-(--card-border-color) px-4 font-mono text-[13px] text-slate-500 dark:text-slate-400 opacity-80"
                disabled
                readOnly
              />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
              {t("settings_facebook_lead_webhook_url_hint")}
            </p>
          </div>

          {/* Verify Token Section */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-(--text-green-primary)" />
              {t("settings_facebook_lead_webhook_verify_token")}
            </Label>
            <div className="relative group">
              <Input
                type={showVerifyToken ? "text" : "password"}
                value={settings.facebook_lead_webhook_verify_token || ""}
                onChange={(e) => onChange("facebook_lead_webhook_verify_token", e.target.value)}
                placeholder={t("settings_facebook_lead_webhook_verify_token_placeholder")}
                className="h-12 bg-(--input-color) dark:bg-page-body border-slate-200 dark:border-(--card-border-color) px-4 focus:ring-2 focus:ring-(--text-green-primary)/20 transition-all pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowVerifyToken(!showVerifyToken)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-all"
              >
                {showVerifyToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              {t("settings_facebook_lead_webhook_verify_token_hint")}
            </p>
          </div>

          <hr className="border-slate-200 dark:border-slate-700/50 my-2" />

          {/* Instagram Webhook URL Section */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-pink-500" />
              {t("settings_instagram_webhook_url")}
            </Label>
            <div className="relative group">
              <Input
                type="text"
                value={settings.instagram_webhook_url ? `${ImageBaseUrl ?? ""}/${settings.instagram_webhook_url}` : ""}
                placeholder="https://yourdomain.com/api/webhook/instagram"
                className="h-12 bg-slate-50 dark:bg-page-body/50 border-slate-200 dark:border-(--card-border-color) px-4 font-mono text-[13px] text-slate-500 dark:text-slate-400 opacity-80"
                disabled
                readOnly
              />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
              {t("settings_instagram_webhook_url_hint")}
            </p>
          </div>

          {/* Instagram Verify Token Section */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-pink-500" />
              {t("settings_instagram_webhook_verify_token")}
            </Label>
            <div className="relative group">
              <Input
                type={showVerifyToken ? "text" : "password"}
                value={settings.instagram_webhook_verify_token || ""}
                onChange={(e) => onChange("instagram_webhook_verify_token", e.target.value)}
                placeholder={t("settings_instagram_webhook_verify_token_placeholder")}
                className="h-12 bg-(--input-color) dark:bg-page-body border-slate-200 dark:border-(--card-border-color) px-4 focus:ring-2 focus:ring-(--text-green-primary)/20 transition-all pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowVerifyToken(!showVerifyToken)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-all"
              >
                {showVerifyToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              {t("settings_instagram_webhook_verify_token_hint")}
            </p>
          </div>

          {/* Info Banner */}
          <div className="sm:p-4 p-2 rounded-lg bg-violet-50 dark:bg-violet-500/5 border border-violet-100 dark:border-violet-500/20 flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
              <Facebook className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-500/10 flex items-center justify-center shrink-0">
              <Instagram className="w-4 h-4 text-pink-600 dark:text-pink-400" />
            </div>
            <div className="space-y-1">
              <h5 className="text-[13px] font-bold text-violet-700 dark:text-violet-400">Facebook & Instagram Integration</h5>
              <p className="text-[11px] text-violet-600/80 dark:text-violet-400/60 leading-relaxed">
                Use the respective Webhook URLs and Verify Tokens above to configure your Apps in the Meta Business Suite. This ensures messages and leads from your Facebook and Instagram channels are correctly synced.
              </p>
            </div>
          </div>
        </div>
      </SettingCard>
    </div>
  );
};

export default FacebookLeadSettings;
