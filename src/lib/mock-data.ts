import type {
  Customer,
  KYCDocument,
  LoanProduct,
  LoanApplication,
  LoanCharge,
  Collection,
  Mediator,
  Commission,
  User,
  AuditLog,
  Notification,
  DashboardStats,
  EMIScheduleItem,
  Disbursement,
  Loan,
  DocumentRecord,
  LoginHistory,
  DocumentVersion,
} from "./types";

export const dashboardStats: DashboardStats = {
  totalCustomers: 1248,
  totalLoans: 856,
  activeLoans: 623,
  closedLoans: 233,
  todayCollections: 2450000,
  outstandingAmount: 45800000,
  npaLoans: 18,
  interestCollected: 8920000,
  upcomingEmi: 42,
  dueToday: 15,
  overdueLoans: 23,
  mediatorCommission: 345000,
};

export const monthlyCollections = [
  { month: "Jan", amount: 3200000 },
  { month: "Feb", amount: 2800000 },
  { month: "Mar", amount: 4100000 },
  { month: "Apr", amount: 3600000 },
  { month: "May", amount: 3900000 },
  { month: "Jun", amount: 4200000 },
];

export const loanProductDistribution = [
  { name: "Business Loan", value: 28, color: "#1e40af" },
  { name: "Personal Loan", value: 22, color: "#059669" },
  { name: "Gold Loan", value: 18, color: "#d97706" },
  { name: "LAP", value: 15, color: "#7c3aed" },
  { name: "Trust-Based", value: 10, color: "#dc2626" },
  { name: "PDC Loan", value: 7, color: "#0891b2" },
];

export const collectionTrend = [
  { week: "W1", collections: 850000, target: 900000 },
  { week: "W2", collections: 920000, target: 900000 },
  { week: "W3", collections: 780000, target: 900000 },
  { week: "W4", collections: 1100000, target: 900000 },
];

export const customers: Customer[] = [
  {
    id: "CUST-001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    address: "42 MG Road, Bangalore, Karnataka",
    status: "active",
    borrowerType: "individual",
    coApplicant: { name: "Priya Kumar", relation: "Spouse", phone: "+91 98765 43211" },
    guarantor: { name: "Suresh Patel", relation: "Brother", phone: "+91 98765 43212" },
    loanCount: 2,
    createdAt: "2024-03-15",
  },
  {
    id: "CUST-002",
    name: "Sharma Enterprises Pvt Ltd",
    email: "accounts@sharmaent.com",
    phone: "+91 91234 56789",
    address: "15 Industrial Area, Pune, Maharashtra",
    status: "active",
    borrowerType: "business",
    loanCount: 3,
    createdAt: "2023-11-20",
  },
  {
    id: "CUST-003",
    name: "Anita Desai",
    email: "anita.desai@email.com",
    phone: "+91 99887 76655",
    address: "8 Lake View Apartments, Mumbai, Maharashtra",
    status: "active",
    borrowerType: "individual",
    loanCount: 1,
    createdAt: "2025-01-08",
  },
  {
    id: "CUST-004",
    name: "Vikram Singh",
    email: "vikram.s@email.com",
    phone: "+91 87654 32109",
    address: "23 Civil Lines, Jaipur, Rajasthan",
    status: "inactive",
    borrowerType: "individual",
    loanCount: 0,
    createdAt: "2024-08-22",
  },
  {
    id: "CUST-005",
    name: "GreenTech Solutions",
    email: "finance@greentech.in",
    phone: "+91 93456 78901",
    address: "Tech Park, Hyderabad, Telangana",
    status: "active",
    borrowerType: "business",
    loanCount: 1,
    createdAt: "2025-02-14",
  },
];

export const kycDocuments: KYCDocument[] = [
  { id: "KYC-001", customerId: "CUST-001", category: "identity", documentType: "PAN Card", fileName: "rajesh_pan.pdf", status: "verified", uploadedAt: "2024-03-15" },
  { id: "KYC-002", customerId: "CUST-001", category: "identity", documentType: "Aadhaar Card", fileName: "rajesh_aadhaar.pdf", status: "verified", uploadedAt: "2024-03-15" },
  { id: "KYC-003", customerId: "CUST-001", category: "income", documentType: "Salary Slip", fileName: "salary_mar2024.pdf", status: "verified", uploadedAt: "2024-03-16" },
  { id: "KYC-004", customerId: "CUST-002", category: "business", documentType: "GST Certificate", fileName: "gst_cert.pdf", status: "verified", uploadedAt: "2023-11-20" },
  { id: "KYC-005", customerId: "CUST-002", category: "income", documentType: "ITR", fileName: "itr_fy2024.pdf", status: "pending", uploadedAt: "2025-01-10" },
  { id: "KYC-006", customerId: "CUST-003", category: "address", documentType: "Utility Bill", fileName: "electricity_bill.pdf", status: "verified", uploadedAt: "2025-01-08" },
];

export const loanProducts: LoanProduct[] = [
  { id: "PROD-001", name: "Business Loan", securityType: "Unsecured", interestRate: 14.5, processingFee: 2, documentationCharges: 5000, minAmount: 100000, maxAmount: 5000000, tenureMonths: 60, repaymentFrequency: "Monthly", status: "active" },
  { id: "PROD-002", name: "Personal Loan", securityType: "Unsecured", interestRate: 16, processingFee: 1.5, documentationCharges: 3000, minAmount: 50000, maxAmount: 2000000, tenureMonths: 48, repaymentFrequency: "Monthly", status: "active" },
  { id: "PROD-003", name: "Gold Loan", securityType: "Gold", interestRate: 12, processingFee: 0.5, documentationCharges: 500, minAmount: 25000, maxAmount: 1000000, tenureMonths: 12, repaymentFrequency: "Monthly", status: "active" },
  { id: "PROD-004", name: "Loan Against Property", securityType: "Property", interestRate: 11.5, processingFee: 1, documentationCharges: 10000, minAmount: 500000, maxAmount: 10000000, tenureMonths: 180, repaymentFrequency: "Monthly", status: "active" },
  { id: "PROD-005", name: "Trust-Based Loan", securityType: "Trust", interestRate: 18, processingFee: 2.5, documentationCharges: 2000, minAmount: 25000, maxAmount: 500000, tenureMonths: 24, repaymentFrequency: "Monthly", status: "active" },
  { id: "PROD-006", name: "Cheque-Based Loan (PDC)", securityType: "PDC", interestRate: 15, processingFee: 1.5, documentationCharges: 1500, minAmount: 50000, maxAmount: 1000000, tenureMonths: 36, repaymentFrequency: "Monthly", status: "active" },
  { id: "PROD-007", name: "Loan Against Sale Agreement", securityType: "Sale Agreement", interestRate: 13, processingFee: 1.5, documentationCharges: 8000, minAmount: 300000, maxAmount: 7500000, tenureMonths: 120, repaymentFrequency: "Monthly", status: "active" },
  { id: "PROD-008", name: "Loan Against Registered Sale Deed", securityType: "Registered Deed", interestRate: 11, processingFee: 1, documentationCharges: 12000, minAmount: 500000, maxAmount: 15000000, tenureMonths: 240, repaymentFrequency: "Monthly", status: "active" },
];

export const loans: Loan[] = [
  { id: "LN-2025-0042", applicationId: "APP-001", customerId: "CUST-001", customerName: "Rajesh Kumar", productId: "PROD-002", productName: "Personal Loan", amount: 500000, interestRate: 16, tenureMonths: 12, emiAmount: 45167, disbursedAmount: 500000, outstandingBalance: 342915, status: "active", purpose: "Home renovation", mediatorId: "MED-001", mediatorName: "Amit Broker Services", disbursedAt: "2025-03-10", approvedAt: "2025-03-05" },
  { id: "LN-2025-0038", applicationId: "APP-002", customerId: "CUST-002", customerName: "Sharma Enterprises Pvt Ltd", productId: "PROD-001", productName: "Business Loan", amount: 2500000, interestRate: 14.5, tenureMonths: 36, emiAmount: 86250, disbursedAmount: 2500000, outstandingBalance: 2100000, status: "active", purpose: "Working capital", mediatorId: "MED-002", mediatorName: "Capital Connect", disbursedAt: "2025-04-01", approvedAt: "2025-03-28" },
  { id: "LN-2025-0035", applicationId: "APP-003", customerId: "CUST-003", customerName: "Anita Desai", productId: "PROD-003", productName: "Gold Loan", amount: 150000, interestRate: 12, tenureMonths: 12, emiAmount: 13333, disbursedAmount: 150000, outstandingBalance: 125000, status: "active", purpose: "Medical emergency", disbursedAt: "2025-06-05", approvedAt: "2025-06-02" },
  { id: "LN-2025-0040", applicationId: "APP-004", customerId: "CUST-005", customerName: "GreenTech Solutions", productId: "PROD-004", productName: "Loan Against Property", amount: 3500000, interestRate: 11.5, tenureMonths: 60, emiAmount: 76800, disbursedAmount: 0, outstandingBalance: 3500000, status: "approved", purpose: "Business expansion", mediatorId: "MED-001", mediatorName: "Amit Broker Services", approvedAt: "2025-06-02" },
];

export const disbursements: Disbursement[] = [
  { id: "DIS-001", loanId: "LN-2025-0042", type: "bank_transfer", amount: 500000, date: "2025-03-10", bankName: "HDFC Bank", transactionNumber: "TXN20250310001", remarks: "Full disbursement" },
  { id: "DIS-002", loanId: "LN-2025-0038", type: "bank_transfer", amount: 2500000, date: "2025-04-01", bankName: "ICICI Bank", transactionNumber: "TXN20250401002", remarks: "Working capital disbursement" },
  { id: "DIS-003", loanId: "LN-2025-0035", type: "cash", amount: 150000, date: "2025-06-05", remarks: "Cash disbursement at branch" },
];

export const emiSchedule: EMIScheduleItem[] = [
  { installmentNo: 1, dueDate: "2025-04-05", principal: 38500, interest: 6667, totalEmi: 45167, outstandingBalance: 461500, status: "paid" },
  { installmentNo: 2, dueDate: "2025-05-05", principal: 39010, interest: 6157, totalEmi: 45167, outstandingBalance: 422490, status: "paid" },
  { installmentNo: 3, dueDate: "2025-06-05", principal: 39526, interest: 5641, totalEmi: 45167, outstandingBalance: 382964, status: "paid" },
  { installmentNo: 4, dueDate: "2025-07-05", principal: 40049, interest: 5118, totalEmi: 45167, outstandingBalance: 342915, status: "pending" },
  { installmentNo: 5, dueDate: "2025-08-05", principal: 40579, interest: 4588, totalEmi: 45167, outstandingBalance: 302336, status: "pending" },
  { installmentNo: 6, dueDate: "2025-09-05", principal: 41116, interest: 4051, totalEmi: 45167, outstandingBalance: 261220, status: "pending" },
];

export const emiSchedulesByLoan: Record<string, EMIScheduleItem[]> = {
  "LN-2025-0042": emiSchedule,
  "LN-2025-0038": [
    { installmentNo: 1, dueDate: "2025-05-01", principal: 52000, interest: 34250, totalEmi: 86250, outstandingBalance: 2448000, status: "paid" },
    { installmentNo: 2, dueDate: "2025-06-01", principal: 52628, interest: 33622, totalEmi: 86250, outstandingBalance: 2395372, status: "paid" },
    { installmentNo: 3, dueDate: "2025-07-01", principal: 53264, interest: 32986, totalEmi: 86250, outstandingBalance: 2342108, status: "pending" },
  ],
  "LN-2025-0035": [
    { installmentNo: 1, dueDate: "2025-07-05", principal: 10000, interest: 3333, totalEmi: 13333, outstandingBalance: 140000, status: "paid" },
    { installmentNo: 2, dueDate: "2025-08-05", principal: 10100, interest: 3233, totalEmi: 13333, outstandingBalance: 129900, status: "pending" },
  ],
};

export const documentRecords: DocumentRecord[] = [
  { id: "DOC-001", name: "Loan Agreement", category: "agreement", customerId: "CUST-001", loanId: "LN-2025-0042", fileName: "loan_agreement_ln0042.pdf", fileSize: "2.4 MB", uploadedBy: "Priya Sharma", uploadedAt: "2025-03-10", version: 1 },
  { id: "DOC-002", name: "Sanction Letter", category: "sanction", customerId: "CUST-001", loanId: "LN-2025-0042", fileName: "sanction_letter_ln0042.pdf", fileSize: "856 KB", uploadedBy: "System", uploadedAt: "2025-03-05", version: 1 },
  { id: "DOC-003", name: "Property Valuation Report", category: "property", customerId: "CUST-005", loanId: "LN-2025-0040", fileName: "property_valuation.pdf", fileSize: "4.1 MB", uploadedBy: "Rahul Verma", uploadedAt: "2025-05-25", version: 2 },
  { id: "DOC-004", name: "Gold Valuation Certificate", category: "gold", customerId: "CUST-003", loanId: "LN-2025-0035", fileName: "gold_valuation.pdf", fileSize: "1.2 MB", uploadedBy: "Rahul Verma", uploadedAt: "2025-06-01", version: 1 },
  { id: "DOC-005", name: "EMI Schedule", category: "emi", customerId: "CUST-001", loanId: "LN-2025-0042", fileName: "emi_schedule_ln0042.pdf", fileSize: "320 KB", uploadedBy: "System", uploadedAt: "2025-03-10", version: 1 },
  { id: "DOC-006", name: "Collection Receipt", category: "receipt", customerId: "CUST-001", loanId: "LN-2025-0042", fileName: "receipt_rcp0892.pdf", fileSize: "180 KB", uploadedBy: "Sneha Reddy", uploadedAt: "2025-06-05", version: 1 },
];

export const loginHistory: LoginHistory[] = [
  { id: "LOG-001", userId: "USR-003", userName: "Priya Sharma", timestamp: "2025-07-06 08:45", ipAddress: "192.168.1.45", device: "Chrome / macOS", status: "success" },
  { id: "LOG-002", userId: "USR-002", userName: "Dr. Mehta", timestamp: "2025-07-06 10:30", ipAddress: "192.168.1.12", device: "Safari / iOS", status: "success" },
  { id: "LOG-003", userId: "USR-004", userName: "Rahul Verma", timestamp: "2025-07-05 17:20", ipAddress: "192.168.1.33", device: "Chrome / Windows", status: "success" },
  { id: "LOG-004", userId: "USR-999", userName: "unknown@email.com", timestamp: "2025-07-05 03:12", ipAddress: "203.0.113.42", device: "Firefox / Linux", status: "failed" },
];

export const documentVersions: DocumentVersion[] = [
  { id: "VER-001", documentId: "DOC-003", documentName: "Property Valuation Report", version: 1, fileName: "property_valuation_v1.pdf", uploadedBy: "Rahul Verma", uploadedAt: "2025-05-20", changes: "Initial upload" },
  { id: "VER-002", documentId: "DOC-003", documentName: "Property Valuation Report", version: 2, fileName: "property_valuation_v2.pdf", uploadedBy: "Rahul Verma", uploadedAt: "2025-05-25", changes: "Updated valuation after site visit" },
  { id: "VER-003", documentId: "DOC-001", documentName: "Loan Agreement", version: 1, fileName: "loan_agreement_ln0042.pdf", uploadedBy: "Priya Sharma", uploadedAt: "2025-03-10", changes: "Signed agreement uploaded" },
];

export const loanApplications: LoanApplication[] = [
  { id: "APP-001", loanId: "LN-2025-0042", customerId: "CUST-001", customerName: "Rajesh Kumar", productId: "PROD-002", productName: "Personal Loan", amount: 500000, purpose: "Home renovation", mediatorId: "MED-001", mediatorName: "Amit Broker Services", status: "active", verificationStatus: { kyc: true, income: true, property: false, gold: false, legal: false, valuation: false, field: true, credit: true }, createdAt: "2025-03-01", approvedAt: "2025-03-05" },
  { id: "APP-002", customerId: "CUST-002", customerName: "Sharma Enterprises Pvt Ltd", productId: "PROD-001", productName: "Business Loan", amount: 2500000, purpose: "Working capital", mediatorId: "MED-002", mediatorName: "Capital Connect", status: "pending_approval", verificationStatus: { kyc: true, income: true, property: false, gold: false, legal: true, valuation: false, field: true, credit: true }, createdAt: "2025-05-28" },
  { id: "APP-003", customerId: "CUST-003", customerName: "Anita Desai", productId: "PROD-003", productName: "Gold Loan", amount: 150000, purpose: "Medical emergency", status: "pending_verification", verificationStatus: { kyc: true, income: false, property: false, gold: true, legal: false, valuation: true, field: false, credit: false }, createdAt: "2025-06-01" },
  { id: "APP-004", customerId: "CUST-005", customerName: "GreenTech Solutions", productId: "PROD-004", productName: "Loan Against Property", amount: 3500000, purpose: "Business expansion", mediatorId: "MED-001", mediatorName: "Amit Broker Services", status: "approved", verificationStatus: { kyc: true, income: true, property: true, gold: false, legal: true, valuation: true, field: true, credit: true }, createdAt: "2025-05-20", approvedAt: "2025-06-02" },
];

export const loanCharges: LoanCharge[] = [
  { id: "CHG-001", name: "Processing Fee", type: "processing", amount: 2, isPercentage: true, status: "active" },
  { id: "CHG-002", name: "Documentation Charges", type: "documentation", amount: 5000, isPercentage: false, status: "active" },
  { id: "CHG-003", name: "Legal Charges", type: "legal", amount: 10000, isPercentage: false, status: "active" },
  { id: "CHG-004", name: "Valuation Charges", type: "valuation", amount: 3500, isPercentage: false, status: "active" },
  { id: "CHG-005", name: "Stamp Duty", type: "stamp_duty", amount: 0.5, isPercentage: true, status: "active" },
  { id: "CHG-006", name: "GST", type: "gst", amount: 18, isPercentage: true, status: "active" },
  { id: "CHG-007", name: "Penal Interest", type: "penal", amount: 2, isPercentage: true, status: "active" },
  { id: "CHG-008", name: "Foreclosure Charges", type: "foreclosure", amount: 4, isPercentage: true, status: "active" },
];

export const collections: Collection[] = [
  { id: "COL-001", loanId: "LN-2025-0042", customerName: "Rajesh Kumar", amount: 45167, type: "bank", date: "2025-06-05", receiptNo: "RCP-2025-0892", isPartial: false },
  { id: "COL-002", loanId: "LN-2025-0038", customerName: "Sharma Enterprises", amount: 125000, type: "online", date: "2025-07-06", receiptNo: "RCP-2025-0893", isPartial: false },
  { id: "COL-003", loanId: "LN-2025-0035", customerName: "Anita Desai", amount: 25000, type: "cash", date: "2025-07-06", receiptNo: "RCP-2025-0894", isPartial: true },
  { id: "COL-004", loanId: "LN-2025-0040", customerName: "Vikram Singh", amount: 78500, type: "bank", date: "2025-07-05", receiptNo: "RCP-2025-0891", isPartial: false },
];

export const mediators: Mediator[] = [
  { id: "MED-001", name: "Amit Broker Services", phone: "+91 98123 45678", email: "amit@brokerservices.com", pan: "ABCDE1234F", aadhaar: "XXXX-XXXX-5678", bankName: "HDFC Bank", accountNumber: "XXXX5678", commissionType: "Hybrid", status: "active", totalCommission: 185000 },
  { id: "MED-002", name: "Capital Connect", phone: "+91 97234 56789", email: "info@capitalconnect.in", pan: "FGHIJ5678K", aadhaar: "XXXX-XXXX-9012", bankName: "ICICI Bank", accountNumber: "XXXX9012", commissionType: "Trail Commission", status: "active", totalCommission: 120000 },
  { id: "MED-003", name: "Loan Junction", phone: "+91 96345 67890", email: "contact@loanjunction.com", pan: "KLMNO9012P", aadhaar: "XXXX-XXXX-3456", bankName: "SBI", accountNumber: "XXXX3456", commissionType: "One-Time", status: "active", totalCommission: 40000 },
];

export const commissions: Commission[] = [
  { id: "COM-001", mediatorId: "MED-001", mediatorName: "Amit Broker Services", loanId: "LN-2025-0042", type: "One-Time", basis: "Loan Amount", amount: 15000, status: "settled", date: "2025-03-10" },
  { id: "COM-002", mediatorId: "MED-002", mediatorName: "Capital Connect", loanId: "LN-2025-0038", type: "Trail Commission", basis: "Interest Earned", amount: 8500, status: "pending", date: "2025-06-01" },
  { id: "COM-003", mediatorId: "MED-001", mediatorName: "Amit Broker Services", loanId: "LN-2025-0040", type: "Hybrid", basis: "Loan Amount", amount: 22000, status: "settled", date: "2025-04-15" },
];

export const users: User[] = [
  { id: "USR-001", name: "Admin User", email: "admin@financeerp.com", role: "super_admin", status: "active", lastLogin: "2025-07-06 09:15" },
  { id: "USR-002", name: "Dr. Mehta", email: "md@financeerp.com", role: "md", status: "active", lastLogin: "2025-07-06 10:30" },
  { id: "USR-003", name: "Priya Sharma", email: "accountant@financeerp.com", role: "accountant", status: "active", lastLogin: "2025-07-06 08:45" },
  { id: "USR-004", name: "Rahul Verma", email: "loanofficer@financeerp.com", role: "loan_officer", status: "active", lastLogin: "2025-07-05 17:20" },
  { id: "USR-005", name: "Sneha Reddy", email: "collections@financeerp.com", role: "collection_executive", status: "active", lastLogin: "2025-07-06 09:00" },
];

export const auditLogs: AuditLog[] = [
  { id: "AUD-001", userId: "USR-003", userName: "Priya Sharma", action: "Created loan application APP-003", module: "Applications", timestamp: "2025-07-06 11:30", ipAddress: "192.168.1.45" },
  { id: "AUD-002", userId: "USR-002", userName: "Dr. Mehta", action: "Approved loan APP-004", module: "Approval", timestamp: "2025-07-06 10:15", ipAddress: "192.168.1.12" },
  { id: "AUD-003", userId: "USR-005", userName: "Sneha Reddy", action: "Recorded collection COL-003", module: "Collections", timestamp: "2025-07-06 09:45", ipAddress: "192.168.1.78" },
];

export const notifications: Notification[] = [
  { id: "NOT-001", type: "email", event: "Loan Approved", recipient: "rajesh.kumar@email.com", status: "sent", sentAt: "2025-03-05 14:30" },
  { id: "NOT-002", type: "whatsapp", event: "EMI Due Reminder", recipient: "+91 98765 43210", status: "sent", sentAt: "2025-07-04 09:00" },
  { id: "NOT-003", type: "sms", event: "Loan Disbursed", recipient: "+91 91234 56789", status: "sent", sentAt: "2025-05-28 16:45" },
  { id: "NOT-004", type: "email", event: "Overdue Reminder", recipient: "vikram.s@email.com", status: "pending", sentAt: "2025-07-06 08:00" },
];

export const kycCategories = {
  identity: ["PAN Card", "Aadhaar Card", "Passport", "Voter ID", "Driving License"],
  address: ["Aadhaar", "Passport", "Utility Bills", "Rent Agreement", "Bank Statement", "Voter ID"],
  income: {
    salaried: ["Salary Slip", "Form 16", "Bank Statement"],
    business: ["Income Tax Return (ITR)", "Profit & Loss Statement", "Balance Sheet", "Business Bank Statement"],
  },
  business: ["GST Certificate", "MSME Certificate", "Partnership Deed", "MOA/AOA", "Shop Act License"],
  other: ["Passport-size Photograph", "Signature Proof", "Bank Statement", "Agreement Copy"],
  property: ["Property Documents", "Gold Valuation Report"],
};

export const reportCategories = {
  daily: ["Collection Report", "Cash Book", "Bank Book", "Receipt Register", "Payment Register"],
  loan: ["Loan Register", "Loan Outstanding", "Closed Loans", "Loan Aging", "NPA Report", "Overdue Report", "Penal Interest Report", "Interest Receivable", "Interest Collected"],
  customer: ["Customer Ledger", "Statement of Account", "Loan History", "Due List"],
  mediator: ["Commission Report", "Collection Report", "Performance Report"],
  finance: ["Profit & Loss", "Cash Flow", "GST Report", "Income Report", "Expense Report"],
};

export const interestSchemes = ["Interest Bearing", "Principal Only"];
export const interestCollection = ["Upfront Interest", "EMI Interest", "Hybrid"];
export const interestCalculation = ["Flat Rate", "Monthly Reducing", "Daily Reducing", "Weekly", "Monthly", "Quarterly", "Annual"];
export const repaymentMethods = ["EMI", "Interest Only", "Bullet Payment"];
export const repaymentFrequencies = ["Weekly", "Fortnightly", "Tri-Weekly", "Four Weekly", "Monthly"];
export const verificationTypes = ["KYC Verification", "Income Verification", "Property Verification", "Gold Verification", "Legal Verification", "Valuation Verification", "Field Verification", "Credit Verification"];
export const loanOperations = ["Renewal", "Top-up Loan", "Part Payment", "Foreclosure", "Loan Closure", "Loan Reopening"];
export const integrationServices = ["Email Service", "SMS Gateway", "WhatsApp API", "Payment Gateway", "Bank API", "Aadhaar/PAN Verification", "GST Verification"];
export const notificationEvents = ["Loan Approved", "Loan Rejected", "Loan Disbursed", "EMI Due Reminder", "EMI Received", "Overdue Reminder", "Loan Closed"];
export const userRoles = ["Super Admin", "Managing Director (MD)", "Accountant", "Loan Officer", "Collection Executive", "Auditor", "Mediator", "Customer"];
export const permissions = ["Create", "Edit", "Delete", "View", "Approve", "Export", "Print"];
