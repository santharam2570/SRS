"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loanProducts } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function LoanProductsPage() {
  const router = useRouter();

  const tableData = loanProducts.map((p) => ({
    _id: p.id,
    id: <span className="font-mono text-xs text-blue-700">{p.id}</span>,
    name: <span className="font-medium">{p.name}</span>,
    security: <Badge variant="secondary">{p.securityType}</Badge>,
    rate: <span className="font-semibold text-emerald-700">{p.interestRate}%</span>,
    range: <span className="text-xs">{formatCurrency(p.minAmount)} – {formatCurrency(p.maxAmount)}</span>,
    tenure: `${p.tenureMonths} months`,
    frequency: p.repaymentFrequency,
    status: <Badge variant={p.status === "active" ? "success" : "secondary"}>{p.status}</Badge>,
  }));

  return (
    <div>
      <PageHeader title="Loan Product Master" description="Configure loan products by security type with rates, fees, and tenure" icon={Package} action={{ label: "Add Product", href: "/loan-products/new" }} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loanProducts.map((p) => (
          <Link key={p.id} href={`/loan-products/${p.id}`}>
            <Card className="cursor-pointer transition-all hover:shadow-md">
              <CardHeader className="pb-2"><CardTitle className="text-base">{p.name}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Interest</span><span className="font-semibold">{p.interestRate}%</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Max Amount</span><span>{formatCurrency(p.maxAmount)}</span></div>
                  <Badge variant="success" className="mt-2">{p.securityType}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <DataTable
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Product" },
          { key: "security", label: "Security" },
          { key: "rate", label: "Interest Rate" },
          { key: "range", label: "Amount Range" },
          { key: "tenure", label: "Tenure" },
          { key: "frequency", label: "Frequency" },
          { key: "status", label: "Status" },
        ]}
        data={tableData}
        onRowClick={(row) => router.push(`/loan-products/${row._id}`)}
      />
    </div>
  );
}
