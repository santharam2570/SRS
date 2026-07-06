import Link from "next/link";
import { CheckCircle, ClipboardCheck, IndianRupee } from "lucide-react";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getApplicationById,
  getCustomerById,
  getLoanByApplicationId,
  verificationLabels,
} from "@/lib/data-helpers";
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

const workflowSteps = [
  { key: "created", label: "Application Created", done: true },
  { key: "verification", label: "Verification", statuses: ["pending_verification"] },
  { key: "approval", label: "MD Approval", statuses: ["pending_approval"] },
  { key: "approved", label: "Approved", statuses: ["approved", "disbursed", "active"] },
  { key: "disbursed", label: "Disbursed", statuses: ["disbursed", "active"] },
];

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = getApplicationById(id);

  if (!app) {
    return (
      <NotFoundCard
        title="Application Not Found"
        message={`No application found with ID ${id}.`}
        backHref="/applications"
      />
    );
  }

  const customer = getCustomerById(app.customerId);
  const loan = getLoanByApplicationId(app.id);
  const verifiedCount = Object.values(app.verificationStatus).filter(Boolean).length;
  const totalChecks = Object.keys(app.verificationStatus).length;

  return (
    <div>
      <DetailHeader
        backHref="/applications"
        backLabel="Back to Applications"
        title={app.loanId || app.id}
        subtitle={`${app.customerName} · ${app.productName}`}
        badge={<Badge variant={statusVariant[app.status]}>{app.status.replace(/_/g, " ")}</Badge>}
        actions={
          <>
            {app.status === "pending_verification" && (
              <Link href={`/verification/${app.id}`}>
                <Button variant="outline"><ClipboardCheck className="h-4 w-4" /> Verify</Button>
              </Link>
            )}
            {app.status === "pending_approval" && (
              <Link href={`/approval/${app.id}`}>
                <Button variant="outline"><CheckCircle className="h-4 w-4" /> Review Approval</Button>
              </Link>
            )}
            {app.status === "approved" && loan && (
              <Link href={`/disbursement/${loan.id}`}>
                <Button><IndianRupee className="h-4 w-4" /> Disburse</Button>
              </Link>
            )}
            {loan && (
              <Link href={`/loans/${loan.id}`}>
                <Button variant="outline">View Loan</Button>
              </Link>
            )}
          </>
        }
      />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Application Details</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            items={[
              { label: "Application ID", value: <span className="font-mono">{app.id}</span> },
              { label: "Loan ID", value: app.loanId ? <span className="font-mono">{app.loanId}</span> : "Pending" },
              {
                label: "Customer",
                value: (
                  <Link href={`/customers/${app.customerId}`} className="text-blue-700 hover:underline">
                    {app.customerName}
                  </Link>
                ),
              },
              { label: "Product", value: app.productName },
              { label: "Amount", value: formatCurrency(app.amount) },
              { label: "Purpose", value: app.purpose },
              { label: "Mediator", value: app.mediatorName || "Direct" },
              { label: "Applied On", value: formatDate(app.createdAt) },
              { label: "Approved On", value: app.approvedAt ? formatDate(app.approvedAt) : "—" },
              { label: "Remarks", value: app.remarks || "—" },
            ]}
          />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Workflow Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {workflowSteps.map((step, i) => {
              const isDone =
                step.done ||
                (step.statuses?.includes(app.status) ?? false) ||
                (i < 3 && ["approved", "disbursed", "active", "closed"].includes(app.status));
              return (
                <div
                  key={step.key}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${
                    isDone ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 text-slate-500"
                  }`}
                >
                  {isDone && <CheckCircle className="h-4 w-4" />}
                  {step.label}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Verification Checklist ({verifiedCount}/{totalChecks})</CardTitle>
          <Link href={`/verification/${app.id}`}>
            <Button size="sm" variant="outline">Open Verification</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(app.verificationStatus).map(([key, verified]) => (
              <div
                key={key}
                className={`rounded-lg border p-3 ${verified ? "border-emerald-200 bg-emerald-50" : "border-slate-200"}`}
              >
                <p className="text-sm font-medium">{verificationLabels[key] || key}</p>
                <Badge variant={verified ? "success" : "warning"} className="mt-2">
                  {verified ? "Verified" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {customer && (
        <Card>
          <CardHeader><CardTitle className="text-base">Customer Snapshot</CardTitle></CardHeader>
          <CardContent>
            <InfoGrid
              columns={2}
              items={[
                { label: "Phone", value: customer.phone },
                { label: "Email", value: customer.email },
                { label: "Address", value: customer.address },
                { label: "Borrower Type", value: customer.borrowerType },
              ]}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
