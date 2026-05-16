"use client";

import { Card, CardContent } from "@/src/elements/ui/card";
import { useAppSelector } from "@/src/redux/hooks";
import { Users, CreditCard, Layout, DollarSign, Cpu, MessageSquare, TrendingUp, TrendingDown, Minus } from "lucide-react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

interface AdminStatCardsProps {
  counts: {
    totalUsers: number;
    activeSubscriptions: number;
    totalPlans: number;
    revenue: {
      today: number;
      month: number;
      total: number;
    };
    activeAIModels: number;
    totalContactInquiries: number;
  };
  showPlans?: boolean;
  showSubscriptions?: boolean;
  subset?: number[];
  itemsOnly?: boolean;
}

const AdminStatCards = ({ counts, showPlans = true, showSubscriptions = true, subset, itemsOnly = false }: AdminStatCardsProps) => {
  const { t } = useTranslation();
  const settings = useAppSelector((state) => state.settings.data);
  const defaultSymbol = settings?.default_currency?.symbol || "$";

  const stats = [
    {
      label: "users_count",
      value: counts.totalUsers,
      icon: Users,
      color: "blue",
      description: "Registered users",
      trend: "+12%",
      trendIcon: TrendingUp,
      trendColor: "text-emerald-500 bg-emerald-500/10",
    },
    {
      label: "active_subscriptions",
      value: counts.activeSubscriptions,
      icon: CreditCard,
      color: "indigo",
      description: "Active paying users",
      trend: "+5%",
      trendIcon: TrendingUp,
      trendColor: "text-emerald-500 bg-emerald-500/10",
    },
    {
      label: "available_plans",
      value: counts.totalPlans,
      icon: Layout,
      color: "purple",
      description: "Available Pricing Plans",
      trend: "Stable",
      trendIcon: Minus,
      trendColor: "text-slate-400 bg-slate-400/10",
    },
    {
      label: "revenue_this_month",
      value: counts.revenue.month,
      prefix: defaultSymbol,
      icon: DollarSign,
      color: "emerald",
      description: "This month’s revenue",
      trend: defaultSymbol + counts.revenue.today.toFixed(2) + " today",
      trendIcon: TrendingUp,
      trendColor: "text-emerald-500 bg-emerald-500/10",
    },
    {
      label: "ai_settings",
      value: counts.activeAIModels,
      icon: Cpu,
      color: "orange",
      description: "AI configurations",
      trend: "Online",
      trendIcon: TrendingUp,
      trendColor: "text-emerald-500 bg-emerald-500/10",
    },
    {
      label: "customer_inquiries",
      value: counts.totalContactInquiries,
      icon: MessageSquare,
      color: "pink",
      description: "Pending Support Requests",
      trend: "Action needed",
      trendIcon: TrendingDown,
      trendColor: "text-amber-500 bg-amber-500/10",
    },
  ]?.filter((stat, index) => {
    if (subset && !subset.includes(index)) return false;
    if (stat.label === "Available Plans" && !showPlans) return false;
    if ((stat.label === "Active Subscriptions" || stat.label === "Revenue This Month") && !showSubscriptions) return false;
    return true;
  });

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return { text: "text-blue-600", bg: "bg-blue-600/10", border: "border-blue-600/5", gradient: "from-blue-600/20 to-transparent" };
      case "indigo":
        return { text: "text-indigo-600", bg: "bg-indigo-600/10", border: "border-indigo-600/5", gradient: "from-indigo-600/20 to-transparent" };
      case "purple":
        return { text: "text-purple-600", bg: "bg-purple-600/10", border: "border-purple-600/5", gradient: "from-purple-600/20 to-transparent" };
      case "emerald":
        return { text: "text-emerald-600", bg: "bg-emerald-600/10", border: "border-emerald-600/5", gradient: "from-emerald-600/20 to-transparent" };
      case "orange":
        return { text: "text-orange-600", bg: "bg-orange-600/10", border: "border-orange-600/5", gradient: "from-orange-600/20 to-transparent" };
      case "pink":
        return { text: "text-pink-600", bg: "bg-pink-600/10", border: "border-pink-600/5", gradient: "from-pink-600/20 to-transparent" };
      default:
        return { text: "text-slate-600", bg: "bg-slate-600/10", border: "border-slate-600/5", gradient: "from-slate-600/20 to-transparent" };
    }
  };

  const content = stats?.map((stat, index) => {
    const styles = getColorClasses(stat.color);

    return (
      <Card key={index} className="group relative overflow-hidden border-none! bg-white dark:bg-(--card-color) shadow-sm hover:shadow-xl transition-all duration-500 rounded-lg cursor-default border border-white/10">
        {/* Background Gradient Layer (Top Right corner style as per image) */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-bl ${styles.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -mr-10 -mt-10`} />

        {/* Subtle base gradient layer */}
        <div className={`absolute inset-0 bg-linear-to-br ${styles.gradient} opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500`} />

        <CardContent className="sm:p-6 p-4 pb-3! relative z-10 transition-colors duration-500">
          <div className="flex flex-col gap-2">
            {/* Header: Icon and Trend */}
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className={`shrink-0 w-11 h-11 rounded-lg ${styles.bg} ${styles.text} flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm border ${styles.border}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-bold rounded-full px-2 py-0.5 max-w-full ${stat.trendColor} border border-white/10`}>
                <stat.trendIcon size={10} className="shrink-0" />
                <span className="truncate">{stat.trend}</span>
              </div>
            </div>

            {/* Main Content: Value and Label */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                {stat.prefix && <span className="text-lg font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500">{stat.prefix}</span>}
                <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-500 font-mono!">
                  <CountUp end={stat.value} duration={2} separator="," />
                </span>
              </div>
              <h3 className="text-[14px] font-medium text-slate-500 dark:text-slate-400 transition-colors duration-500">{t(stat.label)}</h3>
            </div>

            {/* Footer: Description */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 transition-all duration-500">
              <p className="text-[12px] font-medium text-slate-400 dark:text-slate-500 line-clamp-1 transition-colors duration-500">{stat.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  });

  if (itemsOnly) return <>{content}</>;

  return <div className={`grid gap-6 grid-cols-1 [@media(min-width:475px)_and_(max-width:767px)]:grid-cols-2 ${subset && subset.length <= 3 ? "xl:grid-cols-3" : "xl:grid-cols-6"}`}>{content}</div>;
};

export default AdminStatCards;
