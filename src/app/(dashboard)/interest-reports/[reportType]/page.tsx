"use client";

import { Download, Mail } from "lucide-react";
import { DetailHeader } from "@/components/shared/detail-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useParams } from "next/navigation";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const reportData: Record<string, { summary: { label: string; value: string }[]; chart?: { name: string; value: number }[] }> = {
  "Interest Rate Report": {
    summary: [{ label: "Avg Interest Rate", value: "13.8%" }, { label: "Floating Loans", value: "124" }, { label: "Fixed Rate Loans", value: "499" }],
    chart: [{ name: "Jan", value: 13.2 }, { name: "Feb", value: 13.5 }, { name: "Mar", value: 13.8 }, { name: "Apr", value: 14.1 }, { name: "May", value: 13.9 }, { name: "Jun", value: 14.0 }],
  },
  "Interest Projection Report": {
    summary: [{ label: "Projected (30 days)", value: formatCurrency(1250000) }, { label: "Projected (90 days)", value: formatCurrency(3800000) }, { label: "Annual Projection", value: formatCurrency(15200000) }],
  },
  "Weekly Average Report": {
    summary: [{ label: "This Week Avg", value: "14.2%" }, { label: "Last Week Avg", value: "13.9%" }, { label: "4-Week Avg", value: "14.0%" }],
    chart: [{ name: "W1", value: 13.8 }, { name: "W2", value: 14.0 }, { name: "W3", value: 14.1 }, { name: "W4", value: 14.2 }],
  },
};

export default function InterestReportDetailPage() {
  const params = useParams();
  const reportType = decodeURIComponent(params.reportType as string);
  const data = reportData[reportType] ?? {
    summary: [{ label: "Interest Collected (MTD)", value: formatCurrency(892000) }, { label: "Interest Receivable", value: formatCurrency(3200000) }],
  };

  return (
    <div>
      <DetailHeader
        backHref="/interest-reports"
        backLabel="Back to Interest Reports"
        title={reportType}
        subtitle="Live interest calculations and projections"
        actions={
          <>
            <Button variant="outline"><Download className="h-4 w-4" /> Export</Button>
            <Button variant="outline"><Mail className="h-4 w-4" /> Email Report</Button>
          </>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {data.summary.map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.chart && (
        <Card>
          <CardHeader><CardTitle className="text-base">Trend Chart</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.chart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1e40af" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
