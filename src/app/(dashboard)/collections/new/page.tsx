"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DetailHeader } from "@/components/shared/detail-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loans } from "@/lib/mock-data";
import { formatCurrency, generateId } from "@/lib/utils";

export default function NewCollectionPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading form...</div>}>
      <NewCollectionForm />
    </Suspense>
  );
}

function NewCollectionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedLoan = searchParams.get("loanId") ?? "";

  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    loanId: preselectedLoan,
    amount: "",
    type: "bank",
    date: new Date().toISOString().split("T")[0],
    isPartial: false,
    remarks: "",
  });

  const selectedLoan = loans.find((l) => l.id === form.loanId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const receiptId = generateId("COL");
    setSaved(true);
    setTimeout(() => router.push(`/collections/${receiptId}`), 1500);
  };

  return (
    <div>
      <DetailHeader backHref="/collections" backLabel="Back to Collections" title="Record Collection" subtitle="Daily cash, bank, or online collection with receipt generation" />

      {saved ? (
        <Card><CardContent className="py-12 text-center"><p className="text-lg font-semibold text-emerald-700">Collection recorded! Receipt generated.</p></CardContent></Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Collection Details</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Select Loan *</label>
                <select required className="flex h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" value={form.loanId} onChange={(e) => setForm((f) => ({ ...f, loanId: e.target.value }))}>
                  <option value="">Choose loan...</option>
                  {loans.filter((l) => l.status === "active").map((l) => (
                    <option key={l.id} value={l.id}>{l.id} — {l.customerName} ({formatCurrency(l.emiAmount)} EMI)</option>
                  ))}
                </select>
              </div>
              {selectedLoan && (
                <div className="flex items-end">
                  <p className="text-sm text-slate-500">Outstanding: <strong>{formatCurrency(selectedLoan.outstandingBalance)}</strong></p>
                </div>
              )}
              <div>
                <label className="mb-1 block text-sm font-medium">Amount (₹) *</label>
                <Input required type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} placeholder={selectedLoan ? `EMI: ${selectedLoan.emiAmount}` : ""} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Collection Type *</label>
                <select className="flex h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                  <option value="cash">Cash</option>
                  <option value="bank">Bank</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Collection Date *</label>
                <Input required type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input type="checkbox" id="partial" checked={form.isPartial} onChange={(e) => setForm((f) => ({ ...f, isPartial: e.target.checked }))} />
                <label htmlFor="partial" className="text-sm">Partial / Advance Payment</label>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Remarks</label>
                <Input value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} />
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Button type="submit">Generate Receipt</Button>
            <Button type="button" variant="outline" onClick={() => router.push("/collections")}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
}
