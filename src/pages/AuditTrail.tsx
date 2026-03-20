import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Search, Calendar, Download, FileText, UserPlus, Edit, Flag, LogIn, Download as DownloadIcon, AlertTriangle } from 'lucide-react';
import { auditTrailData } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Alert Generated': AlertTriangle,
  'Case Opened': FileText,
  'STR Edited': Edit,
  'Report Downloaded': DownloadIcon,
  'Login': LogIn,
  'Account Flagged': Flag,
  'Alert Assigned': UserPlus,
};

const actionColors: Record<string, string> = {
  'Alert Generated': 'bg-blue-100 text-blue-700',
  'Case Opened': 'bg-ubi-navy/10 text-ubi-navy',
  'STR Edited': 'bg-ubi-gold/10 text-ubi-gold',
  'Report Downloaded': 'bg-green-100 text-green-700',
  'Login': 'bg-gray-100 text-gray-600',
  'Account Flagged': 'bg-red-100 text-red-700',
  'Alert Assigned': 'bg-purple-100 text-purple-700',
};

export function AuditTrail() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('All');

  const filteredData = auditTrailData.filter(entry => {
    const matchesSearch = 
      entry.officer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'All' || entry.action === filterAction;
    return matchesSearch && matchesAction;
  });

  const uniqueActions = ['All', ...new Set(auditTrailData.map(e => e.action))];

  const handleExportPDF = () => {
    toast.loading('Generating PDF report...', { duration: 1500 });
    
    setTimeout(() => {
      toast.dismiss();
      toast.success('Audit trail exported to PDF');
      // In a real app, this would generate and download a PDF
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Trail</h2>
          <p className="text-gray-500 mt-1">Complete system activity log</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleExportPDF}>
          <Download className="w-4 h-4" />
          Export PDF
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-card p-4 flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by officer, entity, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <select 
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ubi-blue"
        >
          {uniqueActions.map(action => (
            <option key={action} value={action}>{action}</option>
          ))}
        </select>

        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          Date Range
        </Button>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Timestamp</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Officer</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Action Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Entity</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Description</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => {
                const ActionIcon = actionIcons[entry.action] || FileText;
                return (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className={cn(
                      "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    )}
                  >
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                      {entry.timestamp}
                    </td>
                    <td className="px-4 py-3 font-medium">{entry.officer}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                        actionColors[entry.action] || 'bg-gray-100 text-gray-600'
                      )}>
                        <ActionIcon className="w-3.5 h-3.5" />
                        {entry.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-ubi-blue">{entry.entity}</td>
                    <td className="px-4 py-3 text-gray-600">{entry.description}</td>
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs">{entry.ip}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredData.length} of {auditTrailData.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-ubi-navy text-white hover:bg-ubi-navy/90">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
