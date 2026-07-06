import Link from "next/link";
import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDocumentById, getDocumentVersionsByDocumentId } from "@/lib/data-helpers";
import { formatDate } from "@/lib/utils";

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = getDocumentById(id);

  if (!doc) {
    return <NotFoundCard title="Document Not Found" message={`No document found with ID ${id}.`} backHref="/documents" />;
  }

  const versions = getDocumentVersionsByDocumentId(id);

  const versionTableData = versions.map((v) => ({
    version: `v${v.version}`,
    file: v.fileName,
    uploadedBy: v.uploadedBy,
    date: formatDate(v.uploadedAt),
    changes: v.changes,
  }));

  return (
    <div>
      <DetailHeader
        backHref="/documents"
        backLabel="Back to Documents"
        title={doc.name}
        subtitle={`${doc.id} · Version ${doc.version}`}
        badge={<Badge variant="secondary">{doc.category}</Badge>}
        actions={<Button variant="outline">Download</Button>}
      />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Document Information</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            items={[
              { label: "Document ID", value: <span className="font-mono">{doc.id}</span> },
              { label: "File Name", value: doc.fileName },
              { label: "File Size", value: doc.fileSize },
              { label: "Category", value: <Badge variant="secondary">{doc.category}</Badge> },
              { label: "Uploaded By", value: doc.uploadedBy },
              { label: "Uploaded On", value: formatDate(doc.uploadedAt) },
              {
                label: "Customer",
                value: doc.customerId ? (
                  <Link href={`/customers/${doc.customerId}`} className="text-blue-700 hover:underline">{doc.customerId}</Link>
                ) : "—",
              },
              {
                label: "Loan",
                value: doc.loanId ? (
                  <Link href={`/loans/${doc.loanId}`} className="font-mono text-blue-700 hover:underline">{doc.loanId}</Link>
                ) : "—",
              },
            ]}
          />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Document Preview</CardTitle></CardHeader>
        <CardContent>
          <div className="flex h-72 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
            <div className="text-center">
              <p className="font-medium">{doc.fileName}</p>
              <p className="mt-1 text-sm text-slate-500">{doc.fileSize}</p>
              <Button variant="outline" size="sm" className="mt-4">Open Preview</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Version History</CardTitle></CardHeader>
        <CardContent>
          {versionTableData.length > 0 ? (
            <DataTable
              columns={[
                { key: "version", label: "Version" },
                { key: "file", label: "File" },
                { key: "uploadedBy", label: "Uploaded By" },
                { key: "date", label: "Date" },
                { key: "changes", label: "Changes" },
              ]}
              data={versionTableData}
            />
          ) : (
            <p className="text-sm text-slate-500">No previous versions. Current version: v{doc.version}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
