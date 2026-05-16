/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { useGetAuthPageSetupQuery, useUpdateAuthPageSetupMutation } from "@/src/redux/api/authPageSetupApi";
import CommonHeader from "@/src/shared/CommonHeader";
import { AuthPageSetupData } from "@/src/types/authPageSetup";
import { LogIn, UserPlus, KeyRound, MessageSquareText, ShieldAlert, RefreshCw, Save } from "lucide-react";
import Can from "../shared/Can";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { LoginPageForm, RegisterPageForm, ForgotPasswordPageForm, OtpPageForm, ResetPasswordPageForm } from "./AuthPageForms";

const tabs = [
  {
    id: "login",
    label: "auth_page_setup_tabs_login",
    icon: LogIn,
    description: "auth_page_setup_tabs_login_desc",
  },
  {
    id: "register",
    label: "auth_page_setup_tabs_register",
    icon: UserPlus,
    description: "auth_page_setup_tabs_register_desc",
  },
  {
    id: "forgot_password",
    label: "auth_page_setup_tabs_forgot_password",
    icon: KeyRound,
    description: "auth_page_setup_tabs_forgot_password_desc",
  },
  {
    id: "otp",
    label: "auth_page_setup_tabs_otp",
    icon: MessageSquareText,
    description: "auth_page_setup_tabs_otp_desc",
  },
  {
    id: "reset_password",
    label: "auth_page_setup_tabs_reset_password",
    icon: ShieldAlert,
    description: "auth_page_setup_tabs_reset_password_desc",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

const AuthPageSetupContainer = () => {
  const { t } = useTranslation();
  const { data: authResponse, isLoading, refetch } = useGetAuthPageSetupQuery();
  const [updateAuthPageSetup, { isLoading: isUpdating }] = useUpdateAuthPageSetupMutation();

  const [activeTab, setActiveTab] = useState<TabId>("login");
  const [formData, setFormData] = useState<AuthPageSetupData | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (authResponse?.data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(authResponse.data);
    }
  }, [authResponse]);

  const handleSectionChange = (section: keyof AuthPageSetupData, sectionData: any) => {
    if (!formData) return;
    setFormData({ ...formData, [section]: sectionData });
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      await updateAuthPageSetup(formData).unwrap();
      setIsDirty(false);
      toast.success(t("auth_page_update_successfull"));
      refetch();
    } catch (error: any) {
      console.error("Auth Page Setup Update Error:", error);
      toast.error(error?.data?.message || error?.message || "Failed to update auth page setup");
    }
  };

  const renderActiveTab = () => {
    if (!formData) return null;

    switch (activeTab) {
      case "login":
        return <LoginPageForm data={formData.login_page} onChange={(data) => handleSectionChange("login_page", data)} />;
      case "register":
        return <RegisterPageForm data={formData.register_page} onChange={(data) => handleSectionChange("register_page", data)} />;
      case "forgot_password":
        return <ForgotPasswordPageForm data={formData.forgot_password_page} onChange={(data) => handleSectionChange("forgot_password_page", data)} />;
      case "otp":
        return <OtpPageForm data={formData.otp_page} onChange={(data) => handleSectionChange("otp_page", data)} />;
      case "reset_password":
        return <ResetPasswordPageForm data={formData.reset_password_page} onChange={(data) => handleSectionChange("reset_password_page", data)} />;
      default:
        return null;
    }
  };

  const activeTabInfo = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="flex flex-col min-h-full pb-10">
      <CommonHeader title={t("auth_page_setup_title")} description={t("auth_page_setup_description")} onRefresh={refetch} isLoading={isLoading} />

      <div className="flex flex-col [@media(min-width:1421px)]:flex-row gap-8 flex-1">
        {/* Left Navigation */}
        <aside className="[@media(min-width:1421px)]:w-[320px] shrink-0">
          <div className="[@media(min-width:1421px)]:sticky [@media(min-width:1421px)]:top-24 space-y-6">
            <div className="bg-white dark:bg-(--card-color) overflow-x-auto [@media(min-width:1421px)]:overflow-x-visible snap-x table-custom-scrollbar rounded-lg border border-gray-100 dark:border-(--card-border-color) shadow-xl shadow-gray-200/20 dark:shadow-none overflow-hidden p-2">
              <div className="flex [@media(min-width:1421px)]:flex-col gap-1.5 px-1 -mx-1 [@media(min-width:1421px)]:mx-0">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-3 [@media(min-width:1421px)]:gap-4 px-2 [@media(min-width:1421px)]:px-5 py-2 [@media(min-width:1421px)]:py-4 rounded-lg text-left transition-all duration-300 group relative overflow-hidden shrink-0 snap-center [@media(min-width:1421px)]:snap-start
                        ${isActive ? "bg-primary text-white shadow" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-(--dark-body) hover:text-gray-400"}
                      `}
                    >
                      <div
                        className={`
                        w-8 h-8 [@media(min-width:1421px)]:w-10 [@media(min-width:1421px)]:h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500
                        ${isActive ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-(--dark-body) text-gray-400 group-hover:scale-110 group-hover:bg-primary/5 group-hover:text-primary"}
                      `}
                      >
                        <Icon className="w-4 h-4 [@media(min-width:1421px)]:w-5 [@media(min-width:1421px)]:h-5" />
                      </div>
                      <div className="flex-1 min-w-0 pr-2 [@media(min-width:1421px)]:pr-0">
                        <p className={`text-[14px] font-medium truncate ${isActive ? "text-white" : "text-slate-500"}`}>{t(tab.label)}</p>
                        <p className={`hidden [@media(min-width:1421px)]:block text-[13px] truncate font-medium ${isActive ? "text-white/60" : "text-gray-400"}`}>{t(tab.description)}</p>
                      </div>
                      {isActive && <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white/30 hidden [@media(min-width:1421px)]:block" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Form Content Area */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Section Header Card */}
          <div className="bg-white dark:bg-(--card-color) flex-wrap p-4 lg:p-5 rounded-lg shadow-xl shadow-gray-200/20 dark:shadow-none border border-gray-100 dark:border-(--card-border-color) mb-6 lg:mb-8 flex [@media(min-width:1421px)]:items-center justify-between gap-4 lg:gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/2 rounded-full -mr-32 -mt-32 hidden [@media(min-width:1421px)]:block" />

            <div className="flex items-center gap-4 lg:gap-6 relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-inner shrink-0">
                <activeTabInfo.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5 lg:mb-1">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 tracking-tight">
                    {t(activeTabInfo.label)} {t("landing_page_configuration")}
                  </h2>
                </div>
                <p className="text-[14px] text-gray-400 font-medium px-1">{t(activeTabInfo.description)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-3 relative">
              {isDirty && (
                <div className="hidden sm:flex items-center gap-1.5 lg:gap-2 text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-primary px-3 lg:px-5 py-2 lg:py-2.5 bg-primary/5 rounded-full border border-primary/10 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  {t("common_draft")}
                </div>
              )}
              <div className="flex-1 flex items-center justify-end gap-2 w-full">
                <Button variant="outline" size="sm" onClick={refetch} className="h-10 lg:h-12 px-4.5 py-5 gap-2 border-gray-100 dark:bg-page-body dark:border-none rounded-lg font-bold text-gray-500 dark:hover:bg-(--table-hover) hover:bg-gray-50 group">
                  <RefreshCw className={`w-3.5 h-3.5 lg:w-4 group-active:rotate-180 transition-transform ${isLoading ? "animate-spin" : ""}`} />
                  <span className="[@media(min-width:1421px)]:inline">{t("common_refresh")}</span>
                </Button>
                <Can permission="update.auth_page_setup">
                  <Button size="sm" onClick={handleSave} disabled={isUpdating || isLoading} className="h-10 lg:h-12 px-4.5 py-5 gap-2 lg:gap-3 bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/30 rounded-lg font-black text-[11px] lg:text-[13px] transition-all active:scale-95 group">
                    {isUpdating ? <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4 group-hover:-translate-y-px transition-transform" />}
                    {t("common_publish")}
                  </Button>
                </Can>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {isLoading ? (
              <div className="h-80 [@media(min-width:1421px)]:h-150 flex flex-col items-center justify-center bg-white dark:bg-(--card-color) rounded-lg border border-gray-100 dark:border-(--card-border-color) shadow-xl shadow-gray-100/50">
                <div className="relative w-16 h-16 lg:w-20 lg:h-20 mb-6">
                  <div className="absolute inset-0 border-4 border-primary/10 rounded-full" />
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-[14px] lg:text-[15px] font-bold text-gray-900">{t("common_synchronizing")}</p>
                <p className="text-[11px] lg:text-[12px] text-gray-400 mt-1">{t("common_fetching_settings")}</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-(--card-color) p-4 [@media(min-width:1421px)]:p-6 rounded-lg border border-gray-100 dark:border-(--card-border-color) shadow-2xl shadow-primary/2 dark:shadow-none min-h-80 [@media(min-width:1421px)]:min-h-150 relative">
                <div className="absolute top-10 right-10 opacity-5 pointer-events-none hidden [@media(min-width:1421px)]:block">
                  <activeTabInfo.icon className="w-40 h-40" />
                </div>
                <div className="relative">{renderActiveTab()}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPageSetupContainer;
