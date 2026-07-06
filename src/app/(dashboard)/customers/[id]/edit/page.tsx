"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DetailHeader } from "@/components/shared/detail-header";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCustomerById } from "@/lib/data-helpers";

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const customer = getCustomerById(id);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(
    customer
      ? {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          status: customer.status,
          coApplicantName: customer.coApplicant?.name ?? "",
          coApplicantRelation: customer.coApplicant?.relation ?? "",
          coApplicantPhone: customer.coApplicant?.phone ?? "",
          guarantorName: customer.guarantor?.name ?? "",
          guarantorRelation: customer.guarantor?.relation ?? "",
          guarantorPhone: customer.guarantor?.phone ?? "",
        }
      : null
  );

  if (!customer || !form) {
    return (
      <NotFoundCard
        title="Customer Not Found"
        message="The customer you're trying to edit does not exist."
        backHref="/customers"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => router.push(`/customers/${id}`), 1200);
  };

  const update = (field: string, value: string) => setForm((f) => (f ? { ...f, [field]: value } : f));

  return (
    <div>
      <DetailHeader
        backHref={`/customers/${id}`}
        backLabel="Back to Profile"
        title="Edit Customer"
        subtitle={customer.id}
      />

      {saved ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-semibold text-emerald-700">Changes saved successfully!</p>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Borrower Profile</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <Input required value={form.name} onChange={(e) => update("name", e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Status</label>
                <select className="flex h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" value={form.status} onChange={(e) => update("status", e.target.value)}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <Input required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Address</label>
                <Input required value={form.address} onChange={(e) => update("address", e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Co-Applicant</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <Input placeholder="Name" value={form.coApplicantName} onChange={(e) => update("coApplicantName", e.target.value)} />
              <Input placeholder="Relation" value={form.coApplicantRelation} onChange={(e) => update("coApplicantRelation", e.target.value)} />
              <Input placeholder="Phone" value={form.coApplicantPhone} onChange={(e) => update("coApplicantPhone", e.target.value)} />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Guarantor</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <Input placeholder="Name" value={form.guarantorName} onChange={(e) => update("guarantorName", e.target.value)} />
              <Input placeholder="Relation" value={form.guarantorRelation} onChange={(e) => update("guarantorRelation", e.target.value)} />
              <Input placeholder="Phone" value={form.guarantorPhone} onChange={(e) => update("guarantorPhone", e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="outline" onClick={() => router.push(`/customers/${id}`)}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
}
