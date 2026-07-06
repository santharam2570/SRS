"use client";

import { Bell, Mail, MessageCircle, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notifications, notificationEvents } from "@/lib/mock-data";

const typeIcons = {
  email: Mail,
  whatsapp: MessageCircle,
  sms: Smartphone,
};

export default function NotificationsPage() {
  const tableData = notifications.map((n) => {
    const Icon = typeIcons[n.type];
    return {
      type: (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-slate-500" />
          <span className="capitalize">{n.type}</span>
        </div>
      ),
      event: n.event,
      recipient: n.recipient,
      status: <Badge variant={n.status === "sent" ? "success" : n.status === "pending" ? "warning" : "danger"}>{n.status}</Badge>,
      sentAt: n.sentAt,
    };
  });

  return (
    <div>
      <PageHeader
        title="Notification Module"
        description="Email, WhatsApp, and SMS notifications for loan lifecycle events"
        icon={Bell}
        action={{ label: "Send Notification" }}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {(["email", "whatsapp", "sms"] as const).map((type) => {
          const Icon = typeIcons[type];
          const count = notifications.filter((n) => n.type === type).length;
          return (
            <Card key={type}>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="rounded-xl bg-blue-50 p-3"><Icon className="h-6 w-6 text-blue-600" /></div>
                <div>
                  <p className="text-sm text-slate-500 capitalize">{type}</p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Notification Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {notificationEvents.map((e) => (
              <Badge key={e} variant="outline">{e}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <DataTable
        columns={[
          { key: "type", label: "Channel" },
          { key: "event", label: "Event" },
          { key: "recipient", label: "Recipient" },
          { key: "status", label: "Status" },
          { key: "sentAt", label: "Sent At" },
        ]}
        data={tableData}
      />
    </div>
  );
}
