"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardCheck, CheckCircle, XCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loanApplications, verificationTypes } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function VerificationPage() {
  const router = useRouter();
  const pendingApps = loanApplications.filter((a) => a.status === "pending_verification" || a.status === "pending_approval");

  return (
    <div>
      <PageHeader
        title="Loan Verification"
        description="KYC, income, property, gold, legal, valuation, field, and credit verification checklist"
        icon={ClipboardCheck}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {verificationTypes.map((type) => (
          <Card key={type} className="transition-all hover:shadow-md">
            <CardContent className="flex items-center justify-between pt-6">
              <p className="text-sm font-medium">{type}</p>
              <Badge variant="warning">Pending</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {pendingApps.map((app) => (
        <Card key={app.id} className="mb-4 cursor-pointer transition-all hover:shadow-md" onClick={() => router.push(`/verification/${app.id}`)}>
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base">{app.customerName}</CardTitle>
                <p className="text-sm text-slate-500">{app.productName} · {formatCurrency(app.amount)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="warning">{app.id}</Badge>
                <Link href={`/verification/${app.id}`} onClick={(e) => e.stopPropagation()}>
                  <Button size="sm">Open</Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(app.verificationStatus).map(([key, verified]) => (
                <div
                  key={key}
                  className={`flex items-center justify-between rounded-lg border p-3 ${
                    verified ? "border-emerald-200 bg-emerald-50" : "border-slate-200"
                  }`}
                >
                  <span className="text-sm capitalize">{key.replace(/_/g, " ")}</span>
                  {verified ? (
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-slate-300" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
