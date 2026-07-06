"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCommissionById } from "@/lib/data-helpers";
import { formatCurrency } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function CommissionDetailPage() {
  const params = useParams();
  const commission = getCommissionById(params.id as string);
  const [settled, setSettled] = useState(commission?.status === "settled");

  if (!commission) {
    return <NotFoundCard title="Commission Not Found" message="The commission record could not be found." backHref="/commissions" />;
  }

  return (
    <div>
      <DetailHeader
        backHref="/commissions"
        backLabel="Back to Commissions"
        title={`Commission ${commission.id}`}
        subtitle={commission.mediatorName}
        badge={<Badge variant={settled ? "success" : "warning"}>{settled ? "settled" : "pending"}</Badge>}
        actions={
          !settled ? (
            <Button variant="success" onClick={() => setSettled(true)}>
              <CheckCircle className="h-4 w-4" /> Settle Commission
            </Button>
          ) : undefined
        }
      />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Commission Details</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            items={[
              { label: "Commission ID", value: <span className="font-mono">{commission.id}</span> },
              { label: "Mediator", value: <Link href={`/mediators/${commission.mediatorId}`} className="text-blue-700 hover:underline">{commission.mediatorName}</Link> },
              { label: "Loan", value: <Link href={`/loans/${commission.loanId}`} className="font-mono text-blue-700 hover:underline">{commission.loanId}</Link> },
              { label: "Type", value: commission.type },
              { label: "Basis", value: commission.basis },
              { label: "Amount", value: <span className="text-lg font-bold">{formatCurrency(commission.amount)}</span> },
              { label: "Date", value: commission.date },
              { label: "Status", value: <Badge variant={settled ? "success" : "warning"}>{settled ? "Settled" : "Pending"}</Badge> },
            ]}
          />
        </CardContent>
      </Card>

      {settled && (
        <Card>
          <CardContent className="py-6 text-center text-sm text-emerald-700">
            Commission of {formatCurrency(commission.amount)} settled to {commission.mediatorName}&apos;s bank account.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
