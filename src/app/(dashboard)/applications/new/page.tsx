"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DetailHeader } from "@/components/shared/detail-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { customers, loanProducts, mediators } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

export default function NewApplicationPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading form...</div>}>
      <NewApplicationForm />
    </Suspense>
  );
}

function NewApplicationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCustomer = searchParams.get("customerId") ?? "";

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    customerId: preselectedCustomer,
    productId: "",
    amount: "",
    purpose: "",
    mediatorId: "",
    remarks: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = generateId("APP");
    setSubmitted(true);
    setTimeout(() => router.push(`/applications/${newId}`), 1500);
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div>
      <DetailHeader
        backHref="/applications"
        backLabel="Back to Applications"
        title="Create Loan Application"
        subtitle="Complete all fields and upload required documents"
      />

      {submitted ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-semibold text-emerald-700">Application submitted successfully!</p>
            <p className="mt-2 text-sm text-slate-500">Redirecting to application details...</p>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Application Details</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Select Customer *</label>
                <select
                  required
                  className="flex h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                  value={form.customerId}
                  onChange={(e) => update("customerId", e.target.value)}
                >
                  <option value="">Choose customer...</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Loan Product *</label>
                <select
                  required
                  className="flex h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                  value={form.productId}
                  onChange={(e) => update("productId", e.target.value)}
                >
                  <option value="">Choose product...</option>
                  {loanProducts.filter((p) => p.status === "active").map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Loan Amount (₹) *</label>
                <Input required type="number" value={form.amount} onChange={(e) => update("amount", e.target.value)} placeholder="Enter amount" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Loan Purpose *</label>
                <Input required value={form.purpose} onChange={(e) => update("purpose", e.target.value)} placeholder="e.g. Home renovation" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Assign Mediator</label>
                <select
                  className="flex h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                  value={form.mediatorId}
                  onChange={(e) => update("mediatorId", e.target.value)}
                >
                  <option value="">Direct (no mediator)</option>
                  {mediators.filter((m) => m.status === "active").map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Remarks</label>
                <Input value={form.remarks} onChange={(e) => update("remarks", e.target.value)} placeholder="Additional notes..." />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Upload Documents</CardTitle></CardHeader>
            <CardContent>
              <div className="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
                <p className="text-sm text-slate-500">Drag and drop files here, or click to browse</p>
                <p className="mt-1 text-xs text-slate-400">KYC, income proof, property documents, etc.</p>
                <Button type="button" variant="outline" className="mt-4" size="sm">Browse Files</Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="submit">Submit Application</Button>
            <Button type="button" variant="outline" onClick={() => router.push("/applications")}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
}
