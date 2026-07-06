"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { emiSchedulesByLoan, loans } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function EMISchedulePage() {
  const loanIds = Object.keys(emiSchedulesByLoan);

  return (
    <div>
      <PageHeader title="EMI Schedule" description="Auto-generated installment schedule with principal, interest, and outstanding balance" icon={CalendarDays} />

      {loanIds.map((loanId) => {
        const schedule = emiSchedulesByLoan[loanId];
        const loan = loans.find((l) => l.id === loanId);
        const totalPrincipal = schedule.reduce((s, e) => s + e.principal, 0);
        const totalInterest = schedule.reduce((s, e) => s + e.interest, 0);

        const tableData = schedule.map((e) => ({
          no: <span className="font-semibold">#{e.installmentNo}</span>,
          dueDate: formatDate(e.dueDate),
          principal: formatCurrency(e.principal),
          interest: formatCurrency(e.interest),
          total: <span className="font-semibold">{formatCurrency(e.totalEmi)}</span>,
          balance: formatCurrency(e.outstandingBalance),
          status: <Badge variant={e.status === "paid" ? "success" : e.status === "overdue" ? "danger" : "warning"}>{e.status}</Badge>,
        }));

        return (
          <Card key={loanId} className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <Link href={`/loans/${loanId}`} className="hover:underline">
                  <CardTitle>{loanId} — {loan?.customerName}</CardTitle>
                </Link>
                <p className="mt-1 text-sm text-slate-500">{schedule.length} installments · Principal {formatCurrency(totalPrincipal)} · Interest {formatCurrency(totalInterest)}</p>
              </div>
              <Button variant="outline" size="sm">Export PDF</Button>
            </CardHeader>
            <CardContent className="p-0">
              <DataTable
                columns={[
                  { key: "no", label: "Installment #" },
                  { key: "dueDate", label: "Due Date" },
                  { key: "principal", label: "Principal" },
                  { key: "interest", label: "Interest" },
                  { key: "total", label: "Total EMI" },
                  { key: "balance", label: "Outstanding" },
                  { key: "status", label: "Status" },
                ]}
                data={tableData}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
