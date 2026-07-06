"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApplicationById, verificationLabels } from "@/lib/data-helpers";
import { formatCurrency } from "@/lib/utils";

export default function VerificationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const app = getApplicationById(params.id as string);
  const [checks, setChecks] = useState(app?.verificationStatus ?? {});
  const [completed, setCompleted] = useState(false);

  if (!app) {
    return (
      <NotFoundCard
        title="Application Not Found"
        message="The application for verification could not be found."
        backHref="/verification"
      />
    );
  }

  const verifiedCount = Object.values(checks).filter(Boolean).length;
  const allVerified = Object.values(checks).every(Boolean);

  const toggleCheck = (key: string, value: boolean) => {
    setChecks((prev) => ({ ...prev, [key]: value }));
  };

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => router.push(`/applications/${app.id}`), 1500);
  };

  return (
    <div>
      <DetailHeader
        backHref={`/applications/${app.id}`}
        backLabel="Back to Application"
        title="Loan Verification"
        subtitle={`${app.customerName} · ${app.productName} · ${formatCurrency(app.amount)}`}
        badge={<Badge variant="warning">{verifiedCount}/8 Verified</Badge>}
      />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Application Summary</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            columns={2}
            items={[
              { label: "Application ID", value: <span className="font-mono">{app.id}</span> },
              { label: "Customer", value: <Link href={`/customers/${app.customerId}`} className="text-blue-700 hover:underline">{app.customerName}</Link> },
              { label: "Product", value: app.productName },
              { label: "Amount", value: formatCurrency(app.amount) },
              { label: "Purpose", value: app.purpose },
            ]}
          />
        </CardContent>
      </Card>

      {completed ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
            <p className="mt-4 text-lg font-semibold text-emerald-700">Verification updated!</p>
            <p className="text-sm text-slate-500">
              {allVerified ? "All checks passed. Application moved to approval queue." : "Verification status saved."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">8-Point Verification Checklist</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(checks).map(([key, verified]) => (
                  <div
                    key={key}
                    className={`rounded-xl border p-4 ${verified ? "border-emerald-200 bg-emerald-50" : "border-slate-200"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{verificationLabels[key] || key}</p>
                        <Badge variant={verified ? "success" : "warning"} className="mt-2">
                          {verified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant={verified ? "success" : "outline"}
                          className="h-8 px-2"
                          onClick={() => toggleCheck(key, true)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 px-2"
                          onClick={() => toggleCheck(key, false)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleComplete} disabled={!allVerified}>
              {allVerified ? "Submit for Approval" : "Save Verification Status"}
            </Button>
            <Button variant="outline" onClick={() => router.push(`/applications/${app.id}`)}>Cancel</Button>
          </div>
        </>
      )}
    </div>
  );
}
