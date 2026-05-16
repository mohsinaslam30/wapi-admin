"use client";

import { Button } from "@/src/elements/ui/button";
import { Card, CardContent } from "@/src/elements/ui/card";
import { ExternalLink, ShieldCheck, UserCog, Zap, BarChart3, Globe } from "lucide-react";
import { useSwitchToTenant } from "@/src/hooks/useSwitchToTenant";
import { useTranslation } from "react-i18next";

const SwitchToTenantCard = () => {
  const { t } = useTranslation();
  const { handleSwitch, isLoading } = useSwitchToTenant();

  return (
    <Card className="group relative overflow-hidden border-none! bg-white dark:bg-(--card-color) shadow-sm hover:shadow-xl transition-all duration-500 rounded-lg cursor-default border border-white/10 h-full min-h-40">
      <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-bl from-primary/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-indigo-500/10 to-transparent opacity-30 blur-2xl -ml-10 -mb-10" />

      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-indigo-500/5 opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

      <ShieldCheck className="absolute -right-4 bottom-1/4 w-32 h-32 text-primary/5 -rotate-12 pointer-events-none group-hover:text-primary/10 transition-all duration-700" />

      <CardContent className="sm:p-6 p-4 relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm border border-primary/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-none mb-1.5 truncate">{t("admin_self_tenant", { defaultValue: "Admin Self Tenant" })}</h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-2">{t("access_frontend_description", { defaultValue: "Access frontend with super admin privileges" })}</p>
            </div>
          </div>
          <div className="hidden sm:flex shrink-0 text-nowrap items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            Active Mode
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {[
            { icon: Zap, label: "Instant Login", color: "text-amber-500" },
            { icon: BarChart3, label: "Live Monitoring", color: "text-blue-500" },
            { icon: Globe, label: "Full Control", color: "text-purple-500" },
            { icon: UserCog, label: "Role Preserved", color: "text-emerald-500" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group/item hover:border-primary/30 transition-all duration-300">
              <item.icon size={14} className={`${item.color} group-hover/item:scale-110 transition-transform`} />
              <span className="text-[12px] font-bold text-slate-600 dark:text-slate-400 tracking-tight">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center gap-3 transition-colors duration-300 group-hover:bg-primary/5">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-(--dark-body) flex items-center justify-center shadow-xs">
              <UserCog size={14} className="text-slate-400 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">Super Admin Role</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">Direct login without manual credentials</p>
            </div>
          </div>

          <Button onClick={handleSwitch} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 gap-2 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 group/btn overflow-hidden relative">
            <span className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t("switching", { defaultValue: "Switching..." })}
              </span>
            ) : (
              <>
                <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                {t("switch_to_tenant", { defaultValue: "Switch to Tenant" })}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SwitchToTenantCard;
