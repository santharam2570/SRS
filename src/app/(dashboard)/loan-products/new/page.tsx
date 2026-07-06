"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DetailHeader } from "@/components/shared/detail-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { repaymentFrequencies } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

export default function NewLoanProductPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    securityType: "",
    interestRate: "",
    processingFee: "",
    documentationCharges: "",
    minAmount: "",
    maxAmount: "",
    tenureMonths: "",
    repaymentFrequency: "Monthly",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = generateId("PROD");
    setSaved(true);
    setTimeout(() => router.push(`/loan-products/${newId}`), 1500);
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div>
      <DetailHeader backHref="/loan-products" backLabel="Back to Products" title="Add Loan Product" subtitle="Configure interest, fees, tenure, and limits" />

      {saved ? (
        <Card><CardContent className="py-12 text-center"><p className="text-lg font-semibold text-emerald-700">Product created successfully!</p></CardContent></Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Product Details</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div><label className="mb-1 block text-sm font-medium">Product Name *</label><Input required value={form.name} onChange={(e) => update("name", e.target.value)} /></div>
              <div><label className="mb-1 block text-sm font-medium">Security Type *</label><Input required value={form.securityType} onChange={(e) => update("securityType", e.target.value)} placeholder="e.g. Property, Gold" /></div>
              <div><label className="mb-1 block text-sm font-medium">Interest Rate (% p.a.) *</label><Input required type="number" step="0.1" value={form.interestRate} onChange={(e) => update("interestRate", e.target.value)} /></div>
              <div><label className="mb-1 block text-sm font-medium">Processing Fee (%) *</label><Input required type="number" step="0.1" value={form.processingFee} onChange={(e) => update("processingFee", e.target.value)} /></div>
              <div><label className="mb-1 block text-sm font-medium">Documentation Charges (₹) *</label><Input required type="number" value={form.documentationCharges} onChange={(e) => update("documentationCharges", e.target.value)} /></div>
              <div><label className="mb-1 block text-sm font-medium">Tenure (months) *</label><Input required type="number" value={form.tenureMonths} onChange={(e) => update("tenureMonths", e.target.value)} /></div>
              <div><label className="mb-1 block text-sm font-medium">Min Amount (₹) *</label><Input required type="number" value={form.minAmount} onChange={(e) => update("minAmount", e.target.value)} /></div>
              <div><label className="mb-1 block text-sm font-medium">Max Amount (₹) *</label><Input required type="number" value={form.maxAmount} onChange={(e) => update("maxAmount", e.target.value)} /></div>
              <div>
                <label className="mb-1 block text-sm font-medium">Repayment Frequency *</label>
                <select className="flex h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" value={form.repaymentFrequency} onChange={(e) => update("repaymentFrequency", e.target.value)}>
                  {repaymentFrequencies.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Button type="submit">Create Product</Button>
            <Button type="button" variant="outline" onClick={() => router.push("/loan-products")}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
}
