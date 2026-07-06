"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users, FileText, TrendingUp, Wallet, AlertTriangle, IndianRupee,
  Calendar, Clock, Handshake, CheckCircle,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { StatsCard } from "@/components/shared/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  dashboardStats, monthlyCollections, loanProductDistribution, collectionTrend, loanApplications,
} from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const workflowSteps = [
  { step: 1, title: "Loan Application", role: "Accountant", status: "completed" },
  { step: 2, title: "Sanction Approval", role: "MD", status: "completed" },
  { step: 3, title: "Loan ID Generation", role: "System", status: "completed" },
  { step: 4, title: "Internal Confirmation", role: "Accountant & MD", status: "active" },
  { step: 5, title: "Client Notification", role: "Email / WhatsApp / SMS", status: "pending" },
];

export default function DashboardPage() {
  const pendingApps = loanApplications.filter((a) => a.status === "pending_approval");

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Welcome back! Here&apos;s your loan portfolio overview.</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatsCard title="Total Customers" value={dashboardStats.totalCustomers} icon={Users} color="blue" delay={0} trend={{ value: "12% vs last month", positive: true }} />
        <StatsCard title="Active Loans" value={dashboardStats.activeLoans} icon={FileText} color="emerald" delay={0.05} trend={{ value: "8 new this week", positive: true }} />
        <StatsCard title="Today's Collections" value={dashboardStats.todayCollections} icon={Wallet} format="currency" color="cyan" delay={0.1} />
        <StatsCard title="Outstanding Amount" value={dashboardStats.outstandingAmount} icon={IndianRupee} format="currency" color="purple" delay={0.15} />
        <StatsCard title="NPA Loans" value={dashboardStats.npaLoans} icon={AlertTriangle} color="red" delay={0.2} trend={{ value: "3 new", positive: false }} />
        <StatsCard title="Interest Collected" value={dashboardStats.interestCollected} icon={TrendingUp} format="currency" color="emerald" delay={0.25} />
        <StatsCard title="Due Today" value={dashboardStats.dueToday} icon={Calendar} color="amber" delay={0.3} />
        <StatsCard title="Overdue Loans" value={dashboardStats.overdueLoans} icon={Clock} color="red" delay={0.35} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyCollections}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `₹${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="amount" fill="#1d4ed8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Product Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={loanProductDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {loanProductDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Collection Trend (Weekly)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={collectionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line type="monotone" dataKey="collections" stroke="#059669" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sanction & Disbursement Workflow</CardTitle>
            <Badge variant="warning">{pendingApps.length} Pending</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workflowSteps.map((step) => (
                <div key={step.step} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    step.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                    step.status === "active" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {step.status === "completed" ? <CheckCircle className="h-4 w-4" /> : step.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{step.title}</p>
                    <p className="text-xs text-slate-500">{step.role}</p>
                  </div>
                  {step.status === "active" && <Badge variant="default">In Progress</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingApps.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-3 rounded-lg border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <Link href={`/applications/${app.id}`} className="flex-1">
                  <p className="font-medium text-slate-900 hover:text-blue-700">{app.customerName}</p>
                  <p className="text-sm text-slate-500">{app.productName} · {formatCurrency(app.amount)}</p>
                </Link>
                <div className="flex items-center gap-2">
                  <Badge variant="warning">Pending MD Review</Badge>
                  <Link href={`/approval/${app.id}`}>
                    <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700">
                      <CheckCircle className="mr-1 inline h-3 w-3" /> Approve
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
