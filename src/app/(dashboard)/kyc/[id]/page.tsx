"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getKycDocumentById, getCustomerById } from "@/lib/data-helpers";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function KycDetailPage() {
  const params = useParams();
  const router = useRouter();
  const doc = getKycDocumentById(params.id as string);
  const customer = doc ? getCustomerById(doc.customerId) : undefined;
  const [status, setStatus] = useState(doc?.status ?? "pending");
  const [actioned, setActioned] = useState(false);

  if (!doc) {
    return <NotFoundCard title="Document Not Found" message="The KYC document could not be found." backHref="/kyc" />;
  }

  const handleAction = (newStatus: "verified" | "rejected") => {
    setStatus(newStatus);
    setActioned(true);
    setTimeout(() => router.push(`/customers/${doc.customerId}`), 1500);
  };

  return (
    <div>
      <DetailHeader
        backHref={`/customers/${doc.customerId}`}
        backLabel="Back to Customer"
        title={doc.documentType}
        subtitle={`${doc.id} · ${doc.category} document`}
        badge={<Badge variant={status === "verified" ? "success" : status === "rejected" ? "danger" : "warning"}>{status}</Badge>}
      />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Document Details</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            items={[
              { label: "Document ID", value: <span className="font-mono">{doc.id}</span> },
              { label: "Category", value: <Badge variant="secondary">{doc.category}</Badge> },
              { label: "File Name", value: doc.fileName },
              { label: "Uploaded", value: formatDate(doc.uploadedAt) },
              {
                label: "Customer",
                value: customer ? (
                  <Link href={`/customers/${customer.id}`} className="text-blue-700 hover:underline">{customer.name}</Link>
                ) : doc.customerId,
              },
            ]}
          />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Document Preview</CardTitle></CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
            <div className="text-center">
              <p className="font-medium text-slate-700">{doc.fileName}</p>
              <p className="mt-1 text-sm text-slate-500">PDF preview would appear here</p>
              <Button variant="outline" size="sm" className="mt-4">Download</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {actioned ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="font-semibold text-emerald-700">Document marked as {status}!</p>
          </CardContent>
        </Card>
      ) : status === "pending" ? (
        <div className="flex gap-3">
          <Button variant="success" onClick={() => handleAction("verified")}><CheckCircle className="h-4 w-4" /> Verify</Button>
          <Button variant="destructive" onClick={() => handleAction("rejected")}><XCircle className="h-4 w-4" /> Reject</Button>
        </div>
      ) : null}
    </div>
  );
}
