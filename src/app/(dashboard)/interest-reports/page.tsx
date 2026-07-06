"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyInterest = [
  { week: "W1", interest: 125000, projected: 130000 },
  { week: "W2", interest: 132000, projected: 130000 },
  { week: "W3", interest: 128500, projected: 130000 },
  { week: "W4", interest: 141000, projected: 130000 },
];

const reports = [
  "Interest Rate Report",
  "Interest Projection Report",
  "Weekly Average Report",
  "Floating Interest",
  "Future Interest Projection",
  "Live Weekly Interest Report",
  "Automatic Email Report",
];

export default function InterestReportsPage() {
  return (
    <div>
      <PageHeader title="Interest Reports" description="Interest calculations, floating rates, projections, and automated reports" icon={TrendingUp} />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Weekly Interest</p><p className="text-2xl font-bold">{formatCurrency(141000)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Avg. Weekly</p><p className="text-2xl font-bold">{formatCurrency(131625)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Projected (Next Month)</p><p className="text-2xl font-bold">{formatCurrency(580000)}</p></CardContent></Card>
      </div>

      <Card className="mb-6">
        <CardHeader><CardTitle>Live Weekly Interest Report</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weeklyInterest}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Line type="monotone" dataKey="interest" stroke="#1d4ed8" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="projected" stroke="#94a3b8" strokeDasharray="5 5" name="Projected" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <Link key={r} href={`/interest-reports/${encodeURIComponent(r)}`}>
            <Card className="cursor-pointer transition-all hover:shadow-md">
              <CardContent className="flex items-center justify-between pt-6">
                <p className="text-sm font-medium">{r}</p>
                <Button variant="outline" size="sm">Generate</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
