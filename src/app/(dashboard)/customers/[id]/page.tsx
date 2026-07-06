import Link from "next/link";
import { Edit, FileText, Shield } from "lucide-react";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCustomerById,
  getKycByCustomerId,
  getLoansByCustomerId,
  getApplicationsByCustomerId,
} from "@/lib/data-helpers";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusVariant: Record<string, "default" | "success" | "warning" | "danger" | "secondary"> = {
  active: "success",
  approved: "success",
  disbursed: "success",
  pending_verification: "warning",
  pending_approval: "warning",
  closed: "secondary",
  rejected: "danger",
  npa: "danger",
};

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = getCustomerById(id);

  if (!customer) {
    return (
      <NotFoundCard
        title="Customer Not Found"
        message={`No customer found with ID ${id}.`}
        backHref="/customers"
        backLabel="Back to Customers"
      />
    );
  }

  const kycDocs = getKycByCustomerId(id);
  const customerLoans = getLoansByCustomerId(id);
  const applications = getApplicationsByCustomerId(id);

  const loanTableData = customerLoans.map((loan) => ({
    id: (
      <Link href={`/loans/${loan.id}`} className="font-mono text-xs text-blue-700 hover:underline">
        {loan.id}
      </Link>
    ),
    product: loan.productName,
    amount: formatCurrency(loan.amount),
    outstanding: formatCurrency(loan.outstandingBalance),
    status: <Badge variant={statusVariant[loan.status] ?? "secondary"}>{loan.status}</Badge>,
    disbursed: loan.disbursedAt ? formatDate(loan.disbursedAt) : "—",
  }));

  const appTableData = applications.map((app) => ({
    id: (
      <Link href={`/applications/${app.id}`} className="font-mono text-xs text-blue-700 hover:underline">
        {app.id}
      </Link>
    ),
    product: app.productName,
    amount: formatCurrency(app.amount),
    status: <Badge variant={statusVariant[app.status] ?? "secondary"}>{app.status.replace(/_/g, " ")}</Badge>,
    date: formatDate(app.createdAt),
  }));

  const kycTableData = kycDocs.map((doc) => ({
    id: (
      <Link href={`/kyc/${doc.id}`} className="font-mono text-xs text-blue-700 hover:underline">
        {doc.id}
      </Link>
    ),
    type: doc.documentType,
    category: <Badge variant="secondary">{doc.category}</Badge>,
    status: (
      <Badge variant={doc.status === "verified" ? "success" : doc.status === "rejected" ? "danger" : "warning"}>
        {doc.status}
      </Badge>
    ),
    uploaded: formatDate(doc.uploadedAt),
  }));

  return (
    <div>
      <DetailHeader
        backHref="/customers"
        backLabel="Back to Customers"
        title={customer.name}
        subtitle={`${customer.id} · ${customer.borrowerType} borrower`}
        badge={<Badge variant={customer.status === "active" ? "success" : "secondary"}>{customer.status}</Badge>}
        actions={
          <>
            <Link href={`/customers/${id}/edit`}>
              <Button variant="outline">
                <Edit className="h-4 w-4" /> Edit
              </Button>
            </Link>
            <Link href={`/applications/new?customerId=${id}`}>
              <Button>
                <FileText className="h-4 w-4" /> New Application
              </Button>
            </Link>
          </>
        }
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Borrower Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoGrid
            items={[
              { label: "Customer ID", value: <span className="font-mono">{customer.id}</span> },
              { label: "Email", value: customer.email },
              { label: "Phone", value: customer.phone },
              { label: "Address", value: customer.address },
              { label: "Borrower Type", value: customer.borrowerType },
              { label: "Active Loans", value: customer.loanCount },
              { label: "Member Since", value: formatDate(customer.createdAt) },
            ]}
          />
        </CardContent>
      </Card>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Co-Applicant Details</CardTitle>
          </CardHeader>
          <CardContent>
            {customer.coApplicant ? (
              <InfoGrid
                columns={2}
                items={[
                  { label: "Name", value: customer.coApplicant.name },
                  { label: "Relation", value: customer.coApplicant.relation },
                  { label: "Phone", value: customer.coApplicant.phone },
                ]}
              />
            ) : (
              <p className="text-sm text-slate-500">No co-applicant on record.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Guarantor Details</CardTitle>
          </CardHeader>
          <CardContent>
            {customer.guarantor ? (
              <InfoGrid
                columns={2}
                items={[
                  { label: "Name", value: customer.guarantor.name },
                  { label: "Relation", value: customer.guarantor.relation },
                  { label: "Phone", value: customer.guarantor.phone },
                ]}
              />
            ) : (
              <p className="text-sm text-slate-500">No guarantor on record.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4" /> KYC Documents
          </CardTitle>
          <Link href="/kyc">
            <Button variant="outline" size="sm">Manage KYC</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {kycTableData.length > 0 ? (
            <DataTable
              columns={[
                { key: "id", label: "Doc ID" },
                { key: "type", label: "Document" },
                { key: "category", label: "Category" },
                { key: "status", label: "Status" },
                { key: "uploaded", label: "Uploaded" },
              ]}
              data={kycTableData}
            />
          ) : (
            <p className="text-sm text-slate-500">No KYC documents uploaded yet.</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Loan Accounts ({customerLoans.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loanTableData.length > 0 ? (
            <DataTable
              columns={[
                { key: "id", label: "Loan ID" },
                { key: "product", label: "Product" },
                { key: "amount", label: "Sanctioned" },
                { key: "outstanding", label: "Outstanding" },
                { key: "status", label: "Status" },
                { key: "disbursed", label: "Disbursed" },
              ]}
              data={loanTableData}
            />
          ) : (
            <p className="text-sm text-slate-500">No active loan accounts.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Application History</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: "id", label: "Application ID" },
              { key: "product", label: "Product" },
              { key: "amount", label: "Amount" },
              { key: "status", label: "Status" },
              { key: "date", label: "Applied" },
            ]}
            data={appTableData}
          />
        </CardContent>
      </Card>
    </div>
  );
}
