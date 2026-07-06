"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Wallet, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs } from "@/components/shared/tabs";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { collections } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CollectionsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "cash", label: "Cash" },
    { id: "bank", label: "Bank" },
    { id: "online", label: "Online" },
  ];

  const filtered = activeTab === "all" ? collections : collections.filter((c) => c.type === activeTab);
  const todayTotal = collections.reduce((s, c) => s + c.amount, 0);

  const tableData = filtered.map((c) => ({
    _id: c.id,
    receipt: <span className="font-mono text-xs text-blue-700">{c.receiptNo}</span>,
    loan: c.loanId,
    customer: c.customerName,
    amount: <span className="font-semibold">{formatCurrency(c.amount)}</span>,
    type: <Badge variant="secondary">{c.type}</Badge>,
    partial: c.isPartial ? <Badge variant="warning">Partial</Badge> : <Badge variant="success">Full</Badge>,
    date: formatDate(c.date),
  }));

  return (
    <div>
      <PageHeader title="Collection Module" description="Daily cash, bank, and online collections with receipt generation" icon={Wallet} action={{ label: "Record Collection", href: "/collections/new" }} />

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Today&apos;s Collections</p><p className="text-2xl font-bold">{formatCurrency(todayTotal)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Cash</p><p className="text-2xl font-bold">{collections.filter((c) => c.type === "cash").length}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Bank</p><p className="text-2xl font-bold">{collections.filter((c) => c.type === "bank").length}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Online</p><p className="text-2xl font-bold">{collections.filter((c) => c.type === "online").length}</p></CardContent></Card>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-4" />

      <div className="mb-4 flex gap-2">
        <Link href="/collections/new"><Button><Plus className="h-4 w-4" /> Daily Collection</Button></Link>
        <Link href="/collections/new"><Button variant="outline">Partial Payment</Button></Link>
        <Link href="/collections/new"><Button variant="outline">Advance Payment</Button></Link>
      </div>

      <DataTable
        columns={[
          { key: "receipt", label: "Receipt #" },
          { key: "loan", label: "Loan ID" },
          { key: "customer", label: "Customer" },
          { key: "amount", label: "Amount" },
          { key: "type", label: "Type" },
          { key: "partial", label: "Payment" },
          { key: "date", label: "Date" },
        ]}
        data={tableData}
        onRowClick={(row) => router.push(`/collections/${row._id}`)}
      />
    </div>
  );
}
