export type UserRole =
  | "super_admin"
  | "md"
  | "accountant"
  | "loan_officer"
  | "collection_executive"
  | "auditor"
  | "mediator"
  | "customer";

export type CustomerStatus = "active" | "inactive";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: CustomerStatus;
  borrowerType: "individual" | "business";
  coApplicant?: { name: string; relation: string; phone: string };
  guarantor?: { name: string; relation: string; phone: string };
  loanCount: number;
  createdAt: string;
}

export interface KYCDocument {
  id: string;
  customerId: string;
  category: "identity" | "address" | "income" | "business" | "other" | "property";
  documentType: string;
  fileName: string;
  status: "pending" | "verified" | "rejected";
  uploadedAt: string;
}

export interface LoanProduct {
  id: string;
  name: string;
  securityType: string;
  interestRate: number;
  processingFee: number;
  documentationCharges: number;
  minAmount: number;
  maxAmount: number;
  tenureMonths: number;
  repaymentFrequency: string;
  status: "active" | "inactive";
}

export type LoanStatus =
  | "draft"
  | "pending_verification"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "disbursed"
  | "active"
  | "closed"
  | "npa";

export interface LoanApplication {
  id: string;
  loanId?: string;
  customerId: string;
  customerName: string;
  productId: string;
  productName: string;
  amount: number;
  purpose: string;
  mediatorId?: string;
  mediatorName?: string;
  status: LoanStatus;
  verificationStatus: Record<string, boolean>;
  remarks?: string;
  createdAt: string;
  approvedAt?: string;
}

export interface Disbursement {
  id: string;
  loanId: string;
  type: "bank_transfer" | "cash";
  amount: number;
  date: string;
  bankName?: string;
  transactionNumber?: string;
  chequeNumber?: string;
  remarks?: string;
}

export interface LoanCharge {
  id: string;
  name: string;
  type: string;
  amount: number;
  isPercentage: boolean;
  status: "active" | "inactive";
}

export interface EMIScheduleItem {
  installmentNo: number;
  dueDate: string;
  principal: number;
  interest: number;
  totalEmi: number;
  outstandingBalance: number;
  status: "pending" | "paid" | "overdue";
}

export interface Collection {
  id: string;
  loanId: string;
  customerName: string;
  amount: number;
  type: "cash" | "bank" | "online";
  date: string;
  receiptNo: string;
  isPartial: boolean;
}

export interface Mediator {
  id: string;
  name: string;
  phone: string;
  email: string;
  pan: string;
  aadhaar: string;
  bankName: string;
  accountNumber: string;
  commissionType: string;
  status: "active" | "inactive";
  totalCommission: number;
}

export interface Commission {
  id: string;
  mediatorId: string;
  mediatorName: string;
  loanId: string;
  type: string;
  basis: string;
  amount: number;
  status: "pending" | "settled";
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  lastLogin?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  timestamp: string;
  ipAddress: string;
}

export interface Notification {
  id: string;
  type: "email" | "whatsapp" | "sms";
  event: string;
  recipient: string;
  status: "sent" | "pending" | "failed";
  sentAt: string;
}

export interface DashboardStats {
  totalCustomers: number;
  totalLoans: number;
  activeLoans: number;
  closedLoans: number;
  todayCollections: number;
  outstandingAmount: number;
  npaLoans: number;
  interestCollected: number;
  upcomingEmi: number;
  dueToday: number;
  overdueLoans: number;
  mediatorCommission: number;
}

export interface Loan {
  id: string;
  applicationId: string;
  customerId: string;
  customerName: string;
  productId: string;
  productName: string;
  amount: number;
  interestRate: number;
  tenureMonths: number;
  emiAmount: number;
  disbursedAmount: number;
  outstandingBalance: number;
  status: LoanStatus;
  purpose: string;
  mediatorId?: string;
  mediatorName?: string;
  disbursedAt?: string;
  approvedAt?: string;
  closedAt?: string;
}

export interface DocumentRecord {
  id: string;
  name: string;
  category: "kyc" | "property" | "gold" | "agreement" | "sanction" | "emi" | "receipt" | "other";
  customerId?: string;
  loanId?: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  uploadedAt: string;
  version: number;
}

export interface LoginHistory {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  status: "success" | "failed";
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  documentName: string;
  version: number;
  fileName: string;
  uploadedBy: string;
  uploadedAt: string;
  changes: string;
}

export type LoanOperationType = "renewal" | "top-up" | "part-payment" | "foreclosure" | "closure" | "reopening";
