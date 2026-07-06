import Link from "next/link";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductById } from "@/lib/data-helpers";
import { formatCurrency } from "@/lib/utils";

export default async function LoanProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return (
      <NotFoundCard title="Product Not Found" message={`No loan product found with ID ${id}.`} backHref="/loan-products" />
    );
  }

  return (
    <div>
      <DetailHeader
        backHref="/loan-products"
        backLabel="Back to Products"
        title={product.name}
        subtitle={product.id}
        badge={<Badge variant={product.status === "active" ? "success" : "secondary"}>{product.status}</Badge>}
        actions={
          <Link href={`/applications/new?productId=${id}`}>
            <Button>Create Application</Button>
          </Link>
        }
      />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Product Configuration</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            items={[
              { label: "Product ID", value: <span className="font-mono">{product.id}</span> },
              { label: "Security Type", value: product.securityType },
              { label: "Interest Rate", value: `${product.interestRate}% p.a.` },
              { label: "Processing Fee", value: `${product.processingFee}%` },
              { label: "Documentation Charges", value: formatCurrency(product.documentationCharges) },
              { label: "Min Amount", value: formatCurrency(product.minAmount) },
              { label: "Max Amount", value: formatCurrency(product.maxAmount) },
              { label: "Tenure", value: `${product.tenureMonths} months` },
              { label: "Repayment Frequency", value: product.repaymentFrequency },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Applicable Charges</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            Processing fee, documentation charges, legal charges, stamp duty, GST, and penal interest apply as per company policy.
          </p>
          <Link href="/charges" className="mt-4 inline-block">
            <Button variant="outline" size="sm">View Charges Master</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
