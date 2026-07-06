"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getLoanById, operationLabels } from "@/lib/data-helpers";
import { formatCurrency } from "@/lib/utils";

export default function LoanOperationPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as string;
  const loanId = params.loanId as string;
  const loan = getLoanById(loanId);
  const [completed, setCompleted] = useState(false);
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");

  const label = operationLabels[type] || type;

  if (!loan) {
    return <NotFoundCard title="Loan Not Found" message="The loan for this operation could not be found." backHref="/operations" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompleted(true);
    setTimeout(() => router.push(`/loans/${loanId}`), 2000);
  };

  return (
    <div>
      <DetailHeader
        backHref={`/loans/${loanId}`}
        backLabel="Back to Loan"
        title={label}
        subtitle={`${loan.customerName} · ${loan.id}`}
        badge={<Badge variant="secondary">{loan.productName}</Badge>}
      />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Current Loan Status</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            columns={2}
            items={[
              { label: "Sanctioned", value: formatCurrency(loan.amount) },
              { label: "Outstanding", value: formatCurrency(loan.outstandingBalance) },
              { label: "Monthly EMI", value: formatCurrency(loan.emiAmount) },
              { label: "Status", value: <Badge>{loan.status}</Badge> },
            ]}
          />
        </CardContent>
      </Card>

      {completed ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
            <p className="mt-4 text-lg font-semibold text-emerald-700">{label} processed successfully!</p>
            <Link href={`/loans/${loanId}`} className="mt-4 inline-block text-sm text-blue-700 hover:underline">Return to loan</Link>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">{label} Details</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {(type === "part-payment" || type === "top-up" || type === "foreclosure") && (
                <div>
                  <label className="mb-1 block text-sm font-medium">Amount (₹) *</label>
                  <Input required type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={type === "foreclosure" ? String(loan.outstandingBalance) : ""} />
                </div>
              )}
              {type === "renewal" && (
                <div>
                  <label className="mb-1 block text-sm font-medium">New Tenure (months) *</label>
                  <Input required type="number" defaultValue={loan.tenureMonths} />
                </div>
              )}
              {type === "reopening" && (
                <div className="sm:col-span-2">
                  <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">Admin-only operation. Requires MD approval to reopen a closed loan.</p>
                </div>
              )}
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Remarks</label>
                <Input value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Operation notes..." />
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Button type="submit">Process {label}</Button>
            <Button type="button" variant="outline" onClick={() => router.push(`/loans/${loanId}`)}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
}
