export interface User {
  name: string;
  role: string;
  avatar: string;
  branch: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export interface StatCard {
  value: string | number;
  delta: string | number;
  deltaType: 'increase' | 'decrease' | 'neutral';
}

export interface Alert {
  id: string;
  account: string;
  pattern: string;
  risk: 'critical' | 'high' | 'medium' | 'low';
  amount: string;
  time: string;
  channel: string;
}

export interface Activity {
  id: number;
  event: string;
  time: string;
  type: string;
}

export interface FundNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    risk: string;
    name: string;
    type: string;
  };
}

export interface FundEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type: string;
  amount: number;
  style?: Record<string, string>;
}

export interface NodeDetail {
  holderName: string;
  accountType: string;
  kycStatus: string;
  lastActive: string;
  riskScore: number;
  declaredIncome: string;
  actualFlow: string;
  branch: string;
  opened: string;
  status: string;
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  channel: string;
  time: string;
  riskFlag: string;
}

export interface CaseTimelineItem {
  step: number;
  account: string;
  amount: string;
  channel: string;
  time: string;
  signal: string;
  highlight?: boolean;
}

export interface EvidenceItem {
  id: number;
  label: string;
  checked: boolean;
}

export interface Officer {
  id: number;
  name: string;
  role: string;
}

export interface AlertManagementItem {
  id: string;
  account: string;
  pattern: string;
  risk: 'critical' | 'high' | 'medium' | 'low';
  amount: string;
  branch: string;
  channel: string;
  timeSince: string;
  sla: string;
  assigned: string;
}

export interface ChartDataPoint {
  date: string;
  highRisk: number;
  mediumRisk: number;
}

export interface FraudPattern {
  name: string;
  value: number;
  color: string;
}

export interface ChannelRisk {
  channel: string;
  risk: number;
  volume: number;
}

export interface TopRiskBranch {
  rank: number;
  name: string;
  city: string;
  alerts: number;
  funds: string;
  score: number;
}

export interface TransactionHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: string;
  balance: string;
  riskFlag: string;
}

export interface TransactionDNA {
  frequency: { expected: number; actual: number };
  ticketSize: { expected: number; actual: number };
  counterpartyCount: { expected: number; actual: number };
  digitalCashRatio: { expected: number; actual: number };
  nightTimePct: { expected: number; actual: number };
}

export interface Rule {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  threshold?: number;
  thresholdMin?: number;
  thresholdMax?: number;
}

export interface UserManagement {
  id: number;
  name: string;
  role: string;
  branch: string;
  status: string;
  lastLogin: string;
}

export interface AuditEntry {
  id: number;
  timestamp: string;
  officer: string;
  action: string;
  entity: string;
  description: string;
  ip: string;
}
