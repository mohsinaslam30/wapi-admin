/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/elements/ui/card";
import { Badge } from "@/src/elements/ui/badge";
import DataTable from "@/src/shared/DataTable";
import { ColumnDef } from "@/src/types/shared";
import { format } from "date-fns";
import { CreditCard, XCircle } from "lucide-react";
import { AdminDashboardData } from "@/src/redux/api/adminDashboardApi";
import { useAppSelector } from "@/src/redux/hooks";

type SubscriptionsData = AdminDashboardData["tables"]["newSubscriptions"];

export const SubscriptionsTable = ({ data, title, type }: { data: SubscriptionsData; title: string; type: "active" | "cancelled" }) => {
  const settings = useAppSelector((state) => state.settings.data);
  const defaultSymbol = settings?.default_currency?.symbol || "$";

  const columns: ColumnDef<any>[] = [
    {
      header: "Account",
      className: "[@media(max-width:1920px)]:min-w-[170px]",
      cell: (row) => (
        <div className="flex flex-col min-w-0 py-1">
          <span className="font-black text-[12px] text-slate-800 dark:text-white text-xs truncate">{row.userName}</span>
          <span className="text-[10px] text-slate-400 font-bold truncate opacity-70">{row.userEmail}</span>
        </div>
      ),
    },
    {
      header: "Service Details",
      className: "[@media(max-width:1920px)]:min-w-[165px]",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">{row.planName}</span>
          <span className="text-[11px] text-primary font-black tabular-nums tracking-tighter">
            {defaultSymbol} {row.amount_paid.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      className: "[@media(max-width:1920px)]:min-w-[127px]",
      cell: (row) => (
        <Badge className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md border-0 hover:bg-(--light-primary) hover:text-primary dark:hover:bg-(--card-color) ring-1 ring-inset ${row.status === "active" ? "bg-emerald-500/10 text-primary ring-emerald-500/30" : "bg-red-500/10 dark:hover:border-(--card-border-color) dark:hover:text-red-500 text-red-500 ring-red-500/30"}`}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Payment",
      className: "[@media(max-width:1920px)]:min-w-[130px]",
      cell: (row) => (
        <Badge variant="outline" className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md border-0 ring-1 ring-inset ${row.payment_status === "paid" ? "bg-primayry/10 text-primary ring-primary/30" : "bg-primary/10 text-primary ring-primary/30"}`}>
          {row.payment_status}
        </Badge>
      ),
    },
    {
      header: "Expiry/Renewal",
      className: "[@media(max-width:1920px)]:min-w-[153px]",
      cell: (row) => (
        <div className="flex items-center gap-2.5">
          <span className="text-[12px] font-black text-slate-500 dark:text-gray-400 tabular-nums uppercase">{format(new Date(row.current_period_end), "MMM dd")}</span>
          <span className="text-[12px] font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest">{format(new Date(row.current_period_end), "yyyy")}</span>
        </div>
      ),
    },
  ];

  const themeColor = type === "active" ? "emerald" : "rose";
  const Icon = type === "active" ? CreditCard : XCircle;

  return (
    <Card className="border-none! shadow-sm dark:border-(--card-border-color) bg-white/70 dark:bg-(--card-color) overflow-hidden h-full group">
      <CardHeader className="pb-4 sm:p-6 p-4 border-b border-(--input-border-color) dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--card-color) shadow-[inset_0_-1px_0_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 bg-${themeColor}-500/10 dark:bg-${themeColor}-500/20 rounded-lg group-hover:scale-110 transition-transform`}>
            <Icon size={18} className={`text-${themeColor}-500`} />
          </div>
          <div>
            <CardTitle className="text-[19px] font-medium tracking-tight text-slate-800 dark:text-white">{title}</CardTitle>
            <CardDescription className="text-[14px] font-medium text-slate-400 dark:text-gray-400">{type === "active" ? "Live revenue streams" : "Deflected support requests"}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <DataTable data={data.slice(0, 5)} columns={columns} emptyMessage={`No ${type} subscriptions found.`} itemsPerPage={5} pagination={false} tableClassName="border-none! shadow-none!" />
      </CardContent>
    </Card>
  );
};
