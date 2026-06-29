/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { AppSettings } from "@/src/redux/api/settingApi";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import SettingCard from "../shared/SettingCard";
import { Check, Mail, MessageSquare, AlertTriangle, Info, Sparkles, Layout, User as UserIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGetTemplatesQuery } from "@/src/redux/api/templateApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/elements/ui/select";
import { Label } from "@/src/elements/ui/label";
import { useMemo, useEffect } from "react";
import { Input } from "@/src/elements/ui/input";

const deliveryMethods = [
  { id: "email", label: "settings_otp_email_label", description: "settings_otp_email_desc", icon: Mail },
  { id: "whatsapp", label: "settings_otp_whatsapp_label", description: "settings_otp_whatsapp_desc", icon: MessageSquare },
];

const mappingOptions = [
  { label: "OTP Code", value: "otp_code" },
  { label: "Admin Email", value: "email" },
  { label: "Admin Name", value: "name" },
];

const VariableRow = ({
  varKey,
  example,
  value,
  onChange,
  t,
  disabled = false,
}: {
  varKey: string;
  example: string;
  value: string;
  onChange: (val: string) => void;
  t: any;
  disabled?: boolean;
}) => {
  const isFieldRef = mappingOptions.some((opt) => opt.value === value);

  const getDisplayValue = () => {
    if (!value) return "nothing";
    if (isFieldRef) {
      const option = mappingOptions.find((opt) => opt.value === value);
      return option ? option.label : value;
    }
    return value;
  };

  const displayValue = getDisplayValue();

  return (
    <div className="bg-slate-50/50 dark:bg-(--page-body-bg) sm:p-5 p-2 rounded-lg border border-slate-100 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Label className="text-[12px] font-black text-(--text-green-primary) flex items-center gap-2">
          <Layout size={12} /> Variable Placeholder: {"{{" + varKey + "}}"}
        </Label>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
            You set <span className="text-(--text-green-primary)">{displayValue}</span> for this {"{{" + varKey + "}}"}
          </span>
          <span className="text-[10px] font-medium text-slate-400 italic">Example: {example}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5 flex flex-col">
          <span className="text-[12px] font-bold text-slate-500">Map to field</span>
          <Select value={isFieldRef ? value : ""} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger className="h-11! bg-white dark:bg-(--dark-body) rounded-lg border-slate-100 dark:border-none font-medium text-slate-700 dark:text-slate-200">
              <SelectValue placeholder="Select field..." />
            </SelectTrigger>
            <SelectContent className="rounded-lg dark:bg-(--page-body-bg) shadow-2xl border-slate-100 dark:border-(--card-border-color)">
              {mappingOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="rounded-lg py-2.5 dark:hover:bg-(--table-hover)">
                  <div className="flex items-center gap-2">
                    <UserIcon size={13} className="text-slate-400" />
                    <span className="font-bold text-sm">{opt.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 flex flex-col">
          <span className="text-[12px] font-bold text-slate-500">Or static value</span>
          <Input
            placeholder="Enter fixed text..."
            value={(!isFieldRef ? value : "") || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="h-11 bg-white dark:bg-(--dark-body) rounded-lg border-slate-100 dark:border-none font-medium text-slate-700 dark:text-slate-200"
          />
        </div>
      </div>
    </div>
  );
};

const OTPSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);

  const { data: templateData, isLoading: isLoadingTemplates } = useGetTemplatesQuery(
    {
      waba_id: settings.admin_waba_mongodb_id,
      category: "AUTHENTICATION",
      status: "approved",
    },
    { skip: !settings.admin_waba_mongodb_id || settings.otp_delivery_method !== "whatsapp" }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const templates = templateData?.data || [];

  const onChange = (key: keyof AppSettings, value: any) => {
    dispatch(updateSettingField({ key, value }));
  };

  const setDeliveryMethod = (id: string) => {
    onChange("otp_delivery_method", id);
  };

  const onVariableChange = (varKey: string, value: string) => {
    const currentMapping = { ...(settings.whatsapp_otp_variable_mapping || {}) };
    currentMapping[varKey] = value;
    onChange("whatsapp_otp_variable_mapping", currentMapping);
  };

  const selectedTemplate = useMemo(() => {
    return templates.find((t) => t._id === settings.whatsapp_otp_template_id);
  }, [templates, settings.whatsapp_otp_template_id]);

  const variableKeys = useMemo(() => {
    if (!selectedTemplate?.message_body) return [];
    const matches = selectedTemplate.message_body.match(/\{\{\d+\}\}/g);
    if (!matches) return [];
    return [...new Set(matches.map((m) => m.replace(/\{\{|\}\}/g, "")))].sort((a, b) => Number(a) - Number(b));
  }, [selectedTemplate]);
  
  useEffect(() => {
    if (selectedTemplate && variableKeys.length > 0) {
      const currentMapping = { ...(settings.whatsapp_otp_variable_mapping || {}) };
      let changed = false;
      variableKeys.forEach((key) => {
        if (currentMapping[key] !== "otp_code") {
          currentMapping[key] = "otp_code";
          changed = true;
        }
      });
      if (changed) {
        onChange("whatsapp_otp_variable_mapping", currentMapping);
      }
    }
  }, [selectedTemplate, variableKeys]);

  const examplesMap = useMemo(() => {
    const examples: Record<string, string> = {};
    const bodyVars = (selectedTemplate as any)?.body_variables || [];
    bodyVars.forEach((v: any) => {
      examples[v.key] = v.example || "N/A";
    });
    return examples;
  }, [selectedTemplate]);

  const isWhatsAppSelected = settings.otp_delivery_method === "whatsapp";

  return (
    <div className="space-y-5">
      <SettingCard title={t("settings_otp_delivery_methods")} description={t("settings_otp_delivery_methods_desc")}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {deliveryMethods.map((method) => {
            const isSelected = settings.otp_delivery_method === method.id;
            const Icon = method.icon;
            return (
              <div key={method.id} onClick={() => setDeliveryMethod(method.id)} className={`relative flex flex-col p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${isSelected ? "border-(--text-green-primary) bg-(--text-green-primary)/5 shadow-sm" : "border-slate-100 dark:border-slate-800 bg-transparent hover:border-slate-200 dark:hover:border-slate-700"}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-(--text-green-primary) text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-(--text-green-primary) flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <h4 className={`text-sm font-bold ${isSelected ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>{t(method.label)}</h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{t(method.description)}</p>
              </div>
            );
          })}
        </div>
      </SettingCard>

      {isWhatsAppSelected && (
        <SettingCard title={t("settings_otp_whatsapp_template")} description={t("settings_otp_whatsapp_template_desc")}>
          {!settings.is_waba_connected ? (
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700 dark:text-amber-400">{t("settings_otp_waba_warning")}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("settings_otp_whatsapp_template")}</Label>
                <Select value={settings.whatsapp_otp_template_id || ""} onValueChange={(value) => onChange("whatsapp_otp_template_id", value)} disabled={isLoadingTemplates}>
                  <SelectTrigger className="h-11 bg-(--input-color) dark:bg-page-body border-(--input-border-color)">
                    <SelectValue placeholder={isLoadingTemplates ? t("common_loading") : t("settings_otp_template_placeholder")} />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-(--card-color) dark:border-(--card-border-color)">
                    {templates.length === 0 && !isLoadingTemplates ? (
                      <div className="p-2 text-center text-sm text-gray-500">{t("settings_otp_no_templates")}</div>
                    ) : (
                      templates.map((template) => (
                        <SelectItem key={template._id} value={template._id} className="dark:focus:bg-(--table-hover)">
                          {template.template_name} ({template.language})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {selectedTemplate && (
                <div className="space-y-6">
                  {variableKeys.length > 0 && (
                    <div className="mt-4 space-y-4 sm:p-5 p-2 bg-slate-50 dark:bg-(--card-color) rounded-lg border border-dashed border-slate-200 dark:border-(--card-border-color) animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center gap-2 px-1">
                        <Sparkles className="text-(--text-green-primary)" size={16} />
                        <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Template Variables Mapping</p>
                      </div>

                      <div className="space-y-3">
                        {variableKeys.map((key: string) => (
                          <VariableRow
                            key={key}
                            varKey={key}
                            example={examplesMap[key] || "N/A"}
                            value={settings.whatsapp_otp_variable_mapping?.[key] || ""}
                            onChange={(val) => onVariableChange(key, val)}
                            t={t}
                            disabled={true}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-400 italic px-1">Tip: Map variables to dynamic fields or enter custom text.</p>
                    </div>
                  )}

                  <div className="space-y-3 p-4 bg-gray-50 dark:bg-(--dark-body) border border-gray-100 dark:border-gray-800 rounded-lg animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Info className="w-4 h-4 text-(--text-green-primary)" />
                      <h5 className="text-sm font-bold text-gray-900 dark:text-gray-100">{t("settings_otp_variable_mapping")}</h5>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t("settings_otp_variable_mapping_desc")}</p>

                    <div className="p-3 bg-white dark:bg-(--card-color) border border-gray-100 dark:border-(--card-border-color) rounded-md shadow-sm">
                      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Message Body</p>
                      <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50/50 dark:bg-page-body/50 p-2 rounded border border-gray-50 dark:border-gray-800">
                        {selectedTemplate.message_body || "No body content"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </SettingCard>
      )}
    </div>
  );
};

export default OTPSettings;
