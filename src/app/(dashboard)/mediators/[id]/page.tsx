import Link from "next/link";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMediatorById, getCommissionsByMediatorId } from "@/lib/data-helpers";
import { formatCurrency } from "@/lib/utils";

export default async function MediatorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mediator = getMediatorById(id);

  if (!mediator) {
    return <NotFoundCard title="Mediator Not Found" message={`No mediator found with ID ${id}.`} backHref="/mediators" />;
  }

  const mediatorCommissions = getCommissionsByMediatorId(id);
  const pendingTotal = mediatorCommissions.filter((c) => c.status === "pending").reduce((s, c) => s + c.amount, 0);

  const commissionTableData = mediatorCommissions.map((c) => ({
    id: (
      <Link href={`/commissions/${c.id}`} className="font-mono text-xs text-blue-700 hover:underline">{c.id}</Link>
    ),
    loan: (
      <Link href={`/loans/${c.loanId}`} className="font-mono text-xs hover:underline">{c.loanId}</Link>
    ),
    type: c.type,
    basis: c.basis,
    amount: <span className="font-semibold">{formatCurrency(c.amount)}</span>,
    status: <Badge variant={c.status === "settled" ? "success" : "warning"}>{c.status}</Badge>,
    date: c.date,
  }));

  return (
    <div>
      <DetailHeader
        backHref="/mediators"
        backLabel="Back to Mediators"
        title={mediator.name}
        subtitle={mediator.id}
        badge={<Badge variant={mediator.status === "active" ? "success" : "secondary"}>{mediator.status}</Badge>}
        actions={
          <Link href="/applications/new">
            <Button>New Referral Application</Button>
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Total Earned</p><p className="text-2xl font-bold">{formatCurrency(mediator.totalCommission)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Pending Settlement</p><p className="text-2xl font-bold text-amber-600">{formatCurrency(pendingTotal)}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-slate-500">Commission Type</p><p className="text-2xl font-bold">{mediator.commissionType}</p></CardContent></Card>
      </div>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Mediator Profile</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            items={[
              { label: "Mediator ID", value: <span className="font-mono">{mediator.id}</span> },
              { label: "Phone", value: mediator.phone },
              { label: "Email", value: mediator.email },
              { label: "PAN", value: mediator.pan },
              { label: "Aadhaar", value: mediator.aadhaar },
              { label: "Bank", value: mediator.bankName },
              { label: "Account", value: mediator.accountNumber },
              { label: "Commission Type", value: <Badge>{mediator.commissionType}</Badge> },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Commission History</CardTitle></CardHeader>
        <CardContent>
          {commissionTableData.length > 0 ? (
            <DataTable
              columns={[
                { key: "id", label: "Commission ID" },
                { key: "loan", label: "Loan" },
                { key: "type", label: "Type" },
                { key: "basis", label: "Basis" },
                { key: "amount", label: "Amount" },
                { key: "status", label: "Status" },
                { key: "date", label: "Date" },
              ]}
              data={commissionTableData}
            />
          ) : (
            <p className="text-sm text-slate-500">No commissions recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
