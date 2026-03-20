import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { AlertTriangle, TrendingUp, Wallet, FileText, Eye } from 'lucide-react';
import { StatCard } from '@/components/ui-custom/StatCard';
import { RiskBadge } from '@/components/ui-custom/RiskBadge';
import { dashboardStats, alertFeed, recentActivity, fundFlowNodes, fundFlowEdges } from '@/data/mockData';
import ReactFlow, { Background, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { cn } from '@/lib/utils';

const nodeColors: Record<string, string> = {
  low: '#16A34A',
  medium: '#D97706',
  high: '#EA580C',
  critical: '#DC2626',
};

interface DashboardProps {
  navigateTo: (page: string, params?: Record<string, unknown>) => void;
}

export function Dashboard({ navigateTo }: DashboardProps) {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const handleViewAlert = (alertId: string, account: string) => {
    toast.loading('Loading alert details...', { duration: 800 });
    
    setTimeout(() => {
      toast.dismiss();
      toast.success(`Alert ${alertId} opened in Alert Management`);
      navigateTo('alerts', { alertId, account });
    }, 800);
  };

  const customNodes = fundFlowNodes.map(node => ({
    ...node,
    style: {
      background: nodeColors[node.data.risk] || '#6B7280',
      color: 'white',
      border: '2px solid white',
      borderRadius: '50%',
      width: 60,
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: 'bold',
      boxShadow: node.data.risk === 'critical' ? '0 0 20px rgba(220, 38, 38, 0.6)' : '0 2px 8px rgba(0,0,0,0.15)',
    },
  }));

  const customEdges = fundFlowEdges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    type: edge.type,
    style: { 
      stroke: edge.type === 'neft' ? '#3B82F6' : edge.type === 'imps' ? '#F97316' : edge.type === 'upi' ? '#8B5CF6' : '#6B7280',
      strokeWidth: Math.max(2, Math.min(edge.amount / 500000, 6)),
    },
    labelStyle: { fill: '#374151', fontSize: 10, fontWeight: 500 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#374151' },
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-6"
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Alerts Today"
          value={dashboardStats.totalAlerts.value}
          delta={dashboardStats.totalAlerts.delta}
          deltaType={dashboardStats.totalAlerts.deltaType}
          icon={AlertTriangle}
        />
        <StatCard
          title="High Risk Cases"
          value={dashboardStats.highRiskCases.value}
          delta={dashboardStats.highRiskCases.delta}
          deltaType={dashboardStats.highRiskCases.deltaType}
          icon={TrendingUp}
        />
        <StatCard
          title="Funds Under Watch"
          value={dashboardStats.fundsUnderWatch.value}
          delta={dashboardStats.fundsUnderWatch.delta}
          deltaType={dashboardStats.fundsUnderWatch.deltaType}
          icon={Wallet}
        />
        <StatCard
          title="STRs Filed This Month"
          value={dashboardStats.strsFiled.value}
          deltaType="neutral"
          icon={FileText}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-5 gap-6">
        {/* Alert Feed Table */}
        <div className="col-span-3 bg-white rounded-lg shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Alert Feed</h3>
            <p className="text-sm text-gray-500 mt-0.5">Real-time suspicious activity alerts</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Alert ID</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Account</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Pattern Type</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Risk</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Time</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {alertFeed.map((alert, index) => (
                  <tr 
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert.id)}
                    className={cn(
                      "cursor-pointer transition-colors",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50",
                      selectedAlert === alert.id && "bg-ubi-red/5",
                      "hover:bg-gray-50"
                    )}
                  >
                    <td className="px-4 py-3 font-mono text-ubi-blue font-medium">{alert.id}</td>
                    <td className="px-4 py-3 font-mono">{alert.account}</td>
                    <td className="px-4 py-3">{alert.pattern}</td>
                    <td className="px-4 py-3">
                      <RiskBadge level={alert.risk} />
                    </td>
                    <td className="px-4 py-3 font-medium">{alert.amount}</td>
                    <td className="px-4 py-3 text-gray-500">{alert.time}</td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewAlert(alert.id, alert.account);
                        }}
                        className="flex items-center gap-1.5 text-ubi-blue hover:text-ubi-blue-dark text-sm font-medium bg-ubi-blue/5 hover:bg-ubi-blue/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mini Graph Preview */}
        <div className="col-span-2 bg-white rounded-lg shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Selected Alert: ACC-4821 Fund Path</h3>
            <p className="text-sm text-gray-500 mt-0.5">Visual representation of fund flow</p>
          </div>
          <div className="h-80">
            <ReactFlow
              nodes={customNodes}
              edges={customEdges}
              fitView
              attributionPosition="bottom-left"
              nodesDraggable={false}
              nodesConnectable={false}
              panOnDrag={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
            >
              <Background color="#e5e7eb" gap={20} size={1} />
            </ReactFlow>
          </div>
        </div>
      </div>

      {/* Recent Activity Strip */}
      <div className="bg-white rounded-lg shadow-card p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Recent Activity Log</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {recentActivity.map((activity) => (
            <div 
              key={activity.id}
              className="flex-shrink-0 bg-gray-50 rounded-lg px-4 py-3 min-w-[280px]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  activity.type === 'alert' && "bg-red-100 text-red-700",
                  activity.type === 'download' && "bg-green-100 text-green-700",
                  activity.type === 'escalation' && "bg-orange-100 text-orange-700",
                  activity.type === 'flag' && "bg-amber-100 text-amber-700",
                  activity.type === 'assignment' && "bg-blue-100 text-blue-700",
                  activity.type === 'system' && "bg-gray-100 text-gray-600",
                  activity.type === 'clear' && "bg-gray-100 text-gray-600",
                  activity.type === 'document' && "bg-purple-100 text-purple-700",
                )}>
                  {activity.type.replace('-', ' ').toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-700">{activity.event}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
