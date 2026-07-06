"use client";

import { useState } from "react";
import { Download, Mail } from "lucide-react";
import { DetailHeader } from "@/components/shared/detail-header";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { reportCategories } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useParams } from "next/navigation";

const sampleReportData: Record<string, { rows: { label: string; value: string }[] }> = {
  "Collection Report": { rows: [{ label: "Total Collections", value: formatCurrency(2450000) }, { label: "Cash", value: formatCurrency(450000) }, { label: "Bank", value: formatCurrency(1200000) }, { label: "Online", value: formatCurrency(800000) }] },
  "Loan Outstanding": { rows: [{ label: "Total Outstanding", value: formatCurrency(45800000) }, { label: "Active Loans", value: "623" }, { label: "NPA Loans", value: "18" }] },
  "Commission Report": { rows: [{ label: "Total Commission", value: formatCurrency(345000) }, { label: "Settled", value: formatCurrency(220000) }, { label: "Pending", value: formatCurrency(125000) }] },
};

export default function ReportDetailPage() {
  const params = useParams();
  const category = decodeURIComponent(params.category as string);
  const reportType = decodeURIComponent(params.reportType as string);
  const [generated, setGenerated] = useState(false);

  const validCategories = Object.keys(reportCategories) as (keyof typeof reportCategories)[];
  const isValid = validCategories.includes(category as keyof typeof reportCategories) &&
    reportCategories[category as keyof typeof reportCategories]?.includes(reportType);

  if (!isValid) {
    return <NotFoundCard title="Report Not Found" message="The requested report type could not be found." backHref="/reports" />;
  }

  const data = sampleReportData[reportType] ?? {
    rows: [
      { label: "Report Period", value: "Jul 1 – Jul 6, 2025" },
      { label: "Generated At", value: new Date().toLocaleString("en-IN") },
      { label: "Records", value: "42" },
    ],
  };

  return (
    <div>
      <DetailHeader
        backHref="/reports"
        backLabel="Back to Reports"
        title={reportType}
        subtitle={`${category.charAt(0).toUpperCase() + category.slice(1)} Reports`}
        actions={
          <>
            <Button variant="outline" onClick={() => setGenerated(true)}>Generate</Button>
            <Button variant="outline"><Download className="h-4 w-4" /> PDF</Button>
            <Button variant="outline"><Download className="h-4 w-4" /> Excel</Button>
            <Button variant="outline"><Mail className="h-4 w-4" /> Email</Button>
          </>
        }
      />

      <Card>
        <CardHeader><CardTitle className="text-base">{reportType} — {generated ? "Generated" : "Preview"}</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.rows.map((row) => (
              <div key={row.label} className="flex justify-between border-b border-slate-100 py-3">
                <span className="text-sm text-slate-600">{row.label}</span>
                <span className="font-semibold">{row.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400">Report data as of Jul 6, 2025. Export available in PDF, Excel, and CSV formats.</p>
        </CardContent>
      </Card>
    </div>
  );
}
