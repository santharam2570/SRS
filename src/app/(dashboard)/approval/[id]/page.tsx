"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Mail, MessageCircle, RotateCcw, Smartphone, XCircle } from "lucide-react";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApplicationById, getCustomerById } from "@/lib/data-helpers";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ApprovalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const app = getApplicationById(params.id as string);
  const customer = app ? getCustomerById(app.customerId) : undefined;
  const [decision, setDecision] = useState<"approved" | "rejected" | "sent_back" | null>(null);
  const [loanId] = useState(`LN-2025-${String(Math.floor(Math.random() * 9000) + 1000)}`);

  if (!app) {
    return (
      <NotFoundCard
        title="Application Not Found"
        message="The application for approval could not be found."
        backHref="/approval"
      />
    );
  }

  const handleDecision = (type: "approved" | "rejected" | "sent_back") => {
    setDecision(type);
    setTimeout(() => {
      if (type === "approved") router.push(`/disbursement/${loanId}`);
      else router.push("/approval");
    }, 2000);
  };

  return (
    <div>
      <DetailHeader
        backHref={`/applications/${app.id}`}
        backLabel="Back to Application"
        title="MD Approval Review"
        subtitle={`${app.customerName} · ${formatCurrency(app.amount)}`}
        badge={<Badge variant="warning">Pending MD Review</Badge>}
      />

      {decision ? (
        <Card>
          <CardContent className="py-12 text-center">
            {decision === "approved" && (
              <>
                <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
                <p className="mt-4 text-lg font-semibold text-emerald-700">Loan Approved!</p>
                <p className="text-sm text-slate-500">Loan ID: <span className="font-mono">{loanId}</span></p>
                <p className="mt-2 text-sm text-slate-500">Sanction letter generated. Notifications sent via Email, WhatsApp, and SMS.</p>
                <div className="mt-4 flex justify-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <MessageCircle className="h-5 w-5 text-emerald-600" />
                  <Smartphone className="h-5 w-5 text-orange-600" />
                </div>
              </>
            )}
            {decision === "rejected" && (
              <>
                <XCircle className="mx-auto h-12 w-12 text-red-600" />
                <p className="mt-4 text-lg font-semibold text-red-700">Application Rejected</p>
                <p className="text-sm text-slate-500">Customer notified of rejection.</p>
              </>
            )}
            {decision === "sent_back" && (
              <>
                <RotateCcw className="mx-auto h-12 w-12 text-amber-600" />
                <p className="mt-4 text-lg font-semibold text-amber-700">Sent Back for Revision</p>
                <p className="text-sm text-slate-500">Application returned to accountant for corrections.</p>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Application Details</CardTitle></CardHeader>
            <CardContent>
              <InfoGrid
                items={[
                  { label: "Application ID", value: <span className="font-mono">{app.id}</span> },
                  { label: "Customer", value: <Link href={`/customers/${app.customerId}`} className="text-blue-700 hover:underline">{app.customerName}</Link> },
                  { label: "Product", value: app.productName },
                  { label: "Amount", value: formatCurrency(app.amount) },
                  { label: "Purpose", value: app.purpose },
                  { label: "Mediator", value: app.mediatorName || "Direct" },
                  { label: "Applied", value: formatDate(app.createdAt) },
                ]}
              />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Verification Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.entries(app.verificationStatus).map(([key, verified]) => (
                  <Badge key={key} variant={verified ? "success" : "danger"}>
                    {key.replace(/_/g, " ")}: {verified ? "✓" : "✗"}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Sanction Letter Preview</CardTitle></CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-slate-50 p-6 text-sm">
                <p className="font-semibold">SANCTION LETTER</p>
                <p className="mt-4">Date: {formatDate(new Date().toISOString())}</p>
                <p className="mt-2">To: {app.customerName}</p>
                {customer && <p>{customer.address}</p>}
                <p className="mt-4">
                  We are pleased to inform you that your application for a <strong>{app.productName}</strong> of{" "}
                  <strong>{formatCurrency(app.amount)}</strong> has been approved subject to terms and conditions.
                </p>
                <p className="mt-4 text-slate-500">Loan ID will be auto-generated upon approval.</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button variant="success" onClick={() => handleDecision("approved")}>
              <CheckCircle className="h-4 w-4" /> Approve
            </Button>
            <Button variant="destructive" onClick={() => handleDecision("rejected")}>
              <XCircle className="h-4 w-4" /> Reject
            </Button>
            <Button variant="outline" onClick={() => handleDecision("sent_back")}>
              <RotateCcw className="h-4 w-4" /> Send Back
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
