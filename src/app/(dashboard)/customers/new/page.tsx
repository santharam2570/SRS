"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DetailHeader } from "@/components/shared/detail-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateId } from "@/lib/utils";

export default function NewCustomerPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    borrowerType: "individual",
    coApplicantName: "",
    coApplicantRelation: "",
    coApplicantPhone: "",
    guarantorName: "",
    guarantorRelation: "",
    guarantorPhone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = generateId("CUST");
    setSubmitted(true);
    setTimeout(() => router.push(`/customers/${newId}`), 1500);
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div>
      <DetailHeader
        backHref="/customers"
        backLabel="Back to Customers"
        title="Add New Customer"
        subtitle="Auto-generated customer ID will be assigned on save"
      />

      {submitted ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-semibold text-emerald-700">Customer created successfully!</p>
            <p className="mt-2 text-sm text-slate-500">Redirecting to customer profile...</p>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Borrower Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Full Name *</label>
                <Input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter full name" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Borrower Type *</label>
                <select
                  className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
                  value={form.borrowerType}
                  onChange={(e) => update("borrowerType", e.target.value)}
                >
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email *</label>
                <Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Phone *</label>
                <Input required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">Address *</label>
                <Input required value={form.address} onChange={(e) => update("address", e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Co-Applicant (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <Input placeholder="Name" value={form.coApplicantName} onChange={(e) => update("coApplicantName", e.target.value)} />
              <Input placeholder="Relation" value={form.coApplicantRelation} onChange={(e) => update("coApplicantRelation", e.target.value)} />
              <Input placeholder="Phone" value={form.coApplicantPhone} onChange={(e) => update("coApplicantPhone", e.target.value)} />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Guarantor (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <Input placeholder="Name" value={form.guarantorName} onChange={(e) => update("guarantorName", e.target.value)} />
              <Input placeholder="Relation" value={form.guarantorRelation} onChange={(e) => update("guarantorRelation", e.target.value)} />
              <Input placeholder="Phone" value={form.guarantorPhone} onChange={(e) => update("guarantorPhone", e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="submit">Create Customer</Button>
            <Button type="button" variant="outline" onClick={() => router.push("/customers")}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
}
