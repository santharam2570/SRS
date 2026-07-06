"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BarChart3, Download, FileSpreadsheet, FileText } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs } from "@/components/shared/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { reportCategories } from "@/lib/mock-data";

export default function ReportsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("daily");

  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "loan", label: "Loan" },
    { id: "customer", label: "Customer" },
    { id: "mediator", label: "Mediator" },
    { id: "finance", label: "Finance" },
  ];

  const reports = reportCategories[activeTab as keyof typeof reportCategories];

  return (
    <div>
      <PageHeader title="Reports" description="Daily, loan, customer, mediator, and finance reports with export" icon={BarChart3} />
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card
            key={report}
            className="group cursor-pointer transition-all hover:border-blue-200 hover:shadow-md"
            onClick={() => router.push(`/reports/${activeTab}/${encodeURIComponent(report)}`)}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900">{report}</p>
                  <p className="mt-1 text-xs text-slate-500">Generate and export report</p>
                </div>
                <FileText className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
              </div>
              <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Link href={`/reports/${activeTab}/${encodeURIComponent(report)}`}>
                  <Button size="sm" variant="outline"><Download className="h-3 w-3" /> PDF</Button>
                </Link>
                <Button size="sm" variant="outline"><FileSpreadsheet className="h-3 w-3" /> Excel</Button>
                <Button size="sm" variant="outline">CSV</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
