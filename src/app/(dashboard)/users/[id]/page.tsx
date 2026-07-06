import { DetailHeader } from "@/components/shared/detail-header";
import { InfoGrid } from "@/components/shared/info-grid";
import { NotFoundCard } from "@/components/shared/not-found-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserById } from "@/lib/data-helpers";
import { permissions, userRoles } from "@/lib/mock-data";

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  md: "Managing Director (MD)",
  accountant: "Accountant",
  loan_officer: "Loan Officer",
  collection_executive: "Collection Executive",
  auditor: "Auditor",
  mediator: "Mediator",
  customer: "Customer",
};

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = getUserById(id);

  if (!user) {
    return <NotFoundCard title="User Not Found" message={`No user found with ID ${id}.`} backHref="/users" />;
  }

  return (
    <div>
      <DetailHeader
        backHref="/users"
        backLabel="Back to Users"
        title={user.name}
        subtitle={user.email}
        badge={<Badge variant={user.status === "active" ? "success" : "secondary"}>{user.status}</Badge>}
        actions={<Button variant="outline">Edit User</Button>}
      />

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">User Profile</CardTitle></CardHeader>
        <CardContent>
          <InfoGrid
            items={[
              { label: "User ID", value: <span className="font-mono">{user.id}</span> },
              { label: "Name", value: user.name },
              { label: "Email", value: user.email },
              { label: "Role", value: <Badge>{roleLabels[user.role] || user.role}</Badge> },
              { label: "Last Login", value: user.lastLogin || "—" },
            ]}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Assigned Role</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userRoles.map((role) => (
                <Badge key={role} variant={roleLabels[user.role] === role ? "default" : "secondary"}>{role}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Permissions</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {permissions.map((perm) => (
                <Badge key={perm} variant="outline">{perm}</Badge>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">Permissions are enforced based on assigned role via RBAC.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
