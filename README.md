# FinanceERP — Loan Management System

A modern, full-featured **Finance Company Loan Management ERP** built with Next.js, covering the complete loan lifecycle from application to closure.

## Features (23 Modules)

| Module | Description |
|--------|-------------|
| **Dashboard** | KPI widgets, collection charts, workflow status, pending approvals |
| **Customer Management** | Borrower profiles, co-applicants, guarantors, search & history |
| **KYC Management** | Identity, address, income, business & property documents |
| **Loan Products** | Business, Personal, Gold, LAP, Trust-based, PDC loans |
| **Loan Applications** | Create applications with document upload & mediator assignment |
| **Verification** | 8-point verification checklist (KYC, income, property, etc.) |
| **Approval Workflow** | Maker-Checker with MD review & automated notifications |
| **Disbursement** | Bank transfer & cash disbursement tracking |
| **Loan Charges** | Configurable fees (processing, legal, GST, penal, etc.) |
| **Interest Config** | Schemes, collection methods, calculation types |
| **EMI Config** | Repayment methods & frequencies |
| **EMI Schedule** | Auto-generated installment tables |
| **Collections** | Cash, bank, online with receipt generation |
| **Loan Operations** | Renewal, top-up, foreclosure, closure |
| **Mediators** | Profile & commission management |
| **Commissions** | One-time, trail, hybrid, recovery-linked |
| **Interest Reports** | Weekly reports, projections, email automation |
| **Notifications** | Email, WhatsApp, SMS for lifecycle events |
| **Reports** | Daily, loan, customer, mediator, finance reports |
| **Users & RBAC** | 8 roles with granular permissions |
| **Audit & Security** | Activity logs, backup/restore |
| **Integrations** | Email, SMS, WhatsApp, payment gateway APIs |
| **Documents** | Centralized document repository |

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **UI Components:** Custom component library (shadcn-inspired)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/(dashboard)/     # All module pages with shared layout
├── components/
│   ├── ui/              # Base UI components
│   ├── layout/          # Sidebar, header, app layout
│   └── shared/          # Reusable page components
└── lib/
    ├── types.ts         # TypeScript interfaces
    ├── mock-data.ts     # Sample data
    ├── navigation.ts    # Sidebar navigation config
    └── utils.ts         # Utility functions
```

## Recommended Backend (Future)

Per SRS requirements:
- **Backend:** Python (FastAPI)
- **Database:** MongoDB
- **Auth:** JWT + RBAC
- **Storage:** AWS S3
- **Reports:** Excel, PDF, CSV export

## License

Private — Client project.
# SRS
