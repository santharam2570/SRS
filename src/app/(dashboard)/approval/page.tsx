"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Mail, MessageCircle, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loanApplications } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const workflowSteps = [
  { step: 1, title: "Accountant creates Loan Application", role: "Maker" },
  { step: 2, title: "MD reviews application", role: "Checker" },
  { step: 3, title: "Approve / Reject / Send Back", role: "MD Decision" },
  { step: 4, title: "Loan ID Generated Automatically", role: "System" },
  { step: 5, title: "Sanction Letter Generated", role: "System" },
  { step: 6, title: "Email Notification", role: "Notification" },
  { step: 7, title: "WhatsApp Notification", role: "Notification" },
  { step: 8, title: "SMS Notification", role: "Notification" },
];

export default function ApprovalPage() {
  const pending = loanApplications.filter((a) => a.status === "pending_approval");
  const approved = loanApplications.filter((a) => a.status === "approved" || a.status === "active");

  return (
    <div>
      <PageHeader
        title="Loan Approval Workflow"
        description="Maker-Checker workflow with MD review, sanction letter, and automated notifications"
        icon={CheckCircle}
      />

      <Card className="mb-6">
        <CardHeader><CardTitle>Approval Workflow</CardTitle></CardHeader>
        <CardContent>
          <div className="relative">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 pb-6 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                    i < 3 ? "bg-emerald-100 text-emerald-700" : i === 3 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                  }`}>{step.step}</div>
                  {i < workflowSteps.length - 1 && <div className="mt-1 h-full w-0.5 bg-slate-200" />}
                </div>
                <div className="flex-1 pb-2">
                  <p className="font-medium text-slate-900">{step.title}</p>
                  <p className="text-sm text-slate-500">{step.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <h2 className="mb-4 text-lg font-semibold">Pending MD Review ({pending.length})</h2>
      {pending.map((app) => (
        <Card key={app.id} className="mb-4">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{app.customerName}</p>
                <p className="text-sm text-slate-500">{app.productName} · {formatCurrency(app.amount)}</p>
                <p className="text-xs text-slate-400">Applied: {formatDate(app.createdAt)}</p>
              </div>
              <Link href={`/approval/${app.id}`}>
                <Button><CheckCircle className="h-4 w-4" /> Review & Approve</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}

      <h2 className="mb-4 mt-8 text-lg font-semibold">Recently Approved</h2>
      {approved.map((app) => (
        <Link key={app.id} href={app.loanId ? `/loans/${app.loanId}` : `/applications/${app.id}`}>
          <Card className="mb-3 cursor-pointer transition-all hover:shadow-md">
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="font-medium">{app.customerName}</p>
                <p className="text-sm text-slate-500">Loan ID: {app.loanId}</p>
              </div>
              <Badge variant="success">Approved</Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
