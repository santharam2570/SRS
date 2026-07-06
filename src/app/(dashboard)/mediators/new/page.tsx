"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DetailHeader } from "@/components/shared/detail-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateId } from "@/lib/utils";

export default function NewMediatorPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", pan: "", aadhaar: "",
    bankName: "", accountNumber: "", commissionType: "One-Time",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => router.push(`/mediators/${generateId("MED")}`), 1500);
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div>
      <DetailHeader backHref="/mediators" backLabel="Back to Mediators" title="Add Mediator" subtitle="Auto-generated mediator ID on save" />
      {saved ? (
        <Card><CardContent className="py-12 text-center"><p className="text-lg font-semibold text-emerald-700">Mediator created successfully!</p></CardContent></Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Mediator Details</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div><label className="mb-1 block text-sm font-medium">Name *</label><Input required value={form.name} onChange={(e) => update("name", e.target.value)} /></div>
              <div><label className="mb-1 block text-sm font-medium">Phone *</label><Input required value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
              <div><label className="mb-1 block text-sm font-medium">Email *</label><Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
              <div><label className="mb-1 block text-sm font-medium">PAN *</label><Input required value={form.pan} onChange={(e) => update("pan", e.target.value)} /></div>
              <div><label className="mb-1 block text-sm font-medium">Aadhaar *</label><Input required value={form.aadhaar} onChange={(e) => update("aadhaar", e.target.value)} /></div>
              <div>
                <label className="mb-1 block text-sm font-medium">Commission Type *</label>
                <select className="flex h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" value={form.commissionType} onChange={(e) => update("commissionType", e.target.value)}>
                  {["One-Time", "Trail Commission", "Hybrid", "Recovery-Linked", "Clawback"].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div><label className="mb-1 block text-sm font-medium">Bank Name *</label><Input required value={form.bankName} onChange={(e) => update("bankName", e.target.value)} /></div>
              <div><label className="mb-1 block text-sm font-medium">Account Number *</label><Input required value={form.accountNumber} onChange={(e) => update("accountNumber", e.target.value)} /></div>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Button type="submit">Create Mediator</Button>
            <Button type="button" variant="outline" onClick={() => router.push("/mediators")}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
}
