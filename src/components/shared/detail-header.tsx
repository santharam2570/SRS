"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DetailHeaderProps {
  backHref: string;
  backLabel?: string;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function DetailHeader({
  backHref,
  backLabel = "Back",
  title,
  subtitle,
  badge,
  actions,
  className,
}: DetailHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      <Link href={backHref}>
        <Button variant="ghost" size="sm" className="mb-3 -ml-2 text-slate-600">
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Button>
      </Link>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
            {badge}
          </div>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}
