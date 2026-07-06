"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  format?: "currency" | "number";
  color?: "blue" | "emerald" | "amber" | "red" | "purple" | "cyan";
  delay?: number;
}

const colorMap = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600", accent: "from-blue-600 to-blue-700" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", accent: "from-emerald-600 to-emerald-700" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600", accent: "from-amber-600 to-amber-700" },
  red: { bg: "bg-red-50", icon: "text-red-600", accent: "from-red-600 to-red-700" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", accent: "from-purple-600 to-purple-700" },
  cyan: { bg: "bg-cyan-50", icon: "text-cyan-600", accent: "from-cyan-600 to-cyan-700" },
};

export function StatsCard({ title, value, icon: Icon, trend, format = "number", color = "blue", delay = 0 }: StatsCardProps) {
  const colors = colorMap[color];
  const displayValue = format === "currency" && typeof value === "number" ? formatCurrency(value) : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md"
    >
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", colors.accent)} />
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold tracking-tight text-slate-900">{displayValue}</p>
          {trend && (
            <p className={cn("text-xs font-medium", trend.positive ? "text-emerald-600" : "text-red-600")}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={cn("rounded-xl p-3 transition-transform group-hover:scale-110", colors.bg)}>
          <Icon className={cn("h-5 w-5", colors.icon)} />
        </div>
      </div>
    </motion.div>
  );
}
