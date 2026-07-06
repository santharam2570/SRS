import { DetailHeader } from "@/components/shared/detail-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginHistory } from "@/lib/data-helpers";

export default function LoginHistoryPage() {
  const tableData = loginHistory.map((log) => ({
    id: <span className="font-mono text-xs">{log.id}</span>,
    user: log.userName,
    timestamp: log.timestamp,
    ip: <span className="font-mono text-xs text-slate-500">{log.ipAddress}</span>,
    device: log.device,
    status: <Badge variant={log.status === "success" ? "success" : "danger"}>{log.status}</Badge>,
  }));

  return (
    <div>
      <DetailHeader backHref="/audit" backLabel="Back to Audit" title="Login History" subtitle="User authentication and session records" />
      <Card>
        <CardHeader><CardTitle className="text-base">All Login Attempts</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: "id", label: "Log ID" },
              { key: "user", label: "User" },
              { key: "timestamp", label: "Timestamp" },
              { key: "ip", label: "IP Address" },
              { key: "device", label: "Device" },
              { key: "status", label: "Status" },
            ]}
            data={tableData}
          />
        </CardContent>
      </Card>
    </div>
  );
}
