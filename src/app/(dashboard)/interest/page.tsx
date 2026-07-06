"use client";

import { useState } from "react";
import { Percent } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs } from "@/components/shared/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { interestSchemes, interestCollection, interestCalculation } from "@/lib/mock-data";

export default function InterestPage() {
  const [activeTab, setActiveTab] = useState("scheme");

  const tabs = [
    { id: "scheme", label: "Interest Scheme" },
    { id: "collection", label: "Interest Collection" },
    { id: "calculation", label: "Calculation Method" },
  ];

  const items: Record<string, string[]> = {
    scheme: interestSchemes,
    collection: interestCollection,
    calculation: interestCalculation,
  };

  return (
    <div>
      <PageHeader
        title="Interest Configuration"
        description="Configure interest schemes, collection methods, and calculation types"
        icon={Percent}
        action={{ label: "Save Configuration" }}
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items[activeTab].map((item) => (
          <Card key={item} className="cursor-pointer transition-all hover:border-blue-300 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base">{item}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Click to configure parameters for {item.toLowerCase()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
