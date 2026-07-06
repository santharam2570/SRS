import Link from "next/link";
import { Printer } from "lucide-react";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCollectionById, getLoanById } from "@/lib/data-helpers";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collection = getCollectionById(id);

  if (!collection) {
    return <NotFoundCard title="Receipt Not Found" message="The collection receipt could not be found." backHref="/collections" />;
  }

  const loan = getLoanById(collection.loanId);

  return (
    <div>
      <DetailHeader
        backHref="/collections"
        backLabel="Back to Collections"
        title={`Receipt ${collection.receiptNo}`}
        subtitle={`${collection.customerName} · ${collection.loanId}`}
        badge={<Badge variant={collection.isPartial ? "warning" : "success"}>{collection.isPartial ? "Partial Payment" : "Full Payment"}</Badge>}
        actions={<Button><Printer className="h-4 w-4" /> Print Receipt</Button>}
      />

      <Card className="mb-6 border-2 border-blue-100">
        <CardContent className="p-8">
          <div className="text-center border-b border-slate-200 pb-6">
            <h2 className="text-xl font-bold text-blue-800">FinanceERP</h2>
            <p className="text-sm text-slate-500">Loan Management System</p>
            <p className="mt-4 text-lg font-semibold">PAYMENT RECEIPT</p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-500 uppercase">Receipt Number</p>
              <p className="font-mono font-semibold">{collection.receiptNo}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Date</p>
              <p className="font-semibold">{formatDate(collection.date)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Customer</p>
              <p className="font-semibold">{collection.customerName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Loan ID</p>
              <Link href={`/loans/${collection.loanId}`} className="font-mono text-blue-700 hover:underline">{collection.loanId}</Link>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Payment Type</p>
              <Badge variant="secondary">{collection.type}</Badge>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Amount Received</p>
              <p className="text-2xl font-bold text-emerald-700">{formatCurrency(collection.amount)}</p>
            </div>
          </div>

          {loan && (
            <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
              Outstanding balance after payment: <strong>{formatCurrency(loan.outstandingBalance)}</strong>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-slate-400">This is a computer-generated receipt. No signature required.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Collection Details</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            columns={2}
            items={[
              { label: "Collection ID", value: <span className="font-mono">{collection.id}</span> },
              { label: "Payment Mode", value: collection.type },
              { label: "Payment Type", value: collection.isPartial ? "Partial" : "Full EMI" },
              { label: "Loan Product", value: loan?.productName ?? "—" },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
