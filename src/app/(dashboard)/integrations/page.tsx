"use client";

import { Plug, CheckCircle, XCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { integrationServices } from "@/lib/mock-data";

const integrationStatus: Record<string, boolean> = {
  "Email Service": true,
  "SMS Gateway": true,
  "WhatsApp API": true,
  "Payment Gateway": false,
  "Bank API": false,
  "Aadhaar/PAN Verification": false,
  "GST Verification": false,
};

export default function IntegrationsPage() {
  return (
    <div>
      <PageHeader
        title="System Integrations"
        description="Email, SMS, WhatsApp, payment gateway, bank API, and verification services"
        icon={Plug}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrationServices.map((service) => {
          const connected = integrationStatus[service];
          return (
            <Card key={service} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{service}</CardTitle>
                  {connected ? (
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant={connected ? "success" : "secondary"}>
                  {connected ? "Connected" : "Not Configured"}
                </Badge>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  {connected ? "Configure" : "Setup"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
