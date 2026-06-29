/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { AppSettings } from "@/src/redux/api/settingApi";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import SettingCard from "../shared/SettingCard";
import SettingToggle from "../shared/SettingToggle";
import { Label } from "@/src/elements/ui/label";
import { Input } from "@/src/elements/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { useTranslation } from "react-i18next";

const SignupAgreementSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);

  const onChange = (key: keyof AppSettings, value: any) => {
    dispatch(updateSettingField({ key, value }));
  };

  const pages = (settings.pages || []).filter((page: any) => !page.system_reserved);

  return (
    <div className="space-y-5">
      <SettingCard
        title={t("settings_signup_agreement_title", "Signup Agreement Customization")}
        description={t("settings_signup_agreement_description", "Customize the signup agreement line and linked page on the user signup page.")}
      >
        <div className="space-y-5">
          <SettingToggle
            label={t("settings_signup_agreement_enable_label", "Enable Signup Agreement Line")}
            description={t("settings_signup_agreement_enable_desc", "Display the agreement checkbox and link line on the user signup page.")}
            checked={settings.signup_agree_enable ?? false}
            onCheckedChange={(v) => onChange("signup_agree_enable", v)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t dark:border-(--card-border-color)">
            <div className="space-y-1.5 flex flex-col">
              <Label className={`text-sm font-medium ${!settings.signup_agree_enable ? "text-gray-400 dark:text-gray-600" : "text-gray-700 dark:text-gray-300"}`}>
                {t("settings_signup_agreement_prefix_label", "Prefix Text")}
              </Label>
              <Input
                value={settings.signup_agree_prefix ?? ""}
                onChange={(e) => onChange("signup_agree_prefix", e.target.value)}
                placeholder={t("settings_signup_agreement_prefix_placeholder", "e.g. I agree to the")}
                disabled={!settings.signup_agree_enable}
                className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5 flex flex-col">
              <Label className={`text-sm font-medium ${!settings.signup_agree_enable ? "text-gray-400 dark:text-gray-600" : "text-gray-700 dark:text-gray-300"}`}>
                {t("settings_signup_agreement_link_text_label", "Link Text")}
              </Label>
              <Input
                value={settings.signup_agree_link_text ?? ""}
                onChange={(e) => onChange("signup_agree_link_text", e.target.value)}
                placeholder={t("settings_signup_agreement_link_text_placeholder", "e.g. Privacy Policy")}
                disabled={!settings.signup_agree_enable}
                className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color) p-3 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5 flex flex-col md:col-span-2">
              <Label className={`text-sm font-medium ${!settings.signup_agree_enable ? "text-gray-400 dark:text-gray-600" : "text-gray-700 dark:text-gray-300"}`}>
                {t("settings_signup_agreement_page_label", "Target Dynamic Page")}
              </Label>
              <Select
                value={settings.signup_agree_page?._id || settings.signup_agree_page || ""}
                onValueChange={(v) => onChange("signup_agree_page", v)}
                disabled={!settings.signup_agree_enable}
              >
                <SelectTrigger className="h-11 bg-(--input-color) dark:border-none dark:focus:shadow-none dark:bg-page-body border-(--input-border-color) p-3 disabled:opacity-50">
                  <SelectValue placeholder={t("settings_signup_agreement_select_page", "Select a dynamic page...")} />
                </SelectTrigger>
                <SelectContent className="dark:bg-(--card-color)">
                  {pages.map((page: any) => (
                    <SelectItem key={page._id} className="dark:hover:bg-(--table-hover)" value={page._id}>
                      {page.title} ({page.slug})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </SettingCard>
    </div>
  );
};

export default SignupAgreementSettings;
