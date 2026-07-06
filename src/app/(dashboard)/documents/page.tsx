"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderOpen, Upload, FileText } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs } from "@/components/shared/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { documentRecords } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const documentCategories = [
  { id: "kyc", label: "KYC Documents" },
  { id: "property", label: "Property Documents" },
  { id: "gold", label: "Gold Valuation" },
  { id: "agreement", label: "Agreements" },
  { id: "sanction", label: "Sanction Letters" },
  { id: "emi", label: "EMI Schedules" },
  { id: "receipt", label: "Receipts" },
  { id: "other", label: "Other" },
];

const categoryMap: Record<string, string> = {
  kyc: "kyc",
  property: "property",
  gold: "gold",
  agreement: "agreement",
  agreements: "agreement",
  sanction: "sanction",
  emi: "emi",
  receipts: "receipt",
  receipt: "receipt",
  other: "other",
};

export default function DocumentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("kyc");
  const mappedCategory = categoryMap[activeTab] ?? activeTab;
  const docs = documentRecords.filter((d) => d.category === mappedCategory);

  return (
    <div>
      <PageHeader title="Document Management" description="Centralized repository for KYC, property, legal, and loan documents" icon={FolderOpen} />
      <Tabs tabs={documentCategories} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      <Card className="mb-6 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Upload className="mb-4 h-12 w-12 text-slate-300" />
          <p className="text-sm font-medium text-slate-700">Drag and drop files here</p>
          <p className="mt-1 text-xs text-slate-500">or click to browse (PDF, JPG, PNG up to 10MB)</p>
          <Button className="mt-4"><Upload className="h-4 w-4" /> Upload Document</Button>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <Card key={doc.id} className="cursor-pointer transition-all hover:shadow-md" onClick={() => router.push(`/documents/${doc.id}`)}>
            <CardContent className="flex items-center gap-3 pt-6">
              <div className="rounded-lg bg-blue-50 p-2"><FileText className="h-5 w-5 text-blue-600" /></div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-slate-500">{doc.fileName} · {formatDate(doc.uploadedAt)}</p>
              </div>
              <Badge variant="secondary">v{doc.version}</Badge>
            </CardContent>
          </Card>
        ))}
        {docs.length === 0 && (
          <p className="col-span-full text-center text-sm text-slate-500 py-8">No documents in this category yet.</p>
        )}
      </div>
    </div>
  );
}
