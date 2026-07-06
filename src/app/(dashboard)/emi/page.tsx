"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs } from "@/components/shared/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { repaymentMethods, repaymentFrequencies } from "@/lib/mock-data";

export default function EMIPage() {
  const [activeTab, setActiveTab] = useState("method");

  const tabs = [
    { id: "method", label: "Repayment Methods" },
    { id: "frequency", label: "Frequency" },
  ];

  const items: Record<string, string[]> = {
    method: repaymentMethods,
    frequency: repaymentFrequencies,
  };

  return (
    <div>
      <PageHeader
        title="EMI Configuration"
        description="Configure repayment methods and frequency for loan products"
        icon={Calendar}
        action={{ label: "Save Configuration" }}
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items[activeTab].map((item) => (
          <Card key={item} className="cursor-pointer transition-all hover:border-emerald-300 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base">{item}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Configure {item.toLowerCase()} repayment settings</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
