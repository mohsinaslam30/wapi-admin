/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/elements/ui/card";
import DataTable from "@/src/shared/DataTable";
import { ColumnDef } from "@/src/types/shared";
import { format } from "date-fns";
import { MessageSquare } from "lucide-react";
import { AdminDashboardData } from "@/src/redux/api/adminDashboardApi";

type InquiriesData = AdminDashboardData["tables"]["recentInquiries"];

export const InquiriesTable = ({ data }: { data: InquiriesData }) => {
  const columns: ColumnDef<any>[] = [
    {
      header: "Petitioner",
      className: "[@media(max-width:1320px)]:min-w-[180px]",
      cell: (row) => (
        <div className="flex flex-col min-w-10 max-w-28 py-1">
          <span className="font-black text-[12px] text-slate-800 dark:text-white text-xs truncate">{row.name}</span>
          <span className="text-[9px] text-slate-400 font-bold truncate opacity-80">{row.email}</span>
        </div>
      ),
    },
    {
      header: "Abstract",
      className: "[@media(max-width:1320px)]:min-w-[175px]",
      cell: (row) => (
        <div className="flex flex-col max-w-xs py-1">
          <span className="text-[12px] font-black text-slate-700 dark:text-slate-200 truncate">{row.subject}</span>
          <span className="text-[10px] text-slate-400 truncate italic font-medium opacity-60 tracking-tight">{row.message}</span>
        </div>
      ),
    },
    {
      header: "Arrival",
      className: "[@media(max-width:1320px)]:min-w-[155px]",
      cell: (row) => (
        <div className="flex items-center">
          <span className="text-[10px] font-black text-slate-500 bg-slate-100 dark:bg-transparent px-2 py-1 rounded-lg border border-(--input-border-color) dark:border-(--card-border-color) dark:text-primary shadow-sm">{format(new Date(row.created_at), "MMM dd")}</span>
        </div>
      ),
    },
  ];

  return (
    <Card className="border-none! dark:border-(--card-border-color) bg-white/70 dark:bg-(--card-color) shadow-sm overflow-hidden h-full group">
      <CardHeader className="pb-4 sm:p-6 p-4 border-b border-(--input-border-color) dark:border-(--card-border-color) bg-slate-50/50 dark:bg-(--card-color) shadow-[inset_0_-1px_0_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 dark:bg-primary/20 rounded-lg group-hover:rotate-6 transition-transform">
            <MessageSquare size={18} className="text-primary" />
          </div>
          <div>
            <CardTitle className="text-[19px] font-medium text-slate-800 dark:text-white">Latest Inquiries</CardTitle>
            <CardDescription className="text-[14px] font-medium text-slate-400 dark:text-gray-400">High-priority inquiries</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <DataTable data={data.slice(0, 5)} columns={columns} emptyMessage="No latest inquiries found." itemsPerPage={5} pagination={false} tableClassName="border-none! shadow-none!" />
      </CardContent>
    </Card>
  );
};
