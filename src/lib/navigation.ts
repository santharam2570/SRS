import {
  LayoutDashboard,
  Users,
  FileCheck,
  Package,
  FileText,
  ClipboardCheck,
  CheckCircle,
  Banknote,
  Receipt,
  Percent,
  Calendar,
  CalendarDays,
  Wallet,
  Settings2,
  Handshake,
  Coins,
  TrendingUp,
  Bell,
  BarChart3,
  UserCog,
  Shield,
  Plug,
  FolderOpen,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", href: "/", icon: LayoutDashboard }],
  },
  {
    label: "Customer & KYC",
    items: [
      { title: "Customers", href: "/customers", icon: Users },
      { title: "KYC Management", href: "/kyc", icon: FileCheck },
    ],
  },
  {
    label: "Loan Lifecycle",
    items: [
      { title: "Loan Products", href: "/loan-products", icon: Package },
      { title: "Applications", href: "/applications", icon: FileText, badge: "3" },
      { title: "Verification", href: "/verification", icon: ClipboardCheck },
      { title: "Approval", href: "/approval", icon: CheckCircle },
      { title: "Disbursement", href: "/disbursement", icon: Banknote },
    ],
  },
  {
    label: "Finance",
    items: [
      { title: "Loan Charges", href: "/charges", icon: Receipt },
      { title: "Interest Config", href: "/interest", icon: Percent },
      { title: "EMI Config", href: "/emi", icon: Calendar },
      { title: "EMI Schedule", href: "/emi-schedule", icon: CalendarDays },
      { title: "Collections", href: "/collections", icon: Wallet },
      { title: "Loan Operations", href: "/operations", icon: Settings2 },
    ],
  },
  {
    label: "Partners",
    items: [
      { title: "Mediators", href: "/mediators", icon: Handshake },
      { title: "Commissions", href: "/commissions", icon: Coins },
    ],
  },
  {
    label: "Analytics",
    items: [
      { title: "Interest Reports", href: "/interest-reports", icon: TrendingUp },
      { title: "Reports", href: "/reports", icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Notifications", href: "/notifications", icon: Bell },
      { title: "Users", href: "/users", icon: UserCog },
      { title: "Audit & Security", href: "/audit", icon: Shield },
      { title: "Integrations", href: "/integrations", icon: Plug },
      { title: "Documents", href: "/documents", icon: FolderOpen },
    ],
  },
];
