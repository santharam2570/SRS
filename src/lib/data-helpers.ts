import {
  customers,
  kycDocuments,
  loanProducts,
  loanApplications,
  loans,
  disbursements,
  emiSchedulesByLoan,
  collections,
  mediators,
  commissions,
  users,
  loanCharges,
  documentRecords,
  loginHistory,
  documentVersions,
  auditLogs,
} from "./mock-data";

export function getCustomerById(id: string) {
  return customers.find((c) => c.id === id);
}

export function getApplicationById(id: string) {
  return loanApplications.find((a) => a.id === id);
}

export function getLoanById(id: string) {
  return loans.find((l) => l.id === id);
}

export function getLoanByApplicationId(applicationId: string) {
  return loans.find((l) => l.applicationId === applicationId);
}

export function getApplicationByLoanId(loanId: string) {
  return loanApplications.find((a) => a.loanId === loanId || a.id === loanId);
}

export function getProductById(id: string) {
  return loanProducts.find((p) => p.id === id);
}

export function getMediatorById(id: string) {
  return mediators.find((m) => m.id === id);
}

export function getCommissionById(id: string) {
  return commissions.find((c) => c.id === id);
}

export function getUserById(id: string) {
  return users.find((u) => u.id === id);
}

export function getCollectionById(id: string) {
  return collections.find((c) => c.id === id);
}

export function getChargeById(id: string) {
  return loanCharges.find((c) => c.id === id);
}

export function getKycDocumentById(id: string) {
  return kycDocuments.find((d) => d.id === id);
}

export function getDocumentById(id: string) {
  return documentRecords.find((d) => d.id === id);
}

export function getKycByCustomerId(customerId: string) {
  return kycDocuments.filter((d) => d.customerId === customerId);
}

export function getLoansByCustomerId(customerId: string) {
  return loans.filter((l) => l.customerId === customerId);
}

export function getApplicationsByCustomerId(customerId: string) {
  return loanApplications.filter((a) => a.customerId === customerId);
}

export function getCollectionsByLoanId(loanId: string) {
  return collections.filter((c) => c.loanId === loanId);
}

export function getDisbursementsByLoanId(loanId: string) {
  return disbursements.filter((d) => d.loanId === loanId);
}

export function getCommissionsByMediatorId(mediatorId: string) {
  return commissions.filter((c) => c.mediatorId === mediatorId);
}

export function getDocumentsByLoanId(loanId: string) {
  return documentRecords.filter((d) => d.loanId === loanId);
}

export function getDocumentsByCustomerId(customerId: string) {
  return documentRecords.filter((d) => d.customerId === customerId);
}

export function getEmiScheduleByLoanId(loanId: string) {
  return emiSchedulesByLoan[loanId] ?? [];
}

export function getDocumentVersionsByDocumentId(documentId: string) {
  return documentVersions.filter((v) => v.documentId === documentId);
}

export const verificationLabels: Record<string, string> = {
  kyc: "KYC Verification",
  income: "Income Verification",
  property: "Property Verification",
  gold: "Gold Verification",
  legal: "Legal Verification",
  valuation: "Valuation Verification",
  field: "Field Verification",
  credit: "Credit Verification",
};

export const operationLabels: Record<string, string> = {
  renewal: "Loan Renewal",
  "top-up": "Top-up Loan",
  "part-payment": "Part Payment",
  foreclosure: "Foreclosure",
  closure: "Loan Closure",
  reopening: "Loan Reopening",
};

export { loginHistory, auditLogs, documentVersions };
