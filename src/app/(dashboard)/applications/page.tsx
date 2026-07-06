"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs } from "@/components/shared/tabs";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { loanApplications } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusVariant: Record<string, "default" | "success" | "warning" | "danger" | "secondary"> = {
  draft: "secondary",
  pending_verification: "warning",
  pending_approval: "warning",
  approved: "success",
  rejected: "danger",
  disbursed: "success",
  active: "success",
  closed: "secondary",
  npa: "danger",
};

export default function ApplicationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All", count: loanApplications.length },
    { id: "pending_verification", label: "Verification", count: loanApplications.filter((a) => a.status === "pending_verification").length },
    { id: "pending_approval", label: "Pending Approval", count: loanApplications.filter((a) => a.status === "pending_approval").length },
    { id: "approved", label: "Approved", count: loanApplications.filter((a) => a.status === "approved").length },
    { id: "active", label: "Active", count: loanApplications.filter((a) => a.status === "active").length },
  ];

  const filtered = activeTab === "all" ? loanApplications : loanApplications.filter((a) => a.status === activeTab);

  const tableData = filtered.map((a) => ({
    _id: a.id,
    id: <span className="font-mono text-xs text-blue-700">{a.loanId || a.id}</span>,
    customer: (
      <div>
        <p className="font-medium">{a.customerName}</p>
        <p className="text-xs text-slate-500">{a.customerId}</p>
      </div>
    ),
    product: a.productName,
    amount: <span className="font-semibold">{formatCurrency(a.amount)}</span>,
    purpose: a.purpose,
    mediator: a.mediatorName || "—",
    status: <Badge variant={statusVariant[a.status]}>{a.status.replace(/_/g, " ")}</Badge>,
    date: formatDate(a.createdAt),
  }));

  return (
    <div>
      <PageHeader
        title="Loan Applications"
        description="Create and manage loan applications with document uploads and mediator assignment"
        icon={FileText}
        action={{ label: "New Application", href: "/applications/new" }}
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      <div className="mb-4">
        <Link href="/applications/new"><Button><Plus className="h-4 w-4" /> Create Loan Application</Button></Link>
      </div>

      <DataTable
        columns={[
          { key: "id", label: "Loan / App ID" },
          { key: "customer", label: "Customer" },
          { key: "product", label: "Product" },
          { key: "amount", label: "Amount" },
          { key: "purpose", label: "Purpose" },
          { key: "mediator", label: "Mediator" },
          { key: "status", label: "Status" },
          { key: "date", label: "Date" },
        ]}
        data={tableData}
        onRowClick={(row) => router.push(`/applications/${row._id}`)}
      />
    </div>
  );
}
