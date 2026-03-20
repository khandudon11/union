import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ZoomIn, ZoomOut, Flag, Route, Download, Filter, Calendar } from 'lucide-react';
import ReactFlow, { 
  Background, 
  Controls,
  type Node,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Slider } from '@/components/ui/slider';
import { ChannelBadge } from '@/components/ui-custom/ChannelBadge';
import { fundFlowNodes, fundFlowEdges, nodeDetails, transactions } from '@/data/mockData';
import { cn } from '@/lib/utils';

const nodeColors: Record<string, string> = {
  low: '#16A34A',
  medium: '#D97706',
  high: '#EA580C',
  critical: '#DC2626',
};

const edgeColors: Record<string, string> = {
  neft: '#3B82F6',
  imps: '#F97316',
  upi: '#8B5CF6',
  cash: '#6B7280',
  rtgs: '#10B981',
};

export function FundFlowGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState([50]);
  const [showBottomPanel, setShowBottomPanel] = useState(false);

  const customNodes = fundFlowNodes.map(node => ({
    ...node,
    style: {
      background: nodeColors[node.data.risk] || '#6B7280',
      color: 'white',
      border: selectedNode === node.id ? '3px solid #E31837' : '2px solid white',
      borderRadius: '50%',
      width: selectedNode === node.id ? 70 : 60,
      height: selectedNode === node.id ? 70 : 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: 'bold',
      boxShadow: node.data.risk === 'critical' 
        ? '0 0 25px rgba(220, 38, 38, 0.7)' 
        : '0 2px 8px rgba(0,0,0,0.15)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
  }));

  const customEdges = fundFlowEdges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    type: edge.type,
    style: { 
      stroke: edgeColors[edge.type] || '#6B7280',
      strokeWidth: Math.max(2, Math.min(edge.amount / 500000, 6)),
      opacity: selectedNode && (edge.source === selectedNode || edge.target === selectedNode) ? 1 : 0.6,
    },
    labelStyle: { fill: '#374151', fontSize: 10, fontWeight: 500 },
    markerEnd: { type: MarkerType.ArrowClosed, color: edgeColors[edge.type] || '#6B7280' },
  }));

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    setShowBottomPanel(true);
    toast.info(`Selected node: ${node.id}`);
  }, []);

  const handleFlagAccount = () => {
    if (selectedNode) {
      toast.success(`Account ${selectedNode} flagged for investigation`);
    } else {
      toast.info('Please select a node to flag');
    }
  };

  const handleExportPNG = () => {
    toast.loading('Exporting graph as PNG...', { duration: 1500 });
    setTimeout(() => {
      toast.dismiss();
      toast.success('Graph exported successfully');
    }, 1500);
  };

  const selectedNodeData = selectedNode ? nodeDetails[selectedNode as keyof typeof nodeDetails] : null;
  const filteredTransactions = selectedNode 
    ? transactions.filter(t => t.from === selectedNode || t.to === selectedNode)
    : transactions;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-[calc(100vh-4rem)] flex"
    >
      {/* Main Graph Area */}
      <div className="flex-1 relative">
        {/* Top Toolbar */}
        <div className="absolute top-4 left-4 right-4 z-10 bg-white rounded-lg shadow-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Time Scrubber */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Mar 14 09:00</span>
              <Slider
                value={timeRange}
                onValueChange={setTimeRange}
                max={100}
                step={1}
                className="w-48"
              />
              <span className="text-xs text-gray-500">Mar 17 18:00</span>
            </div>
            
            <div className="h-6 w-px bg-gray-200" />
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={handleFlagAccount}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" 
                title="Flag Account"
              >
                <Flag className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="Trace Path">
                <Route className="w-4 h-4" />
              </button>
              <button 
                onClick={handleExportPNG}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" 
                title="Export PNG"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
              <Filter className="w-4 h-4" />
              Channel
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
          </div>
        </div>

        {/* React Flow Canvas */}
        <ReactFlow
          nodes={customNodes}
          edges={customEdges}
          fitView
          onNodeClick={onNodeClick}
          attributionPosition="bottom-left"
          minZoom={0.3}
          maxZoom={2}
        >
          <Background color="#e5e7eb" gap={20} size={1} />
          <Controls className="!bg-white !shadow-lg" />
        </ReactFlow>
      </div>

      {/* Right Sidebar - Node Details */}
      {selectedNode && selectedNodeData && (
        <motion.div
          initial={{ x: 280 }}
          animate={{ x: 0 }}
          exit={{ x: 280 }}
          className="w-72 bg-white border-l border-gray-200 shadow-xl z-20 overflow-y-auto"
        >
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Node Details</h3>
            <p className="text-sm text-gray-500">Account information</p>
          </div>
          
          <div className="p-5 space-y-5">
            {/* Risk Score Gauge */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-16" viewBox="0 0 100 50">
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke={selectedNodeData.riskScore >= 80 ? '#DC2626' : selectedNodeData.riskScore >= 60 ? '#EA580C' : selectedNodeData.riskScore >= 40 ? '#D97706' : '#16A34A'}
                    strokeWidth="8"
                    strokeDasharray={`${selectedNodeData.riskScore * 1.26} 126`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute bottom-0 text-center">
                  <span className={cn(
                    "text-3xl font-bold",
                    selectedNodeData.riskScore >= 80 ? 'text-red-600' : 
                    selectedNodeData.riskScore >= 60 ? 'text-orange-600' : 
                    selectedNodeData.riskScore >= 40 ? 'text-amber-600' : 'text-green-600'
                  )}>
                    {selectedNodeData.riskScore}
                  </span>
                  <p className="text-xs text-gray-500">Risk Score</p>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Account Holder</label>
                <p className="font-medium text-gray-900">{selectedNodeData.holderName}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Account Type</label>
                <p className="font-medium text-gray-900">{selectedNodeData.accountType}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">KYC Status</label>
                <p className={cn(
                  "font-medium",
                  selectedNodeData.kycStatus === 'Verified' ? 'text-green-600' : 
                  selectedNodeData.kycStatus === 'Pending Review' ? 'text-amber-600' : 'text-red-600'
                )}>
                  {selectedNodeData.kycStatus}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Last Active</label>
                <p className="font-medium text-gray-900">{selectedNodeData.lastActive}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Declared Income</label>
                <p className="font-medium text-gray-900">{selectedNodeData.declaredIncome}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Actual Flow</label>
                <p className="font-medium text-red-600">{selectedNodeData.actualFlow}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Branch</label>
                <p className="font-medium text-gray-900">{selectedNodeData.branch}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bottom Panel - Transaction Table */}
      {showBottomPanel && (
        <motion.div
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30"
          style={{ 
            width: selectedNode ? 'calc(100% - 18rem)' : '100%',
            marginLeft: selectedNode ? '0' : '0'
          }}
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <h4 className="font-medium text-gray-900">
              Transactions {selectedNode && `for ${selectedNode}`}
            </h4>
            <button 
              onClick={() => setShowBottomPanel(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="overflow-x-auto max-h-48">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">TXN ID</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">From</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">To</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Channel</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Time</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Risk Flag</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-2 font-mono text-ubi-blue">{txn.id}</td>
                    <td className="px-4 py-2 font-mono">{txn.from}</td>
                    <td className="px-4 py-2 font-mono">{txn.to}</td>
                    <td className="px-4 py-2 font-medium">{txn.amount}</td>
                    <td className="px-4 py-2">
                      <ChannelBadge channel={txn.channel} />
                    </td>
                    <td className="px-4 py-2 text-gray-500">{txn.time}</td>
                    <td className="px-4 py-2">
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
        </motion.div>
      )}
    </motion.div>
  );
}
