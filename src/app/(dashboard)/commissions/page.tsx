"use client";

import { useRouter } from "next/navigation";
import { Coins } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { commissions } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const commissionTypes = ["One-Time", "Trail Commission", "Hybrid", "Recovery Linked", "Clawback"];
const commissionBasis = ["Loan Amount", "Interest Earned"];

export default function CommissionsPage() {
  const router = useRouter();

  const tableData = commissions.map((c) => ({
    _id: c.id,
    id: <span className="font-mono text-xs">{c.id}</span>,
    mediator: c.mediatorName,
    loan: c.loanId,
    type: <Badge variant="secondary">{c.type}</Badge>,
    basis: c.basis,
    amount: <span className="font-semibold">{formatCurrency(c.amount)}</span>,
    status: <Badge variant={c.status === "settled" ? "success" : "warning"}>{c.status}</Badge>,
    date: formatDate(c.date),
  }));

  const totalPending = commissions.filter((c) => c.status === "pending").reduce((s, c) => s + c.amount, 0);
  const totalSettled = commissions.filter((c) => c.status === "settled").reduce((s, c) => s + c.amount, 0);

  return (
    <div>
      <PageHeader title="Commission Management" description="Automatic commission calculation, settlement, and reporting" icon={Coins} />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Pending Settlement</p><p className="text-2xl font-bold text-amber-600">{formatCurrency(totalPending)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Settled</p><p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalSettled)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Total Commissions</p><p className="text-2xl font-bold">{commissions.length}</p></CardContent></Card>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Commission Types</p>
          <div className="flex flex-wrap gap-2">{commissionTypes.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}</div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Based On</p>
          <div className="flex flex-wrap gap-2">{commissionBasis.map((b) => <Badge key={b} variant="outline">{b}</Badge>)}</div>
        </div>
      </div>

      <DataTable
        columns={[
          { key: "id", label: "ID" },
          { key: "mediator", label: "Mediator" },
          { key: "loan", label: "Loan ID" },
          { key: "type", label: "Type" },
          { key: "basis", label: "Basis" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
          { key: "date", label: "Date" },
        ]}
        data={tableData}
        onRowClick={(row) => router.push(`/commissions/${row._id}`)}
      />
    </div>
  );
}
