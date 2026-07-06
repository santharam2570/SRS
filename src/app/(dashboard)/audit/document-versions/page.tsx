import { DetailHeader } from "@/components/shared/detail-header";
import { DataTable } from "@/components/shared/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { documentVersions } from "@/lib/data-helpers";
import { formatDate } from "@/lib/utils";

export default function DocumentVersionsPage() {
  const tableData = documentVersions.map((v) => ({
    id: <span className="font-mono text-xs">{v.id}</span>,
    document: v.documentName,
    version: `v${v.version}`,
    file: v.fileName,
    uploadedBy: v.uploadedBy,
    date: formatDate(v.uploadedAt),
    changes: v.changes,
  }));

  return (
    <div>
      <DetailHeader backHref="/audit" backLabel="Back to Audit" title="Document Version History" subtitle="Track all document uploads and revisions" />
      <Card>
        <CardHeader><CardTitle className="text-base">Version Records</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: "id", label: "Version ID" },
              { key: "document", label: "Document" },
              { key: "version", label: "Version" },
              { key: "file", label: "File" },
              { key: "uploadedBy", label: "Uploaded By" },
              { key: "date", label: "Date" },
              { key: "changes", label: "Changes" },
            ]}
            data={tableData}
          />
        </CardContent>
      </Card>
    </div>
  );
}
