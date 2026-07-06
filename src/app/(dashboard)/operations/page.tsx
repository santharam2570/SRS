"use client";

import Link from "next/link";
import { Settings2, RefreshCw, ArrowUpCircle, MinusCircle, XOctagon, Lock, Unlock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loans } from "@/lib/mock-data";

const operations = [
  { key: "renewal", label: "Renewal", icon: RefreshCw },
  { key: "top-up", label: "Top-up Loan", icon: ArrowUpCircle },
  { key: "part-payment", label: "Part Payment", icon: MinusCircle },
  { key: "foreclosure", label: "Foreclosure", icon: XOctagon },
  { key: "closure", label: "Loan Closure", icon: Lock },
  { key: "reopening", label: "Loan Reopening", icon: Unlock },
];

export default function OperationsPage() {
  const activeLoan = loans.find((l) => l.status === "active");

  return (
    <div>
      <PageHeader title="Loan Operations" description="Renewal, top-up, part payment, foreclosure, closure, and reopening" icon={Settings2} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {operations.map((op) => (
          <Link key={op.key} href={activeLoan ? `/operations/${op.key}/${activeLoan.id}` : "/applications"}>
            <Card className="group cursor-pointer transition-all hover:border-blue-300 hover:shadow-lg h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-700 transition-transform group-hover:scale-110">
                    <op.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-base">{op.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  {op.key === "reopening" ? "Admin only — reopen closed loan accounts" : `Process ${op.label.toLowerCase()} for active loans`}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
