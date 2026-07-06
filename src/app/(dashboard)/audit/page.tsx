"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Database, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auditLogs } from "@/lib/mock-data";

const auditLinks = [
  { title: "Audit Log", href: "/audit/activity", desc: "View all activity records" },
  { title: "User Activity Log", href: "/audit/activity", desc: "User actions across modules" },
  { title: "Login History", href: "/audit/login-history", desc: "Authentication records" },
  { title: "Document Version History", href: "/audit/document-versions", desc: "Document revisions" },
];

export default function AuditPage() {
  const router = useRouter();

  const tableData = auditLogs.map((log) => ({
    _id: log.id,
    id: <span className="font-mono text-xs">{log.id}</span>,
    user: log.userName,
    action: log.action,
    module: log.module,
    timestamp: log.timestamp,
    ip: <span className="font-mono text-xs text-slate-500">{log.ipAddress}</span>,
  }));

  return (
    <div>
      <PageHeader title="Audit & Security" description="User activity logs, login history, document versions, and data backup" icon={Shield} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {auditLinks.map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="cursor-pointer transition-all hover:shadow-md h-full">
              <CardContent className="pt-6">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Database className="h-5 w-5" /> Data Backup</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-500">Last backup: Jul 6, 2025 at 02:00 AM</p>
            <Button>Create Backup</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><RotateCcw className="h-5 w-5" /> Restore Backup</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-500">Restore from a previous backup point</p>
            <Button variant="outline">Restore</Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
      <DataTable
        columns={[
          { key: "id", label: "Log ID" },
          { key: "user", label: "User" },
          { key: "action", label: "Action" },
          { key: "module", label: "Module" },
          { key: "timestamp", label: "Timestamp" },
          { key: "ip", label: "IP Address" },
        ]}
        data={tableData}
        onRowClick={() => router.push("/audit/activity")}
      />
    </div>
  );
}
