import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChargeById } from "@/lib/data-helpers";
import { formatCurrency } from "@/lib/utils";

export default async function ChargeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const charge = getChargeById(id);

  if (!charge) {
    return <NotFoundCard title="Charge Not Found" message={`No charge found with ID ${id}.`} backHref="/charges" />;
  }

  return (
    <div>
      <DetailHeader
        backHref="/charges"
        backLabel="Back to Charges"
        title={charge.name}
        subtitle={charge.id}
        badge={<Badge variant={charge.status === "active" ? "success" : "secondary"}>{charge.status}</Badge>}
        actions={<Button variant="outline">Edit Charge</Button>}
      />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Charge Configuration</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            items={[
              { label: "Charge ID", value: <span className="font-mono">{charge.id}</span> },
              { label: "Type", value: charge.type.replace(/_/g, " ") },
              { label: "Amount", value: charge.isPercentage ? `${charge.amount}%` : formatCurrency(charge.amount) },
              { label: "Calculation", value: charge.isPercentage ? "Percentage of loan amount" : "Fixed amount" },
              { label: "Status", value: <Badge variant={charge.status === "active" ? "success" : "secondary"}>{charge.status}</Badge> },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Application Rules</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            This charge is automatically applied during loan processing, disbursement, or collection events as per the charge type configuration.
            GST is calculated on applicable service charges.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
