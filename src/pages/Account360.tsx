import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertTriangle, TrendingUp, Users, Smartphone, Moon, Wallet } from 'lucide-react';
import { RiskScoreBadge } from '@/components/ui-custom/RiskBadge';
import { account360Data, transactionHistory, transactionDNA } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';

const entityNodes = [
  { id: 'ACC-4821', position: { x: 200, y: 100 }, data: { label: 'ACC-4821' }, style: { background: '#DC2626', color: 'white', borderRadius: '50%', width: 70, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)' } },
  { id: 'ACC-7734', position: { x: 50, y: 50 }, data: { label: 'ACC-7734' }, style: { background: '#EA580C', color: 'white', borderRadius: '50%', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' } },
  { id: 'ACC-2291', position: { x: 50, y: 150 }, data: { label: 'ACC-2291' }, style: { background: '#DC2626', color: 'white', borderRadius: '50%', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' } },
  { id: 'ACC-9903', position: { x: 350, y: 50 }, data: { label: 'ACC-9903' }, style: { background: '#EA580C', color: 'white', borderRadius: '50%', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' } },
  { id: 'DEVICE-001', position: { x: 350, y: 150 }, data: { label: 'Device X7' }, style: { background: '#6B7280', color: 'white', borderRadius: '8px', width: 60, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' } },
  { id: 'BRANCH', position: { x: 200, y: 200 }, data: { label: 'Bhopal Main' }, style: { background: '#1A365D', color: 'white', borderRadius: '8px', width: 80, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' } },
];

const entityEdges = [
  { id: 'e1', source: 'ACC-4821', target: 'ACC-7734', style: { stroke: '#9CA3AF', strokeWidth: 1 } },
  { id: 'e2', source: 'ACC-4821', target: 'ACC-2291', style: { stroke: '#9CA3AF', strokeWidth: 2 } },
  { id: 'e3', source: 'ACC-4821', target: 'ACC-9903', style: { stroke: '#9CA3AF', strokeWidth: 2 } },
  { id: 'e4', source: 'ACC-4821', target: 'DEVICE-001', style: { stroke: '#8B5CF6', strokeWidth: 1, strokeDasharray: '3,3' } },
  { id: 'e5', source: 'ACC-4821', target: 'BRANCH', style: { stroke: '#1A365D', strokeWidth: 1 } },
];

function DNABar({ 
  label, 
  icon: Icon, 
  expected, 
  actual, 
  unit 
}: { 
  label: string; 
  icon: React.ComponentType<{ className?: string }>; 
  expected: number; 
  actual: number;
  unit: string;
}) {
  const ratio = Math.min(actual / expected, 3);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{label}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">Expected: {expected}{unit}</span>
          <span className="text-red-600 font-medium">Actual: {actual.toLocaleString()}{unit}</span>
        </div>
      </div>
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-gray-300 rounded-full"
          style={{ width: `${100 / 3}%` }}
        />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(ratio * 100 / 3, 100)}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute left-0 top-0 h-full bg-red-600 rounded-full"
        />
      </div>
    </div>
  );
}

export function Account360() {
  const [searchQuery, setSearchQuery] = useState(account360Data.accountNumber);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-6"
    >
      {/* Search Bar */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search by Account Number or Customer Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 py-6 text-lg"
        />
      </div>

      {/* Account Header Card */}
      <div className="bg-ubi-navy rounded-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div>
              <span className="font-mono text-3xl font-bold">{account360Data.accountNumber}</span>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div>
                <p className="text-white/60 text-sm">Account Holder</p>
                <p className="font-medium">{account360Data.holderName}</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="text-white/60 text-sm">Account Type</p>
                <p className="font-medium">{account360Data.accountType}</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="text-white/60 text-sm">Branch</p>
                <p className="font-medium">{account360Data.branch}</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="text-white/60 text-sm">KYC Status</p>
                <p className="font-medium text-amber-400">{account360Data.kycStatus}</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="text-white/60 text-sm">Status</p>
                <p className="font-medium">{account360Data.status}</p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <RiskScoreBadge score={account360Data.riskScore} size="lg" />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-8">
          <div>
            <p className="text-white/60 text-sm">Declared Income</p>
            <p className="text-xl font-medium">{account360Data.declaredIncome}</p>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div>
            <p className="text-white/60 text-sm">Actual Funds Moved</p>
            <p className="text-2xl font-bold text-red-400 flex items-center gap-2">
              {account360Data.actualFundsMoved}
              <AlertTriangle className="w-5 h-5" />
            </p>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div>
            <p className="text-white/60 text-sm">Period</p>
            <p className="text-xl font-medium">{account360Data.period}</p>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Transaction History */}
        <div className="bg-white rounded-lg shadow-card">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Transaction History</h3>
            <p className="text-sm text-gray-500">Last 14 transactions</p>
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Date</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Description</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-500">Amount</th>
                  <th className="px-3 py-2 text-center font-medium text-gray-500">Risk</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-500">{txn.date}</td>
                    <td className="px-3 py-2 text-xs">{txn.description}</td>
                    <td className={cn(
                      "px-3 py-2 text-right font-medium",
                      txn.amount.startsWith('+') ? 'text-green-600' : 'text-gray-700'
                    )}>
                      {txn.amount}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        txn.riskFlag === 'critical' && "bg-red-100 text-red-700",
                        txn.riskFlag === 'high' && "bg-orange-100 text-orange-700",
                        txn.riskFlag === 'medium' && "bg-amber-100 text-amber-700",
                        txn.riskFlag === 'low' && "bg-green-100 text-green-700",
                      )}>
                        {txn.riskFlag}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction DNA */}
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900">Transaction DNA</h3>
            <p className="text-sm text-gray-500">Expected vs Actual Behavior</p>
          </div>
          
          <div className="space-y-6">
            <DNABar
              label="Transaction Frequency"
              icon={TrendingUp}
              expected={transactionDNA.frequency.expected}
              actual={transactionDNA.frequency.actual}
              unit="/month"
            />
            <DNABar
              label="Avg Ticket Size"
              icon={Wallet}
              expected={transactionDNA.ticketSize.expected}
              actual={transactionDNA.ticketSize.actual}
              unit=""
            />
            <DNABar
              label="Counterparty Count"
              icon={Users}
              expected={transactionDNA.counterpartyCount.expected}
              actual={transactionDNA.counterpartyCount.actual}
              unit=""
            />
            <DNABar
              label="Digital/Cash Ratio"
              icon={Smartphone}
              expected={transactionDNA.digitalCashRatio.expected}
              actual={transactionDNA.digitalCashRatio.actual}
              unit="%"
            />
            <DNABar
              label="Night-time Transactions"
              icon={Moon}
              expected={transactionDNA.nightTimePct.expected}
              actual={transactionDNA.nightTimePct.actual}
              unit="%"
            />
          </div>
        </div>

        {/* Entity Links */}
        <div className="bg-white rounded-lg shadow-card">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Connected Entities</h3>
            <p className="text-sm text-gray-500">Network visualization</p>
          </div>
          <div className="h-80">
            <ReactFlow
              nodes={entityNodes}
              edges={entityEdges}
              fitView
              nodesDraggable={false}
              nodesConnectable={false}
              panOnDrag={false}
              zoomOnScroll={false}
            >
              <Background color="#e5e7eb" gap={20} size={1} />
            </ReactFlow>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
