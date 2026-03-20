// FundSight Mock Data - Bhopal Case Study

export const currentUser = {
  name: "Vikram Malhotra",
  role: "Senior AML Officer",
  avatar: "VM",
  branch: "Mumbai HQ",
};

// Navigation Items
export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "fund-flow", label: "Fund Flow Graph", icon: "GitBranch" },
  { id: "cases", label: "Cases", icon: "Briefcase" },
  { id: "str-generator", label: "STR Generator", icon: "FileText" },
  { id: "digital-twin", label: "Digital Twin", icon: "Copy" },
  { id: "alerts", label: "Alert Management", icon: "Bell" },
  { id: "analytics", label: "Analytics", icon: "BarChart3" },
  { id: "account-360", label: "Account 360", icon: "UserCircle" },
  { id: "admin", label: "Admin & Config", icon: "Settings" },
  { id: "audit", label: "Audit Trail", icon: "ClipboardList" },
];

// Dashboard Stats
export const dashboardStats = {
  totalAlerts: { value: 47, delta: 12, deltaType: "increase" as const },
  highRiskCases: { value: 9, delta: 3, deltaType: "decrease" as const },
  fundsUnderWatch: { value: "₹ 4.82 Cr", delta: "₹1.2Cr", deltaType: "increase" as const },
  strsFiled: { value: 6, delta: 0, deltaType: "neutral" as const },
};

// Alert Feed Data
export const alertFeed = [
  { id: "A-0047", account: "ACC-4821", pattern: "Circular Flow", risk: "critical" as const, amount: "₹48,20,000", time: "09:52 AM", channel: "NEFT" },
  { id: "A-0046", account: "ACC-7734", pattern: "Threshold Structuring", risk: "high" as const, amount: "₹9,90,000", time: "09:45 AM", channel: "Cash" },
  { id: "A-0045", account: "ACC-2291", pattern: "Dormant Activation", risk: "high" as const, amount: "₹35,00,000", time: "09:38 AM", channel: "IMPS" },
  { id: "A-0044", account: "ACC-9903", pattern: "Layering — 4 Hop", risk: "critical" as const, amount: "₹62,00,000", time: "09:22 AM", channel: "UPI" },
  { id: "A-0043", account: "ACC-1156", pattern: "KYC Mismatch", risk: "medium" as const, amount: "₹12,50,000", time: "09:15 AM", channel: "NEFT" },
  { id: "A-0042", account: "ACC-3342", pattern: "Circular Flow", risk: "high" as const, amount: "₹28,75,000", time: "08:58 AM", channel: "IMPS" },
  { id: "A-0041", account: "ACC-5567", pattern: "Velocity Spike", risk: "medium" as const, amount: "₹8,40,000", time: "08:42 AM", channel: "UPI" },
  { id: "A-0040", account: "ACC-8891", pattern: "Structuring", risk: "high" as const, amount: "₹9,75,000", time: "08:30 AM", channel: "Cash" },
];

// Recent Activity Log
export const recentActivity = [
  { id: 1, event: "Alert #A-0047 generated — Risk Score 91", time: "09:52 AM", type: "alert" },
  { id: 2, event: "STR #S-006 downloaded by Officer Meera Joshi", time: "09:48 AM", type: "download" },
  { id: 3, event: "Case #CASE-2024-0091 escalated to Level 2", time: "09:35 AM", type: "escalation" },
  { id: 4, event: "Account ACC-4821 flagged for investigation", time: "09:30 AM", type: "flag" },
  { id: 5, event: "Alert #A-0045 assigned to Officer Rahul Sharma", time: "09:25 AM", type: "assignment" },
  { id: 6, event: "Transaction TXN-0014 marked as suspicious", time: "09:18 AM", type: "alert" },
  { id: 7, event: "Daily batch report generated", time: "09:00 AM", type: "system" },
  { id: 8, event: "Alert #A-0042 cleared — False positive", time: "08:55 AM", type: "clear" },
  { id: 9, event: "New KYC document uploaded for ACC-1156", time: "08:42 AM", type: "document" },
  { id: 10, event: "System backup completed", time: "08:30 AM", type: "system" },
];

// Fund Flow Graph Nodes (Bhopal Case)
export const fundFlowNodes = [
  { id: "ACC-A001", type: "default", position: { x: 50, y: 200 }, data: { label: "ACC-A001", risk: "low", name: "Ramesh Enterprises", type: "Business" } },
  { id: "ACC-4821", type: "default", position: { x: 250, y: 200 }, data: { label: "ACC-4821", risk: "critical", name: "Ramesh Kumar Yadav", type: "Jan Dhan" } },
  { id: "ACC-7734", type: "default", position: { x: 450, y: 100 }, data: { label: "ACC-7734", risk: "high", name: "Sharma Traders", type: "Current" } },
  { id: "ACC-2291", type: "default", position: { x: 450, y: 300 }, data: { label: "ACC-2291", risk: "critical", name: "Global Exports", type: "Business" } },
  { id: "ACC-9903", type: "default", position: { x: 650, y: 200 }, data: { label: "ACC-9903", risk: "high", name: "Verma Holdings", type: "Current" } },
  { id: "ACC-CASH", type: "default", position: { x: 850, y: 200 }, data: { label: "ACC-CASH", risk: "critical", name: "ATM Withdrawals", type: "Cash" } },
];

export const fundFlowEdges = [
  { id: "e1", source: "ACC-A001", target: "ACC-4821", label: "₹48.2L | NEFT", type: "neft", amount: 4820000 },
  { id: "e2", source: "ACC-4821", target: "ACC-7734", label: "₹15.0L | IMPS", type: "imps", amount: 1500000 },
  { id: "e3", source: "ACC-4821", target: "ACC-2291", label: "₹20.0L | UPI", type: "upi", amount: 2000000 },
  { id: "e4", source: "ACC-7734", target: "ACC-9903", label: "₹14.5L | NEFT", type: "neft", amount: 1450000 },
  { id: "e5", source: "ACC-2291", target: "ACC-9903", label: "₹19.0L | IMPS", type: "imps", amount: 1900000 },
  { id: "e6", source: "ACC-9903", target: "ACC-CASH", label: "₹79.5L | Cash", type: "cash", amount: 7950000 },
  { id: "e7", source: "ACC-CASH", target: "ACC-4821", label: "₹9.4L | NEFT", type: "neft", amount: 940000, style: { strokeDasharray: "5,5" } },
];

// Node Details for Sidebar
export const nodeDetails = {
  "ACC-4821": {
    holderName: "Ramesh Kumar Yadav",
    accountType: "Jan Dhan Savings",
    kycStatus: "Self-Certified",
    lastActive: "14 Mar 2024",
    riskScore: 91,
    declaredIncome: "₹2,40,000/yr",
    actualFlow: "₹1,83,40,000",
    branch: "Bhopal Main",
    opened: "15 Jan 2023",
    status: "ACTIVE (was dormant)",
  },
  "ACC-A001": {
    holderName: "Ramesh Enterprises Pvt Ltd",
    accountType: "Current Account",
    kycStatus: "Verified",
    lastActive: "14 Mar 2024",
    riskScore: 23,
    declaredIncome: "₹50,00,000/yr",
    actualFlow: "₹48,20,000",
    branch: "Indore Central",
    opened: "10 Mar 2020",
    status: "ACTIVE",
  },
  "ACC-7734": {
    holderName: "Sharma Traders",
    accountType: "Current Account",
    kycStatus: "Verified",
    lastActive: "15 Mar 2024",
    riskScore: 78,
    declaredIncome: "₹30,00,000/yr",
    actualFlow: "₹29,50,000",
    branch: "Bhopal Main",
    opened: "22 Jun 2021",
    status: "ACTIVE",
  },
  "ACC-2291": {
    holderName: "Global Exports Co",
    accountType: "Business Account",
    kycStatus: "Pending Review",
    lastActive: "15 Mar 2024",
    riskScore: 89,
    declaredIncome: "₹1,00,00,000/yr",
    actualFlow: "₹39,00,000",
    branch: "Mumbai Fort",
    opened: "05 Nov 2022",
    status: "UNDER REVIEW",
  },
  "ACC-9903": {
    holderName: "Verma Holdings",
    accountType: "Current Account",
    kycStatus: "Verified",
    lastActive: "16 Mar 2024",
    riskScore: 82,
    declaredIncome: "₹45,00,000/yr",
    actualFlow: "₹1,03,50,000",
    branch: "Delhi Connaught",
    opened: "18 Aug 2019",
    status: "ACTIVE",
  },
};

// Transaction Data for Bottom Panel
export const transactions = [
  { id: "TXN-001", from: "ACC-A001", to: "ACC-4821", amount: "₹48,20,000", channel: "NEFT", time: "14 Mar 09:15", riskFlag: "high" },
  { id: "TXN-002", from: "ACC-4821", to: "ACC-7734", amount: "₹15,00,000", channel: "IMPS", time: "14 Mar 10:22", riskFlag: "medium" },
  { id: "TXN-003", from: "ACC-4821", to: "ACC-2291", amount: "₹20,00,000", channel: "UPI", time: "14 Mar 11:45", riskFlag: "high" },
  { id: "TXN-004", from: "ACC-7734", to: "ACC-9903", amount: "₹14,50,000", channel: "NEFT", time: "14 Mar 14:30", riskFlag: "medium" },
  { id: "TXN-005", from: "ACC-2291", to: "ACC-9903", amount: "₹19,00,000", channel: "IMPS", time: "15 Mar 09:00", riskFlag: "high" },
  { id: "TXN-006", from: "ACC-9903", to: "ACC-CASH", amount: "₹9,90,000", channel: "Cash", time: "15 Mar 10:15", riskFlag: "critical" },
  { id: "TXN-007", from: "ACC-9903", to: "ACC-CASH", amount: "₹9,85,000", channel: "Cash", time: "15 Mar 11:30", riskFlag: "critical" },
  { id: "TXN-008", from: "ACC-9903", to: "ACC-CASH", amount: "₹9,95,000", channel: "Cash", time: "15 Mar 14:00", riskFlag: "critical" },
  { id: "TXN-009", from: "ACC-CASH", to: "ACC-4821", amount: "₹9,40,000", channel: "NEFT", time: "16 Mar 16:45", riskFlag: "critical" },
];

// Case Investigation Data
export const caseData = {
  id: "CASE-2024-0091",
  opened: "14 Mar 2024, 09:52",
  riskScore: 91,
  patterns: ["Circular Flow", "Dormant Activation", "Structuring", "Layering"],
  status: "Under Review",
  assignedOfficer: "Vikram Malhotra",
};

export const caseTimeline = [
  { step: 1, account: "ACC-A001", amount: "₹48,20,000", channel: "NEFT", time: "14 Mar 09:15", signal: "Origin — Business Account" },
  { step: 2, account: "ACC-4821", amount: "₹48,20,000", channel: "NEFT", time: "14 Mar 09:15", signal: "Dormant Account Activated" },
  { step: 3, account: "ACC-4821", amount: "₹15,00,000", channel: "IMPS", time: "14 Mar 10:22", signal: "First Layer Split" },
  { step: 4, account: "ACC-7734", amount: "₹14,50,000", channel: "NEFT", time: "14 Mar 14:30", signal: "Second Layer" },
  { step: 5, account: "ACC-2291", amount: "₹19,00,000", channel: "IMPS", time: "15 Mar 09:00", signal: "KYC Mismatch Detected" },
  { step: 6, account: "ACC-9903", amount: "₹79,50,000", channel: "Cash", time: "15 Mar 10:15", signal: "Structuring — 8 ATM Withdrawals" },
  { step: 7, account: "ACC-4821", amount: "₹9,40,000", channel: "NEFT", time: "16 Mar 16:45", signal: "Circular Return Detected", highlight: true },
];

export const evidenceChecklist = [
  { id: 1, label: "Circular flow path confirmed", checked: true },
  { id: 2, label: "Dormant account activation verified", checked: true },
  { id: 3, label: "KYC mismatch documented", checked: true },
  { id: 4, label: "Structuring pattern logged", checked: true },
  { id: 5, label: "Graph export attached", checked: true },
];

export const officers = [
  { id: 1, name: "Vikram Malhotra", role: "Senior AML Officer" },
  { id: 2, name: "Meera Joshi", role: "AML Analyst" },
  { id: 3, name: "Rahul Sharma", role: "Investigation Officer" },
];

// STR Report Data
export const strReportData = {
  subjectAccount: "ACC-4821",
  riskScore: 91,
  reportingPeriod: "14–17 March 2024",
  fundsUnderInvestigation: "₹1,83,40,000",
  narrative: `On 14 March 2024, a suspicious fund movement of ₹48,20,000 was received by Account ACC-4821 — a Jan Dhan savings account held by Ramesh Kumar Yadav, classified as a daily wage labourer with declared annual income of ₹2,40,000. The account had been dormant for 11 months prior to this transaction. Within 38 hours, the funds were layered through three intermediate accounts (ACC-7734, ACC-2291, ACC-9903) before being structured into eight ATM withdrawals between ₹9,50,000 and ₹9,90,000 each — all below the ₹10,00,000 mandatory reporting threshold. A circular return of ₹9,40,000 to the origin account was detected on 15 March. Total funds moved: ₹1,83,40,000 across 14 transactions in 72 hours. The pattern is consistent with classic layering and structuring indicative of money laundering under Section 3 of PMLA, 2002.`,
};

// Digital Twin Data
export const digitalTwinCases = [
  { id: "CASE-2024-0091", name: "ACC-4821 Bhopal Layering" },
  { id: "CASE-2024-0089", name: "ACC-5567 Mumbai Structuring" },
  { id: "CASE-2024-0085", name: "ACC-2234 Delhi Circular Flow" },
];

export const simulationOutcomes = {
  actual: {
    fundsLost: "₹1.83 Cr",
    accountsInvolved: 6,
    detectionDay: "Day 4",
  },
  simulated: {
    fundsRecoverable: "₹1.83 Cr",
    accountsBlocked: 5,
    detectionDay: "Day 1",
  },
};

export const learnings = [
  "Early dormant account monitoring would have flagged ACC-4821 on Day 0",
  "Velocity threshold of 3 transactions/6hr would have triggered alert 29 hours earlier",
  "Jan Dhan account KYC mismatch score exceeded threshold — Scheme Guard would activate",
  "Round-trip detection would have isolated the fraud ring by Day 2",
];

// Alert Management Data
export const alertManagementData = [
  { id: "A-0047", account: "ACC-4821", pattern: "Circular Flow", risk: "critical", amount: "₹48,20,000", branch: "Bhopal Main", channel: "NEFT", timeSince: "8 min", sla: "Within SLA", assigned: "Vikram Malhotra" },
  { id: "A-0046", account: "ACC-7734", pattern: "Threshold Structuring", risk: "high", amount: "₹9,90,000", branch: "Bhopal Main", channel: "Cash", timeSince: "15 min", sla: "Within SLA", assigned: "Meera Joshi" },
  { id: "A-0045", account: "ACC-2291", pattern: "Dormant Activation", risk: "high", amount: "₹35,00,000", branch: "Mumbai Fort", channel: "IMPS", timeSince: "22 min", sla: "Within SLA", assigned: "Rahul Sharma" },
  { id: "A-0044", account: "ACC-9903", pattern: "Layering — 4 Hop", risk: "critical", amount: "₹62,00,000", branch: "Delhi Connaught", channel: "UPI", timeSince: "38 min", sla: "SLA Breach", assigned: "Unassigned" },
  { id: "A-0043", account: "ACC-1156", pattern: "KYC Mismatch", risk: "medium", amount: "₹12,50,000", branch: "Indore Central", channel: "NEFT", timeSince: "45 min", sla: "Within SLA", assigned: "Vikram Malhotra" },
  { id: "A-0042", account: "ACC-3342", pattern: "Circular Flow", risk: "high", amount: "₹28,75,000", branch: "Pune Camp", channel: "IMPS", timeSince: "1 hr", sla: "Within SLA", assigned: "Meera Joshi" },
  { id: "A-0041", account: "ACC-5567", pattern: "Velocity Spike", risk: "medium", amount: "₹8,40,000", branch: "Chennai Mount", channel: "UPI", timeSince: "1.2 hr", sla: "Within SLA", assigned: "Rahul Sharma" },
  { id: "A-0040", account: "ACC-8891", pattern: "Structuring", risk: "high", amount: "₹9,75,000", branch: "Kolkata Park", channel: "Cash", timeSince: "1.5 hr", sla: "Within SLA", assigned: "Unassigned" },
  { id: "A-0039", account: "ACC-2234", pattern: "Layering", risk: "critical", amount: "₹1,20,00,000", branch: "Hyderabad Hitech", channel: "RTGS", timeSince: "2 hr", sla: "SLA Breach", assigned: "Vikram Malhotra" },
  { id: "A-0038", account: "ACC-6678", pattern: "Dormant Activation", risk: "medium", amount: "₹15,00,000", branch: "Ahmedabad Navrang", channel: "NEFT", timeSince: "2.5 hr", sla: "Within SLA", assigned: "Meera Joshi" },
  { id: "A-0037", account: "ACC-4455", pattern: "Circular Flow", risk: "high", amount: "₹42,00,000", branch: "Jaipur MI Road", channel: "IMPS", timeSince: "3 hr", sla: "Within SLA", assigned: "Rahul Sharma" },
  { id: "A-0036", account: "ACC-7789", pattern: "KYC Mismatch", risk: "low", amount: "₹5,50,000", branch: "Lucknow Hazrat", channel: "UPI", timeSince: "3.5 hr", sla: "Within SLA", assigned: "Unassigned" },
  { id: "A-0035", account: "ACC-1123", pattern: "Structuring", risk: "high", amount: "₹9,80,000", branch: "Patna Gandhi", channel: "Cash", timeSince: "4 hr", sla: "Within SLA", assigned: "Vikram Malhotra" },
  { id: "A-0034", account: "ACC-3344", pattern: "Velocity Spike", risk: "medium", amount: "₹18,00,000", branch: "Bhubaneswar", channel: "NEFT", timeSince: "4.5 hr", sla: "Within SLA", assigned: "Meera Joshi" },
  { id: "A-0033", account: "ACC-5566", pattern: "Layering — 3 Hop", risk: "critical", amount: "₹75,00,000", branch: "Chandigarh", channel: "RTGS", timeSince: "5 hr", sla: "SLA Breach", assigned: "Rahul Sharma" },
  { id: "A-0032", account: "ACC-9900", pattern: "Circular Flow", risk: "high", amount: "₹33,00,000", branch: "Noida Sector", channel: "IMPS", timeSince: "5.5 hr", sla: "Within SLA", assigned: "Unassigned" },
  { id: "A-0031", account: "ACC-1212", pattern: "Dormant Activation", risk: "medium", amount: "₹22,00,000", branch: "Gurgaon Cyber", channel: "UPI", timeSince: "6 hr", sla: "Within SLA", assigned: "Vikram Malhotra" },
  { id: "A-0030", account: "ACC-3434", pattern: "Threshold Structuring", risk: "high", amount: "₹9,95,000", branch: "Thane West", channel: "Cash", timeSince: "6.5 hr", sla: "Within SLA", assigned: "Meera Joshi" },
  { id: "A-0029", account: "ACC-5656", pattern: "KYC Mismatch", risk: "low", amount: "₹7,50,000", branch: "Nagpur Sadar", channel: "NEFT", timeSince: "7 hr", sla: "Within SLA", assigned: "Rahul Sharma" },
];

// Analytics Data
export const alertVolumeData = [
  { date: "Feb 19", highRisk: 12, mediumRisk: 18 },
  { date: "Feb 20", highRisk: 15, mediumRisk: 22 },
  { date: "Feb 21", highRisk: 8, mediumRisk: 15 },
  { date: "Feb 22", highRisk: 18, mediumRisk: 25 },
  { date: "Feb 23", highRisk: 22, mediumRisk: 30 },
  { date: "Feb 24", highRisk: 14, mediumRisk: 20 },
  { date: "Feb 25", highRisk: 16, mediumRisk: 24 },
  { date: "Feb 26", highRisk: 20, mediumRisk: 28 },
  { date: "Feb 27", highRisk: 25, mediumRisk: 32 },
  { date: "Feb 28", highRisk: 18, mediumRisk: 26 },
  { date: "Mar 1", highRisk: 22, mediumRisk: 30 },
  { date: "Mar 2", highRisk: 28, mediumRisk: 35 },
  { date: "Mar 3", highRisk: 24, mediumRisk: 32 },
  { date: "Mar 4", highRisk: 30, mediumRisk: 38 },
  { date: "Mar 5", highRisk: 26, mediumRisk: 34 },
  { date: "Mar 6", highRisk: 32, mediumRisk: 40 },
  { date: "Mar 7", highRisk: 28, mediumRisk: 36 },
  { date: "Mar 8", highRisk: 35, mediumRisk: 42 },
  { date: "Mar 9", highRisk: 30, mediumRisk: 38 },
  { date: "Mar 10", highRisk: 38, mediumRisk: 45 },
  { date: "Mar 11", highRisk: 42, mediumRisk: 48 },
  { date: "Mar 12", highRisk: 36, mediumRisk: 44 },
  { date: "Mar 13", highRisk: 44, mediumRisk: 52 },
  { date: "Mar 14", highRisk: 48, mediumRisk: 56 },
  { date: "Mar 15", highRisk: 52, mediumRisk: 60 },
  { date: "Mar 16", highRisk: 46, mediumRisk: 54 },
  { date: "Mar 17", highRisk: 50, mediumRisk: 58 },
  { date: "Mar 18", highRisk: 54, mediumRisk: 62 },
  { date: "Mar 19", highRisk: 58, mediumRisk: 66 },
  { date: "Mar 20", highRisk: 62, mediumRisk: 70 },
];

export const fraudPatternData = [
  { name: "Circular Flow", value: 28, color: "#E84545" },
  { name: "Layering", value: 24, color: "#F97316" },
  { name: "Structuring", value: 22, color: "#F59E0B" },
  { name: "Dormant Activation", value: 16, color: "#3B82F6" },
  { name: "KYC Mismatch", value: 10, color: "#22C55E" },
];

export const channelRiskData = [
  { channel: "NEFT", risk: 65, volume: 1250 },
  { channel: "IMPS", risk: 78, volume: 2100 },
  { channel: "UPI", risk: 52, volume: 3500 },
  { channel: "RTGS", risk: 85, volume: 420 },
  { channel: "Cash", risk: 92, volume: 180 },
];

export const topRiskBranches = [
  { rank: 1, name: "Bhopal Main", city: "Bhopal", alerts: 47, funds: "₹12.5 Cr", score: 91 },
  { rank: 2, name: "Mumbai Fort", city: "Mumbai", alerts: 38, funds: "₹9.8 Cr", score: 87 },
  { rank: 3, name: "Delhi Connaught", city: "Delhi", alerts: 35, funds: "₹8.2 Cr", score: 84 },
  { rank: 4, name: "Hyderabad Hitech", city: "Hyderabad", alerts: 29, funds: "₹6.5 Cr", score: 79 },
  { rank: 5, name: "Chennai Mount", city: "Chennai", alerts: 26, funds: "₹5.8 Cr", score: 76 },
  { rank: 6, name: "Kolkata Park", city: "Kolkata", alerts: 24, funds: "₹4.9 Cr", score: 73 },
  { rank: 7, name: "Pune Camp", city: "Pune", alerts: 22, funds: "₹4.2 Cr", score: 71 },
  { rank: 8, name: "Indore Central", city: "Indore", alerts: 20, funds: "₹3.8 Cr", score: 68 },
  { rank: 9, name: "Jaipur MI Road", city: "Jaipur", alerts: 18, funds: "₹3.1 Cr", score: 65 },
  { rank: 10, name: "Ahmedabad Navrang", city: "Ahmedabad", alerts: 16, funds: "₹2.7 Cr", score: 62 },
];

// Account 360 Data
export const account360Data = {
  accountNumber: "ACC-4821",
  holderName: "Ramesh Kumar Yadav",
  accountType: "Jan Dhan Savings",
  branch: "Bhopal Main",
  kycStatus: "Self-Certified",
  status: "ACTIVE (was dormant)",
  riskScore: 91,
  declaredIncome: "₹2,40,000/yr",
  actualFundsMoved: "₹1,83,40,000",
  period: "3 days",
};

export const transactionHistory = [
  { id: "TXN-001", date: "14 Mar", description: "NEFT Credit — Ramesh Ent", amount: "+₹48,20,000", balance: "₹48,20,450", riskFlag: "high" },
  { id: "TXN-002", date: "14 Mar", description: "IMPS Transfer — Sharma Traders", amount: "-₹15,00,000", balance: "₹33,20,450", riskFlag: "medium" },
  { id: "TXN-003", date: "14 Mar", description: "UPI Transfer — Global Exports", amount: "-₹20,00,000", balance: "₹13,20,450", riskFlag: "high" },
  { id: "TXN-004", date: "15 Mar", description: "ATM Withdrawal — Branch 001", amount: "-₹10,000", balance: "₹13,10,450", riskFlag: "low" },
  { id: "TXN-005", date: "15 Mar", description: "ATM Withdrawal — Branch 002", amount: "-₹10,000", balance: "₹13,00,450", riskFlag: "low" },
  { id: "TXN-006", date: "15 Mar", description: "ATM Withdrawal — Branch 003", amount: "-₹10,000", balance: "₹12,90,450", riskFlag: "low" },
  { id: "TXN-007", date: "15 Mar", description: "NEFT Credit — Cash Deposit", amount: "+₹9,40,000", balance: "₹22,30,450", riskFlag: "critical" },
  { id: "TXN-008", date: "16 Mar", description: "ATM Withdrawal — Branch 004", amount: "-₹10,000", balance: "₹22,20,450", riskFlag: "low" },
  { id: "TXN-009", date: "16 Mar", description: "ATM Withdrawal — Branch 005", amount: "-₹10,000", balance: "₹22,10,450", riskFlag: "low" },
  { id: "TXN-010", date: "16 Mar", description: "ATM Withdrawal — Branch 006", amount: "-₹10,000", balance: "₹22,00,450", riskFlag: "low" },
  { id: "TXN-011", date: "16 Mar", description: "ATM Withdrawal — Branch 007", amount: "-₹10,000", balance: "₹21,90,450", riskFlag: "low" },
  { id: "TXN-012", date: "16 Mar", description: "ATM Withdrawal — Branch 008", amount: "-₹10,000", balance: "₹21,80,450", riskFlag: "low" },
  { id: "TXN-013", date: "17 Mar", description: "Cash Deposit — Branch 001", amount: "+₹50,000", balance: "₹22,30,450", riskFlag: "medium" },
  { id: "TXN-014", date: "17 Mar", description: "NEFT Transfer — Self", amount: "-₹22,00,000", balance: "₹30,450", riskFlag: "high" },
];

export const transactionDNA = {
  frequency: { expected: 5, actual: 47 },
  ticketSize: { expected: 5000, actual: 1308571 },
  counterpartyCount: { expected: 3, actual: 12 },
  digitalCashRatio: { expected: 80, actual: 35 },
  nightTimePct: { expected: 5, actual: 42 },
};

// Admin & Config Data
export const rulesEngine = [
  { id: 1, name: "Dormant Account Activation Alert", description: "Trigger if dormant >6 months receives >₹5L", enabled: true, threshold: 500000 },
  { id: 2, name: "Velocity Threshold", description: "Alert if >5 transactions in 6 hours", enabled: true, threshold: 5 },
  { id: 3, name: "Structuring Detection", description: "Flag tranches between ₹9L–₹10L", enabled: true, thresholdMin: 900000, thresholdMax: 1000000 },
];

export const users = [
  { id: 1, name: "Vikram Malhotra", role: "Senior AML Officer", branch: "Mumbai HQ", status: "Active", lastLogin: "20 Mar 2024, 08:45" },
  { id: 2, name: "Meera Joshi", role: "AML Analyst", branch: "Mumbai HQ", status: "Active", lastLogin: "20 Mar 2024, 09:12" },
  { id: 3, name: "Rahul Sharma", role: "Investigation Officer", branch: "Delhi Regional", status: "Active", lastLogin: "19 Mar 2024, 17:30" },
  { id: 4, name: "Priya Patel", role: "Compliance Manager", branch: "Chennai Regional", status: "On Leave", lastLogin: "15 Mar 2024, 16:00" },
  { id: 5, name: "Arun Kumar", role: "AML Analyst", branch: "Bhopal Main", status: "Active", lastLogin: "20 Mar 2024, 07:55" },
];

// Audit Trail Data
export const auditTrailData = [
  { id: 1, timestamp: "20 Mar 2024, 09:52:15", officer: "Vikram Malhotra", action: "Alert Generated", entity: "A-0047", description: "Circular Flow pattern detected for ACC-4821", ip: "10.24.18.45" },
  { id: 2, timestamp: "20 Mar 2024, 09:48:32", officer: "Meera Joshi", action: "Report Downloaded", entity: "S-006", description: "STR evidence pack downloaded", ip: "10.24.18.62" },
  { id: 3, timestamp: "20 Mar 2024, 09:35:18", officer: "Vikram Malhotra", action: "Case Opened", entity: "CASE-2024-0091", description: "Case escalated to Level 2 investigation", ip: "10.24.18.45" },
  { id: 4, timestamp: "20 Mar 2024, 09:30:45", officer: "System", action: "Account Flagged", entity: "ACC-4821", description: "Account flagged for suspicious activity", ip: "127.0.0.1" },
  { id: 5, timestamp: "20 Mar 2024, 09:25:22", officer: "Rahul Sharma", action: "Alert Assigned", entity: "A-0045", description: "Alert assigned to Rahul Sharma", ip: "10.24.19.12" },
  { id: 6, timestamp: "20 Mar 2024, 09:18:05", officer: "System", action: "Alert Generated", entity: "A-0046", description: "Threshold Structuring detected", ip: "127.0.0.1" },
  { id: 7, timestamp: "20 Mar 2024, 09:00:00", officer: "System", action: "Login", entity: "System", description: "Daily batch processing started", ip: "127.0.0.1" },
  { id: 8, timestamp: "20 Mar 2024, 08:55:33", officer: "Meera Joshi", action: "STR Edited", entity: "S-005", description: "Narrative updated for case CASE-2024-0089", ip: "10.24.18.62" },
  { id: 9, timestamp: "20 Mar 2024, 08:42:18", officer: "Arun Kumar", action: "Report Downloaded", entity: "ACC-1156", description: "KYC documents downloaded", ip: "10.24.22.78" },
  { id: 10, timestamp: "20 Mar 2024, 08:30:00", officer: "System", action: "Login", entity: "System", description: "Automated system backup completed", ip: "127.0.0.1" },
  { id: 11, timestamp: "19 Mar 2024, 17:45:22", officer: "Rahul Sharma", action: "Case Opened", entity: "CASE-2024-0090", description: "New case created for investigation", ip: "10.24.19.12" },
  { id: 12, timestamp: "19 Mar 2024, 16:30:15", officer: "Vikram Malhotra", action: "Alert Assigned", entity: "A-0039", description: "Critical alert assigned for immediate action", ip: "10.24.18.45" },
  { id: 13, timestamp: "19 Mar 2024, 15:22:08", officer: "System", action: "Account Flagged", entity: "ACC-2234", description: "Multiple KYC mismatch alerts", ip: "127.0.0.1" },
  { id: 14, timestamp: "19 Mar 2024, 14:18:45", officer: "Meera Joshi", action: "STR Edited", entity: "S-004", description: "Evidence checklist updated", ip: "10.24.18.62" },
  { id: 15, timestamp: "19 Mar 2024, 13:05:33", officer: "Arun Kumar", action: "Report Downloaded", entity: "TXN-Report", description: "Transaction history exported", ip: "10.24.22.78" },
  { id: 16, timestamp: "19 Mar 2024, 12:00:00", officer: "System", action: "Login", entity: "System", description: "Mid-day batch processing completed", ip: "127.0.0.1" },
  { id: 17, timestamp: "19 Mar 2024, 11:45:18", officer: "Vikram Malhotra", action: "Alert Generated", entity: "A-0038", description: "Dormant account activation pattern", ip: "10.24.18.45" },
  { id: 18, timestamp: "19 Mar 2024, 10:30:42", officer: "Rahul Sharma", action: "Case Opened", entity: "CASE-2024-0089", description: "Layering pattern investigation started", ip: "10.24.19.12" },
  { id: 19, timestamp: "19 Mar 2024, 09:15:25", officer: "System", action: "Account Flagged", entity: "ACC-5567", description: "Velocity threshold exceeded", ip: "127.0.0.1" },
  { id: 20, timestamp: "19 Mar 2024, 08:00:00", officer: "System", action: "Login", entity: "System", description: "Daily system health check passed", ip: "127.0.0.1" },
  { id: 21, timestamp: "18 Mar 2024, 17:30:15", officer: "Meera Joshi", action: "STR Edited", entity: "S-003", description: "Narrative finalized for submission", ip: "10.24.18.62" },
  { id: 22, timestamp: "18 Mar 2024, 16:45:08", officer: "Arun Kumar", action: "Report Downloaded", entity: "Graph-Export", description: "Fund flow graph exported as PNG", ip: "10.24.22.78" },
  { id: 23, timestamp: "18 Mar 2024, 15:22:33", officer: "Vikram Malhotra", action: "Alert Assigned", entity: "A-0035", description: "Structuring alert assigned", ip: "10.24.18.45" },
  { id: 24, timestamp: "18 Mar 2024, 14:10:45", officer: "System", action: "Alert Generated", entity: "A-0036", description: "KYC mismatch detected", ip: "127.0.0.1" },
  { id: 25, timestamp: "18 Mar 2024, 13:00:00", officer: "System", action: "Login", entity: "System", description: "Afternoon batch started", ip: "127.0.0.1" },
  { id: 26, timestamp: "18 Mar 2024, 11:35:22", officer: "Rahul Sharma", action: "Case Opened", entity: "CASE-2024-0088", description: "Circular flow investigation", ip: "10.24.19.12" },
  { id: 27, timestamp: "18 Mar 2024, 10:20:18", officer: "Meera Joshi", action: "Account Flagged", entity: "ACC-3342", description: "Multiple suspicious transactions", ip: "10.24.18.62" },
  { id: 28, timestamp: "18 Mar 2024, 09:05:45", officer: "System", action: "Alert Generated", entity: "A-0034", description: "Velocity spike pattern", ip: "127.0.0.1" },
  { id: 29, timestamp: "18 Mar 2024, 08:00:00", officer: "System", action: "Login", entity: "System", description: "Morning batch completed", ip: "127.0.0.1" },
  { id: 30, timestamp: "17 Mar 2024, 17:15:33", officer: "Vikram Malhotra", action: "Report Downloaded", entity: "Daily-Summary", description: "Daily alert summary exported", ip: "10.24.18.45" },
];
