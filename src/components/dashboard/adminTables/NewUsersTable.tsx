/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/elements/ui/card";
import { Badge } from "@/src/elements/ui/badge";
import DataTable from "@/src/shared/DataTable";
import { ColumnDef } from "@/src/types/shared";
import { format } from "date-fns";
import { Users, ArrowUpRight, Globe } from "lucide-react";
import { AdminDashboardData } from "@/src/redux/api/adminDashboardApi";

type NewUsersData = AdminDashboardData["tables"]["newUsers"];

export const NewUsersTable = ({ data }: { data: NewUsersData }) => {
  const columns: ColumnDef<any>[] = [
    {
      header: "Member Profile",
      className: "[@media(max-width:1766px)]:min-w-[285px]",
      cell: (row) => (
        <div className="flex items-center gap-3 py-1">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-primary flex items-center justify-center text-[10px] font-black text-white shadow-sm ring-2 ring-white/10 shrink-0 capitalize">{row.name.charAt(0)}</div>
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-[14px] text-slate-800 dark:text-white text-xs truncate">{row.name}</span>
            <span className="text-[12px] text-slate-400 font-bold truncate">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Verification",
      className: "[@media(max-width:1766px)]:min-w-[220px]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Globe size={12} className="text-slate-300" />
          <div className="flex flex-col">
            <span className="text-[14px] font-medium text-slate-600 dark:text-slate-300 tracking-tight">{row.phone}</span>
            <span className="text-[12px] text-slate-400 font-black">{row.country || "Global"}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Access Level",
      className: "[@media(max-width:1766px)]:min-w-[190px]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`text-[10px] font-medium px-2.5 py-1 rounded-md border-0 ring-1 ring-inset ${row.planName === "No Plan" ? "bg-slate-500/10 text-slate-500 ring-slate-500/20" : "bg-primary/10 text-primary ring-primary/30"}`}>
            {row.planName}
          </Badge>
          <ArrowUpRight size={10} className="text-slate-300 group-hover:text-primary transition-colors" />
        </div>
      ),
    },
    {
      header: "Joined",
      className: "[@media(max-width:1766px)]:min-w-[190px]",
      cell: (row) => <span className="text-[12px] font-medium text-slate-500 tabular-nums bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md border border-slate-200/50 dark:border-white/5">{format(new Date(row.created_at), "MMMM dd, yyyy")}</span>,
    },
  ];

  return (
    <Card className="h-full bg-white border-none! dark:border-(--card-border-color) dark:bg-(--card-color) shadow-sm overflow-hidden group">
      <CardHeader className="pb-4 border-b border-(--input-border-color) dark:border-(--card-border-color) bg-white dark:bg-(--card-color)">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 dark:bg-primary/20 rounded-lg group-hover:rotate-6 transition-transform">
            <Users size={18} className="text-primary" />
          </div>
          <div>
            <CardTitle className="text-[19px] font-medium tracking-tight text-slate-800 dark:text-white">New Signups</CardTitle>
            <CardDescription className="text-[14px] font-medium text-slate-400 dark:text-gray-400">Verified registrations</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <DataTable data={data.slice(0, 5)} columns={columns} emptyMessage="No new users found." itemsPerPage={5} pagination={false} tableClassName="border-none! shadow-none!" />
      </CardContent>
    </Card>
  );
};
