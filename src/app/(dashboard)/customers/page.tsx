"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Plus, Eye } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { customers } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function CustomersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const tableData = filtered.map((c) => ({
    _id: c.id,
    id: <span className="font-mono text-xs text-blue-700">{c.id}</span>,
    name: (
      <div>
        <p className="font-medium">{c.name}</p>
        <p className="text-xs text-slate-500">{c.email}</p>
      </div>
    ),
    phone: c.phone,
    type: <Badge variant="secondary">{c.borrowerType}</Badge>,
    loans: <span className="font-semibold">{c.loanCount}</span>,
    status: <Badge variant={c.status === "active" ? "success" : "secondary"}>{c.status}</Badge>,
    created: formatDate(c.createdAt),
    actions: (
      <Link href={`/customers/${c.id}`} onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
      </Link>
    ),
  }));

  return (
    <div>
      <PageHeader
        title="Customer Management"
        description="Manage borrower profiles, co-applicants, guarantors, and loan history"
        icon={Users}
        action={{ label: "Add Customer", href: "/customers/new" }}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Total Customers</p><p className="text-2xl font-bold">{customers.length}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Active</p><p className="text-2xl font-bold text-emerald-600">{customers.filter((c) => c.status === "active").length}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">With Multiple Loans</p><p className="text-2xl font-bold">{customers.filter((c) => c.loanCount > 1).length}</p></CardContent></Card>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, ID, or phone..." className="sm:w-80" />
        <Link href="/customers/new"><Button><Plus className="h-4 w-4" /> New Customer</Button></Link>
      </div>

      <DataTable
        columns={[
          { key: "id", label: "Customer ID" },
          { key: "name", label: "Name" },
          { key: "phone", label: "Phone" },
          { key: "type", label: "Type" },
          { key: "loans", label: "Loans" },
          { key: "status", label: "Status" },
          { key: "created", label: "Created" },
          { key: "actions", label: "" },
        ]}
        data={tableData}
        onRowClick={(row) => router.push(`/customers/${row._id}`)}
      />
    </div>
  );
}
