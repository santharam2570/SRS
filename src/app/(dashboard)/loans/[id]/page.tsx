import Link from "next/link";
import { Calendar, FileText, IndianRupee, Settings, Wallet } from "lucide-react";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getLoanById,
  getApplicationById,
  getEmiScheduleByLoanId,
  getCollectionsByLoanId,
  getDisbursementsByLoanId,
  getDocumentsByLoanId,
} from "@/lib/data-helpers";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusVariant: Record<string, "default" | "success" | "warning" | "danger" | "secondary"> = {
  approved: "success",
  active: "success",
  disbursed: "success",
  closed: "secondary",
  npa: "danger",
};

const emiStatusVariant: Record<string, "success" | "warning" | "danger"> = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
};

export default async function LoanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const loan = getLoanById(id);

  if (!loan) {
    return (
      <NotFoundCard
        title="Loan Not Found"
        message={`No loan found with ID ${id}.`}
        backHref="/applications"
        backLabel="Back to Applications"
      />
    );
  }

  const application = getApplicationById(loan.applicationId);
  const emiSchedule = getEmiScheduleByLoanId(id);
  const loanCollections = getCollectionsByLoanId(id);
  const loanDisbursements = getDisbursementsByLoanId(id);
  const loanDocuments = getDocumentsByLoanId(id);
  const paidEmis = emiSchedule.filter((e) => e.status === "paid").length;

  const emiTableData = emiSchedule.map((emi) => ({
    no: emi.installmentNo,
    due: formatDate(emi.dueDate),
    principal: formatCurrency(emi.principal),
    interest: formatCurrency(emi.interest),
    total: <span className="font-semibold">{formatCurrency(emi.totalEmi)}</span>,
    balance: formatCurrency(emi.outstandingBalance),
    status: <Badge variant={emiStatusVariant[emi.status]}>{emi.status}</Badge>,
  }));

  const collectionTableData = loanCollections.map((c) => ({
    receipt: (
      <Link href={`/collections/${c.id}`} className="font-mono text-xs text-blue-700 hover:underline">
        {c.receiptNo}
      </Link>
    ),
    amount: formatCurrency(c.amount),
    type: <Badge variant="secondary">{c.type}</Badge>,
    partial: c.isPartial ? <Badge variant="warning">Partial</Badge> : <Badge variant="success">Full</Badge>,
    date: formatDate(c.date),
  }));

  return (
    <div>
      <DetailHeader
        backHref="/applications"
        backLabel="Back to Applications"
        title={loan.id}
        subtitle={`${loan.customerName} · ${loan.productName}`}
        badge={<Badge variant={statusVariant[loan.status] ?? "secondary"}>{loan.status}</Badge>}
        actions={
          <>
            <Link href={`/customers/${loan.customerId}`}>
              <Button variant="outline">Customer</Button>
            </Link>
            {application && (
              <Link href={`/applications/${application.id}`}>
                <Button variant="outline"><FileText className="h-4 w-4" /> Application</Button>
              </Link>
            )}
            <Link href={`/collections/new?loanId=${id}`}>
              <Button><Wallet className="h-4 w-4" /> Record Collection</Button>
            </Link>
          </>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">Sanctioned Amount</p>
            <p className="text-2xl font-bold">{formatCurrency(loan.amount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">Outstanding</p>
            <p className="text-2xl font-bold text-amber-600">{formatCurrency(loan.outstandingBalance)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">Monthly EMI</p>
            <p className="text-2xl font-bold">{formatCurrency(loan.emiAmount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500">EMIs Paid</p>
            <p className="text-2xl font-bold text-emerald-600">{paidEmis}/{emiSchedule.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Loan Summary</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            items={[
              { label: "Interest Rate", value: `${loan.interestRate}% p.a.` },
              { label: "Tenure", value: `${loan.tenureMonths} months` },
              { label: "Purpose", value: loan.purpose },
              { label: "Disbursed", value: formatCurrency(loan.disbursedAmount) },
              { label: "Mediator", value: loan.mediatorName || "Direct" },
              { label: "Approved", value: loan.approvedAt ? formatDate(loan.approvedAt) : "—" },
              { label: "Disbursed On", value: loan.disbursedAt ? formatDate(loan.disbursedAt) : "Pending" },
            ]}
          />
        </CardContent>
      </Card>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: `/operations/renewal/${id}`, label: "Renewal", icon: Calendar },
          { href: `/operations/top-up/${id}`, label: "Top-up", icon: IndianRupee },
          { href: `/operations/part-payment/${id}`, label: "Part Payment", icon: Wallet },
          { href: `/operations/foreclosure/${id}`, label: "Foreclosure", icon: Settings },
          { href: `/operations/closure/${id}`, label: "Closure", icon: FileText },
          { href: `/operations/reopening/${id}`, label: "Reopening", icon: Settings },
        ].map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="cursor-pointer transition-all hover:shadow-md">
              <CardContent className="flex items-center gap-3 pt-6">
                <Icon className="h-5 w-5 text-blue-700" />
                <span className="font-medium">{label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">EMI Schedule</CardTitle>
          <Link href="/emi-schedule">
            <Button size="sm" variant="outline">Full Schedule View</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {emiTableData.length > 0 ? (
            <DataTable
              columns={[
                { key: "no", label: "#" },
                { key: "due", label: "Due Date" },
                { key: "principal", label: "Principal" },
                { key: "interest", label: "Interest" },
                { key: "total", label: "EMI" },
                { key: "balance", label: "Balance" },
                { key: "status", label: "Status" },
              ]}
              data={emiTableData}
            />
          ) : (
            <p className="text-sm text-slate-500">EMI schedule will be generated after disbursement.</p>
          )}
        </CardContent>
      </Card>

      {loanDisbursements.length > 0 && (
        <Card className="mb-6">
          <CardHeader><CardTitle className="text-base">Disbursement History</CardTitle></CardHeader>
          <CardContent>
            <InfoGrid
              items={loanDisbursements.map((d) => ({
                label: `${d.type === "bank_transfer" ? "Bank Transfer" : "Cash"} · ${formatDate(d.date)}`,
                value: (
                  <div>
                    <p className="font-semibold">{formatCurrency(d.amount)}</p>
                    {d.bankName && <p className="text-xs text-slate-500">{d.bankName} · {d.transactionNumber}</p>}
                    {d.remarks && <p className="text-xs text-slate-400">{d.remarks}</p>}
                  </div>
                ),
              }))}
            />
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Collections</CardTitle>
          <Link href={`/collections/new?loanId=${id}`}>
            <Button size="sm">Record Collection</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {collectionTableData.length > 0 ? (
            <DataTable
              columns={[
                { key: "receipt", label: "Receipt" },
                { key: "amount", label: "Amount" },
                { key: "type", label: "Type" },
                { key: "partial", label: "Payment" },
                { key: "date", label: "Date" },
              ]}
              data={collectionTableData}
            />
          ) : (
            <p className="text-sm text-slate-500">No collections recorded yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Documents</CardTitle></CardHeader>
        <CardContent>
          {loanDocuments.length > 0 ? (
            <div className="space-y-2">
              {loanDocuments.map((doc) => (
                <Link key={doc.id} href={`/documents/${doc.id}`} className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50">
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-slate-500">{doc.fileName} · {doc.fileSize}</p>
                  </div>
                  <Badge variant="secondary">{doc.category}</Badge>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No documents attached.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
