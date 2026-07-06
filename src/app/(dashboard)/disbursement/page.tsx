"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Banknote } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loans, disbursements } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function DisbursementPage() {
  const router = useRouter();
  const pendingLoans = loans.filter((l) => l.status === "approved" || (l.status === "active" && l.disbursedAmount < l.amount));

  const tableData = pendingLoans.map((l) => {
    const disb = disbursements.find((d) => d.loanId === l.id);
    return {
      _id: l.id,
      loanId: <span className="font-mono text-xs text-blue-700">{l.id}</span>,
      customer: l.customerName,
      amount: <span className="font-semibold">{formatCurrency(l.amount)}</span>,
      type: <Badge variant="default">{disb?.type === "cash" ? "Cash" : "Bank Transfer"}</Badge>,
      status: <Badge variant={l.disbursedAmount > 0 ? "success" : "warning"}>{l.disbursedAmount > 0 ? "Disbursed" : "Pending"}</Badge>,
      action: l.disbursedAmount === 0 ? (
        <Link href={`/disbursement/${l.id}`} onClick={(e) => e.stopPropagation()}>
          <Button size="sm">Disburse</Button>
        </Link>
      ) : (
        <Link href={`/loans/${l.id}`} onClick={(e) => e.stopPropagation()}>
          <Button size="sm" variant="outline">View</Button>
        </Link>
      ),
    };
  });

  return (
    <div>
      <PageHeader title="Loan Disbursement" description="Process bank transfer and cash disbursements with transaction tracking" icon={Banknote} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card className="transition-all hover:border-blue-300 hover:shadow-md">
          <CardHeader><CardTitle className="text-base">Bank Transfer</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-slate-500">Disburse via NEFT/RTGS/IMPS with bank name and transaction number</p></CardContent>
        </Card>
        <Card className="transition-all hover:border-emerald-300 hover:shadow-md">
          <CardHeader><CardTitle className="text-base">Cash Disbursement</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-slate-500">Cash disbursement with cheque number and receipt generation</p></CardContent>
        </Card>
      </div>

      <DataTable
        columns={[
          { key: "loanId", label: "Loan ID" },
          { key: "customer", label: "Customer" },
          { key: "amount", label: "Amount" },
          { key: "type", label: "Type" },
          { key: "status", label: "Status" },
          { key: "action", label: "" },
        ]}
        data={tableData}
        onRowClick={(row) => router.push(`/disbursement/${row._id}`)}
      />
    </div>
  );
}
