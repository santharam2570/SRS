"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileCheck, Upload, CheckCircle, Clock, XCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs } from "@/components/shared/tabs";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { kycDocuments, kycCategories } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const statusIcon = {
  verified: <CheckCircle className="h-4 w-4 text-emerald-600" />,
  pending: <Clock className="h-4 w-4 text-amber-600" />,
  rejected: <XCircle className="h-4 w-4 text-red-600" />,
};

export default function KYCPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("identity");

  const tabs = [
    { id: "identity", label: "Identity", count: kycCategories.identity.length },
    { id: "address", label: "Address", count: kycCategories.address.length },
    { id: "income", label: "Income", count: 7 },
    { id: "business", label: "Business", count: kycCategories.business.length },
    { id: "other", label: "Other", count: kycCategories.other.length },
    { id: "property", label: "Property", count: kycCategories.property.length },
  ];

  const filtered = kycDocuments.filter((d) => d.category === activeTab);

  const tableData = filtered.map((d) => ({
    _id: d.id,
    id: <span className="font-mono text-xs">{d.id}</span>,
    customer: d.customerId,
    type: d.documentType,
    file: <span className="text-blue-600">{d.fileName}</span>,
    status: (
      <div className="flex items-center gap-1.5">
        {statusIcon[d.status]}
        <Badge variant={d.status === "verified" ? "success" : d.status === "pending" ? "warning" : "danger"}>{d.status}</Badge>
      </div>
    ),
    uploaded: formatDate(d.uploadedAt),
  }));

  const docTypes: Record<string, string[]> = {
    identity: kycCategories.identity,
    address: kycCategories.address,
    income: [...kycCategories.income.salaried, ...kycCategories.income.business],
    business: kycCategories.business,
    other: kycCategories.other,
    property: kycCategories.property,
  };

  return (
    <div>
      <PageHeader title="KYC Management" description="Identity, address, income, business, and property document verification" icon={FileCheck} />
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {docTypes[activeTab]?.map((doc) => (
          <Card key={doc} className="group cursor-pointer transition-all hover:border-blue-200 hover:shadow-md">
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="text-sm font-medium text-slate-900">{doc}</p>
                <p className="text-xs text-slate-500">Click to upload</p>
              </div>
              <Upload className="h-5 w-5 text-slate-400 transition-colors group-hover:text-blue-600" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Uploaded Documents</CardTitle>
          <Button size="sm"><Upload className="h-4 w-4" /> Upload</Button>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={[
              { key: "id", label: "Doc ID" },
              { key: "customer", label: "Customer" },
              { key: "type", label: "Document Type" },
              { key: "file", label: "File" },
              { key: "status", label: "Status" },
              { key: "uploaded", label: "Uploaded" },
            ]}
            data={tableData}
            onRowClick={(row) => router.push(`/kyc/${row._id}`)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
