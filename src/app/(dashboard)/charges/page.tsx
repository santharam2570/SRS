"use client";

import { useRouter } from "next/navigation";
import { Receipt } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { loanCharges } from "@/lib/mock-data";

export default function ChargesPage() {
  const router = useRouter();

  const tableData = loanCharges.map((c) => ({
    _id: c.id,
    id: <span className="font-mono text-xs">{c.id}</span>,
    name: <span className="font-medium">{c.name}</span>,
    type: <Badge variant="secondary">{c.type.replace(/_/g, " ")}</Badge>,
    amount: <span className="font-semibold">{c.isPercentage ? `${c.amount}%` : `₹${c.amount.toLocaleString()}`}</span>,
    basis: c.isPercentage ? "Percentage" : "Fixed",
    status: <Badge variant={c.status === "active" ? "success" : "secondary"}>{c.status}</Badge>,
  }));

  return (
    <div>
      <PageHeader title="Loan Charges Master" description="Configurable processing, documentation, legal, GST, penal, and foreclosure charges" icon={Receipt} />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {["Processing Fee", "Documentation Charges", "Legal Charges", "Valuation Charges", "Stamp Duty", "Insurance", "GST", "Penal Interest", "Bounce Charges", "Collection Charges", "Renewal Charges", "Foreclosure Charges", "Part Payment Charges"].map((charge) => (
          <div key={charge} className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-md">
            <p className="text-sm font-medium text-slate-900">{charge}</p>
            <p className="mt-1 text-xs text-slate-500">Configurable</p>
          </div>
        ))}
      </div>

      <DataTable
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Charge Name" },
          { key: "type", label: "Type" },
          { key: "amount", label: "Amount" },
          { key: "basis", label: "Basis" },
          { key: "status", label: "Status" },
        ]}
        data={tableData}
        onRowClick={(row) => router.push(`/charges/${row._id}`)}
      />
    </div>
  );
}
