"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DetailHeader } from "@/components/shared/detail-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { userRoles } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

const roleOptions = [
  { value: "super_admin", label: "Super Admin" },
  { value: "md", label: "Managing Director (MD)" },
  { value: "accountant", label: "Accountant" },
  { value: "loan_officer", label: "Loan Officer" },
  { value: "collection_executive", label: "Collection Executive" },
  { value: "auditor", label: "Auditor" },
];

export default function NewUserPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "loan_officer", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => router.push(`/users/${generateId("USR")}`), 1500);
  };

  return (
    <div>
      <DetailHeader backHref="/users" backLabel="Back to Users" title="Add User" subtitle="Create a new system user with role-based access" />
      {saved ? (
        <Card><CardContent className="py-12 text-center"><p className="text-lg font-semibold text-emerald-700">User created successfully!</p></CardContent></Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">User Details</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div><label className="mb-1 block text-sm font-medium">Full Name *</label><Input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} /></div>
              <div><label className="mb-1 block text-sm font-medium">Email *</label><Input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} /></div>
              <div>
                <label className="mb-1 block text-sm font-medium">Role *</label>
                <select className="flex h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
                  {roleOptions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
              <div><label className="mb-1 block text-sm font-medium">Password *</label><Input required type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} /></div>
            </CardContent>
          </Card>
          <Card className="mb-6">
            <CardHeader><CardTitle className="text-base">Available Roles</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userRoles.map((r) => <span key={r} className="rounded-full bg-slate-100 px-3 py-1 text-xs">{r}</span>)}
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Button type="submit">Create User</Button>
            <Button type="button" variant="outline" onClick={() => router.push("/users")}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
}
