"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/elements/ui/card";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { PieChart as PieChartIcon } from "lucide-react";
import { useAppSelector } from "@/src/redux/hooks";
import { AdminChartsProps } from "@/src/types/dashboard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const PlanRevenueChart = ({ planRevenue }: { planRevenue: AdminChartsProps["planRevenue"] }) => {
  const series = planRevenue?.map((p) => p.totalRevenue);
  const labels = planRevenue?.map((p) => p._id);
  const settings = useAppSelector((state) => state.settings.data);
  const defaultSymbol = settings?.default_currency?.symbol || "$";

  const options: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Inter, sans-serif",
    },
    labels: labels,
    colors: ["var(--primary)", "var(--chart-teal)", "var(--chart-warning)", "var(--chart-danger)", "var(--chart-purple)", "var(--chart-pink)"],
    stroke: { show: false },
    dataLabels: { enabled: false },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
      fontWeight: 700,
      labels: { colors: "var(--muted-text-color)" },
      markers: { size: 6 },
      itemMargin: { vertical: 4 },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "82%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "TOTAL REVENUE",
              formatter: () => defaultSymbol + " " + series.reduce((a, b) => a + b, 0).toLocaleString(),
              color: "var(--muted-text-color)",
              fontSize: "10px",
              fontWeight: 900,
            },
            value: {
              fontSize: "24px",
              fontWeight: 900,
              color: "var(--primary)",
              offsetY: 4,
            },
          },
        },
      },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (v) => defaultSymbol + " " + v.toLocaleString() },
    },
  };

  return (
    <Card className="border-none! dark:border-(--card-border-color) bg-white/70 dark:bg-(--card-color) shadow-sm h-full group overflow-hidden">
      <CardHeader className="pb-2 sm:p-6 p-4 relative z-10 border-b border-(--input-border-color) dark:border-(--card-border-color)">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 dark:bg-primary/20 rounded-lg group-hover:scale-110 transition-transform duration-500">
            <PieChartIcon size={18} className="text-primary" />
          </div>
          <div>
            <CardTitle className="text-[19px] font-medium text-slate-800 dark:text-white">Revenue by Plan</CardTitle>
            <CardDescription className="text-[14px] font-medium text-slate-400 dark:text-gray-400">Revenue by tier</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 mt-5">
        <div className="h-75 flex flex-col justify-center">
          <ReactApexChart options={options} series={series} type="donut" height={320} />
        </div>
      </CardContent>

      {/* Decorative pulse element */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" />
    </Card>
  );
};
