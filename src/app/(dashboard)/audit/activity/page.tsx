import { DetailHeader } from "@/components/shared/detail-header";
import { DataTable } from "@/components/shared/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auditLogs } from "@/lib/data-helpers";

export default function AuditActivityPage() {
  const tableData = auditLogs.map((log) => ({
    id: <span className="font-mono text-xs">{log.id}</span>,
    user: log.userName,
    action: log.action,
    module: log.module,
    timestamp: log.timestamp,
    ip: <span className="font-mono text-xs text-slate-500">{log.ipAddress}</span>,
  }));

  return (
    <div>
      <DetailHeader backHref="/audit" backLabel="Back to Audit" title="User Activity Log" subtitle="Complete audit trail of user actions across all modules" />
      <Card>
        <CardHeader><CardTitle className="text-base">Activity Records</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: "id", label: "Log ID" },
              { key: "user", label: "User" },
              { key: "action", label: "Action" },
              { key: "module", label: "Module" },
              { key: "timestamp", label: "Timestamp" },
              { key: "ip", label: "IP" },
            ]}
            data={tableData}
          />
        </CardContent>
      </Card>
    </div>
  );
}
