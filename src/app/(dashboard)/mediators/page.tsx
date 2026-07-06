"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Handshake } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { mediators } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function MediatorsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = mediators.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase())
  );

  const tableData = filtered.map((m) => ({
    _id: m.id,
    id: <span className="font-mono text-xs text-blue-700">{m.id}</span>,
    name: (
      <div>
        <p className="font-medium">{m.name}</p>
        <p className="text-xs text-slate-500">{m.email}</p>
      </div>
    ),
    contact: m.phone,
    pan: m.pan,
    bank: `${m.bankName} · ${m.accountNumber}`,
    commission: <Badge variant="default">{m.commissionType}</Badge>,
    earned: <span className="font-semibold">{formatCurrency(m.totalCommission)}</span>,
    status: <Badge variant={m.status === "active" ? "success" : "secondary"}>{m.status}</Badge>,
  }));

  return (
    <div>
      <PageHeader title="Mediator Management" description="Manage mediator profiles, bank details, and commission types" icon={Handshake} action={{ label: "Add Mediator", href: "/mediators/new" }} />
      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search mediators..." className="sm:w-80" />
      </div>
      <DataTable
        columns={[
          { key: "id", label: "Mediator ID" },
          { key: "name", label: "Name" },
          { key: "contact", label: "Contact" },
          { key: "pan", label: "PAN" },
          { key: "bank", label: "Bank Details" },
          { key: "commission", label: "Commission Type" },
          { key: "earned", label: "Total Earned" },
          { key: "status", label: "Status" },
        ]}
        data={tableData}
        onRowClick={(row) => router.push(`/mediators/${row._id}`)}
      />
    </div>
  );
}
