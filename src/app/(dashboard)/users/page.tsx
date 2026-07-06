"use client";

import { useRouter } from "next/navigation";
import { UserCog } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { users, userRoles, permissions } from "@/lib/mock-data";

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  md: "Managing Director",
  accountant: "Accountant",
  loan_officer: "Loan Officer",
  collection_executive: "Collection Executive",
  auditor: "Auditor",
  mediator: "Mediator",
  customer: "Customer",
};

export default function UsersPage() {
  const router = useRouter();

  const tableData = users.map((u) => ({
    _id: u.id,
    id: <span className="font-mono text-xs">{u.id}</span>,
    name: (
      <div>
        <p className="font-medium">{u.name}</p>
        <p className="text-xs text-slate-500">{u.email}</p>
      </div>
    ),
    role: <Badge variant="default">{roleLabels[u.role]}</Badge>,
    status: <Badge variant={u.status === "active" ? "success" : "secondary"}>{u.status}</Badge>,
    lastLogin: u.lastLogin || "—",
  }));

  return (
    <div>
      <PageHeader title="User Management" description="Role-based access control with granular permissions" icon={UserCog} action={{ label: "Add User", href: "/users/new" }} />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Roles</CardTitle></CardHeader>
        <CardContent><div className="flex flex-wrap gap-2">{userRoles.map((r) => <Badge key={r} variant="outline">{r}</Badge>)}</div></CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Permissions</CardTitle></CardHeader>
        <CardContent><div className="flex flex-wrap gap-2">{permissions.map((p) => <Badge key={p} variant="secondary">{p}</Badge>)}</div></CardContent>
      </Card>

      <DataTable
        columns={[
          { key: "id", label: "User ID" },
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "status", label: "Status" },
          { key: "lastLogin", label: "Last Login" },
        ]}
        data={tableData}
        onRowClick={(row) => router.push(`/users/${row._id}`)}
      />
    </div>
  );
}
