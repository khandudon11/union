import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Search, Calendar, Download, UserX, ArrowUpRight, ChevronDown, ChevronUp, User, Loader2 } from 'lucide-react';
import { RiskBadge } from '@/components/ui-custom/RiskBadge';
import { ChannelBadge } from '@/components/ui-custom/ChannelBadge';
import { alertManagementData } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AlertManagementProps {
  preSelectedAlert?: string;
}

export function AlertManagement({ preSelectedAlert }: AlertManagementProps) {
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>(preSelectedAlert ? [preSelectedAlert] : []);
  const [expandedRow, setExpandedRow] = useState<string | null>(preSelectedAlert || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // Bulk action dialogs
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showDismissDialog, setShowDismissDialog] = useState(false);
  const [showEscalateDialog, setShowEscalateDialog] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState('');
  const [escalationLevel, setEscalationLevel] = useState('');
  const [dismissalReason, setDismissalReason] = useState('');

  const toggleAlertSelection = (alertId: string) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const toggleAllSelection = () => {
    if (selectedAlerts.length === alertManagementData.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(alertManagementData.map(a => a.id));
    }
  };

  const filteredAlerts = useMemo(() => {
    return alertManagementData.filter(alert => 
      alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.pattern.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleDateRangeSelect = (preset: string) => {
    const today = new Date();
    let from: Date;
    
    switch (preset) {
      case '7days':
        from = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30days':
        from = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90days':
        from = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        from = today;
    }
    
    setShowDatePicker(false);
    toast.success(`Showing alerts from ${from.toLocaleDateString('en-IN')} to ${today.toLocaleDateString('en-IN')}`);
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    toast.loading('Exporting alerts to CSV...', { duration: 1500 });
    
    setTimeout(() => {
      // Generate CSV content
      const headers = ['Alert ID', 'Account', 'Pattern', 'Risk', 'Amount', 'Branch', 'Channel', 'Time Since', 'SLA Status', 'Assigned'];
      const rows = filteredAlerts.map(alert => [
        alert.id,
        alert.account,
        alert.pattern,
        alert.risk,
        alert.amount,
        alert.branch,
        alert.channel,
        alert.timeSince,
        alert.sla,
        alert.assigned
      ]);
      
      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `alerts_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      setIsExporting(false);
      toast.dismiss();
      toast.success('Alert data exported successfully');
    }, 1500);
  };

  const handleAssignSelected = () => {
    if (!selectedOfficer) {
      toast.error('Please select an officer');
      return;
    }
    
    toast.success(`${selectedAlerts.length} alerts assigned to ${selectedOfficer}`);
    setShowAssignDialog(false);
    setSelectedAlerts([]);
    setSelectedOfficer('');
  };

  const handleDismissSelected = () => {
    if (!dismissalReason) {
      toast.error('Please provide a dismissal reason');
      return;
    }
    
    toast.success(`${selectedAlerts.length} alerts dismissed`);
    setShowDismissDialog(false);
    setSelectedAlerts([]);
    setDismissalReason('');
  };

  const handleEscalateSelected = () => {
    if (!escalationLevel) {
      toast.error('Please select an escalation level');
      return;
    }
    
    toast.success(`${selectedAlerts.length} alerts escalated to ${escalationLevel}`);
    setShowEscalateDialog(false);
    setSelectedAlerts([]);
    setEscalationLevel('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-4"
    >
      {/* Assign Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign to Officer</DialogTitle>
            <DialogDescription>
              Select an officer to assign {selectedAlerts.length} alert(s)
            </DialogDescription>
          </DialogHeader>
          <Select value={selectedOfficer} onValueChange={setSelectedOfficer}>
            <SelectTrigger>
              <SelectValue placeholder="Select officer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Vikram Malhotra">Vikram Malhotra - Senior AML Officer</SelectItem>
              <SelectItem value="Meera Joshi">Meera Joshi - AML Analyst</SelectItem>
              <SelectItem value="Rahul Sharma">Rahul Sharma - Investigation Officer</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>Cancel</Button>
            <Button onClick={handleAssignSelected} className="bg-ubi-blue">Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dismiss Dialog */}
      <Dialog open={showDismissDialog} onOpenChange={setShowDismissDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dismiss Alerts</DialogTitle>
            <DialogDescription>
              Are you sure? This will close {selectedAlerts.length} alert(s).
            </DialogDescription>
          </DialogHeader>
          <textarea
            value={dismissalReason}
            onChange={(e) => setDismissalReason(e.target.value)}
            placeholder="Enter dismissal reason..."
            className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDismissDialog(false)}>Cancel</Button>
            <Button onClick={handleDismissSelected} variant="destructive">Dismiss</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Escalate Dialog */}
      <Dialog open={showEscalateDialog} onOpenChange={setShowEscalateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escalate Alerts</DialogTitle>
            <DialogDescription>
              Select escalation level for {selectedAlerts.length} alert(s)
            </DialogDescription>
          </DialogHeader>
          <Select value={escalationLevel} onValueChange={setEscalationLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Level 2">Level 2 - Senior Review</SelectItem>
              <SelectItem value="Level 3">Level 3 - Management</SelectItem>
              <SelectItem value="Level 4">Level 4 - Executive</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEscalateDialog(false)}>Cancel</Button>
            <Button onClick={handleEscalateSelected} className="bg-ubi-red">Escalate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-card p-4 flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ubi-blue">
          <option>All Risk Levels</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ubi-blue">
          <option>All Patterns</option>
          <option>Circular Flow</option>
          <option>Layering</option>
          <option>Structuring</option>
          <option>Dormant Activation</option>
        </select>

        <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ubi-blue">
          <option>All Branches</option>
          <option>Bhopal Main</option>
          <option>Mumbai Fort</option>
          <option>Delhi Connaught</option>
        </select>

        {/* Date Range Popover */}
        <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="space-y-2">
              <p className="text-sm font-medium">Select Range</p>
              <Button variant="ghost" className="w-full justify-start" onClick={() => handleDateRangeSelect('7days')}>
                Last 7 Days
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => handleDateRangeSelect('30days')}>
                Last 30 Days
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => handleDateRangeSelect('90days')}>
                Last 90 Days
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => handleDateRangeSelect('custom')}>
                Custom Range
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Button 
          variant="outline" 
          className="gap-2 ml-auto"
          onClick={handleExportCSV}
          disabled={isExporting}
        >
          {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Export CSV
        </Button>
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-ubi-navy text-white rounded-lg p-3 flex items-center justify-between"
          >
            <span className="text-sm">
              {selectedAlerts.length} alert{selectedAlerts.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowAssignDialog(true)}
                className="text-white hover:text-white hover:bg-white/10 gap-2"
              >
                <User className="w-4 h-4" />
                Assign Selected
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowDismissDialog(true)}
                className="text-white hover:text-white hover:bg-white/10 gap-2"
              >
                <UserX className="w-4 h-4" />
                Dismiss Selected
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowEscalateDialog(true)}
                className="text-white hover:text-white hover:bg-white/10 gap-2"
              >
                <ArrowUpRight className="w-4 h-4" />
                Escalate Selected
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alerts Table */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <Checkbox 
                    checked={selectedAlerts.length === alertManagementData.length && alertManagementData.length > 0}
                    onCheckedChange={toggleAllSelection}
                  />
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Alert ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Account</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Pattern</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Risk Score</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Branch</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Channel</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Time Since</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">SLA Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Assigned</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alert, index) => (
                <>
                  <tr 
                    key={alert.id}
                    className={cn(
                      "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30",
                      preSelectedAlert === alert.id && "bg-ubi-red/5 border-l-2 border-l-ubi-red"
                    )}
                  >
                    <td className="px-4 py-3">
                      <Checkbox 
                        checked={selectedAlerts.includes(alert.id)}
                        onCheckedChange={() => toggleAlertSelection(alert.id)}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-ubi-blue font-medium">{alert.id}</td>
                    <td className="px-4 py-3 font-mono">{alert.account}</td>
                    <td className="px-4 py-3">{alert.pattern}</td>
                    <td className="px-4 py-3">
                      <RiskBadge level={alert.risk as 'critical' | 'high' | 'medium' | 'low'} />
                    </td>
                    <td className="px-4 py-3 font-medium">{alert.amount}</td>
                    <td className="px-4 py-3 text-gray-600">{alert.branch}</td>
                    <td className="px-4 py-3">
                      <ChannelBadge channel={alert.channel} />
                    </td>
                    <td className="px-4 py-3 text-gray-500">{alert.timeSince}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        alert.sla === 'Within SLA' 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      )}>
                        {alert.sla}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{alert.assigned}</td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => setExpandedRow(expandedRow === alert.id ? null : alert.id)}
                        className="text-ubi-blue hover:text-ubi-blue-dark font-medium text-sm flex items-center gap-1"
                      >
                        {expandedRow === alert.id ? (
                          <>Less <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>More <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Row */}
                  <AnimatePresence>
                    {expandedRow === alert.id && (
                      <motion.tr
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50"
                      >
                        <td colSpan={12} className="px-4 py-4">
                          <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-ubi-navy text-white text-xs flex items-center justify-center">1</span>
                              <span className="text-sm text-gray-600">Alert Generated</span>
                            </div>
                            <div className="w-8 h-0.5 bg-gray-300" />
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-ubi-gold text-white text-xs flex items-center justify-center">2</span>
                              <span className="text-sm text-gray-600">Under Review</span>
                            </div>
                            <div className="w-8 h-0.5 bg-gray-300" />
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 text-xs flex items-center justify-center">3</span>
                              <span className="text-sm text-gray-400">Investigation</span>
                            </div>
                            <div className="w-8 h-0.5 bg-gray-300" />
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 text-xs flex items-center justify-center">4</span>
                              <span className="text-sm text-gray-400">Resolution</span>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
