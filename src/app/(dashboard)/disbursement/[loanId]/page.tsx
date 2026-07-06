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
import { getLoanById, getApplicationById } from "@/lib/data-helpers";
import { formatCurrency } from "@/lib/utils";

export default function DisbursementDetailPage() {
  const router = useRouter();
  const params = useParams();
  const loanId = params.loanId as string;
  const loan = getLoanById(loanId);
  const application = loan ? getApplicationById(loan.applicationId) : undefined;
  const [disbursed, setDisbursed] = useState(false);
  const [form, setForm] = useState({
    type: "bank_transfer",
    amount: loan?.amount.toString() ?? "",
    date: new Date().toISOString().split("T")[0],
    bankName: "",
    transactionNumber: "",
    chequeNumber: "",
    remarks: "",
  });

  if (!loan) {
    return (
      <NotFoundCard
        title="Loan Not Found"
        message="The loan for disbursement could not be found."
        backHref="/disbursement"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisbursed(true);
    setTimeout(() => router.push(`/loans/${loan.id}`), 2000);
  };

  return (
    <div>
      <DetailHeader
        backHref={`/loans/${loan.id}`}
        backLabel="Back to Loan"
        title="Loan Disbursement"
        subtitle={`${loan.customerName} · ${loan.id}`}
        badge={
          loan.disbursedAmount > 0
            ? <Badge variant="success">Disbursed</Badge>
            : <Badge variant="warning">Pending Disbursement</Badge>
        }
      />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Loan Summary</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            columns={2}
            items={[
              { label: "Loan ID", value: <span className="font-mono">{loan.id}</span> },
              { label: "Sanctioned Amount", value: formatCurrency(loan.amount) },
              { label: "Product", value: loan.productName },
              { label: "Customer", value: <Link href={`/customers/${loan.customerId}`} className="text-blue-700 hover:underline">{loan.customerName}</Link> },
              { label: "Already Disbursed", value: formatCurrency(loan.disbursedAmount) },
              { label: "Pending", value: formatCurrency(loan.amount - loan.disbursedAmount) },
            ]}
          />
        </CardContent>
      </Card>

      {disbursed ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
            <p className="mt-4 text-lg font-semibold text-emerald-700">Disbursement Recorded!</p>
            <p className="text-sm text-slate-500">
              {formatCurrency(Number(form.amount))} disbursed via {form.type === "bank_transfer" ? "Bank Transfer" : "Cash"}.
              EMI schedule auto-generated. Customer notified.
            </p>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Disbursement Details</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Disbursement Type *</label>
                <select
                  className="flex h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash Disbursement</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Amount (₹) *</label>
                <Input required type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Disbursement Date *</label>
                <Input required type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
              </div>
              {form.type === "bank_transfer" && (
                <>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Bank Name *</label>
                    <Input required value={form.bankName} onChange={(e) => setForm((f) => ({ ...f, bankName: e.target.value }))} placeholder="e.g. HDFC Bank" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Transaction Number *</label>
                    <Input required value={form.transactionNumber} onChange={(e) => setForm((f) => ({ ...f, transactionNumber: e.target.value }))} />
                  </div>
                </>
              )}
              {form.type === "cash" && (
                <div>
                  <label className="mb-1 block text-sm font-medium">Cheque Number</label>
                  <Input value={form.chequeNumber} onChange={(e) => setForm((f) => ({ ...f, chequeNumber: e.target.value }))} />
                </div>
              )}
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Remarks</label>
                <Input value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} />
              </div>
            </CardContent>
          </Card>

          {application && (
            <Card className="mb-6">
              <CardHeader><CardTitle className="text-base">Internal Confirmation</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  CC notifications will be sent to MD, Accountant, and Loan Officer upon disbursement confirmation.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button type="submit">Confirm Disbursement</Button>
            <Button type="button" variant="outline" onClick={() => router.push(`/loans/${loan.id}`)}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
}
