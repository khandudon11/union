import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Settings, Users, Edit2, UserX, Plus, X, Save, Loader2 } from 'lucide-react';
import { rulesEngine, users } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface Rule {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  threshold?: number;
  thresholdMin?: number;
  thresholdMax?: number;
}

export function Admin() {
  const [rules, setRules] = useState<Rule[]>(rulesEngine as Rule[]);
  const [activeTab, setActiveTab] = useState('rules');
  const [showAddRuleDialog, setShowAddRuleDialog] = useState(false);
  const [savingThreshold, setSavingThreshold] = useState<number | null>(null);
  
  // New rule form state
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    threshold: 500000,
    enabled: true,
  });

  const toggleRule = (ruleId: number) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
    toast.success(`Rule ${rules.find(r => r.id === ruleId)?.enabled ? 'disabled' : 'enabled'}`);
  };

  // Debounced threshold update
  const updateThreshold = useCallback((ruleId: number, value: number) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, threshold: value } : rule
    ));
    
    setSavingThreshold(ruleId);
    
    // Simulate auto-save after 500ms
    setTimeout(() => {
      setSavingThreshold(null);
      toast.success('Threshold updated', { duration: 1500 });
    }, 500);
  }, []);

  const handleAddRule = () => {
    if (!newRule.name || !newRule.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newRuleObj: Rule = {
      id: Math.max(...rules.map(r => r.id)) + 1,
      name: newRule.name,
      description: newRule.description,
      enabled: newRule.enabled,
      threshold: newRule.threshold,
    };

    setRules(prev => [...prev, newRuleObj]);
    setShowAddRuleDialog(false);
    setNewRule({ name: '', description: '', threshold: 500000, enabled: true });
    toast.success(`Rule '${newRule.name}' created successfully`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      {/* Add New Rule Dialog */}
      <Dialog open={showAddRuleDialog} onOpenChange={setShowAddRuleDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-ubi-blue" />
              Create Detection Rule
            </DialogTitle>
            <DialogDescription>
              Configure a new fraud detection rule
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Rule Name *</label>
              <Input
                value={newRule.name}
                onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., High Velocity Alert"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Description *</label>
              <Textarea
                value={newRule.description}
                onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the detection logic..."
                className="min-h-[80px]"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Threshold: ₹{newRule.threshold.toLocaleString()}
              </label>
              <Slider
                value={[newRule.threshold]}
                onValueChange={(value) => setNewRule(prev => ({ ...prev, threshold: value[0] }))}
                max={10000000}
                step={100000}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Enabled</label>
              <Switch
                checked={newRule.enabled}
                onCheckedChange={(checked) => setNewRule(prev => ({ ...prev, enabled: checked }))}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRuleDialog(false)}>
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button onClick={handleAddRule} className="bg-ubi-blue hover:bg-ubi-blue-dark">
              <Save className="w-4 h-4 mr-1" />
              Create Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1">
          <TabsTrigger 
            value="rules" 
            className="data-[state=active]:bg-ubi-navy data-[state=active]:text-white gap-2"
          >
            <Settings className="w-4 h-4" />
            Rules Engine
          </TabsTrigger>
          <TabsTrigger 
            value="users"
            className="data-[state=active]:bg-ubi-navy data-[state=active]:text-white gap-2"
          >
            <Users className="w-4 h-4" />
            User Management
          </TabsTrigger>
        </TabsList>

        {/* Rules Engine Tab */}
        <TabsContent value="rules" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Rules Engine</h2>
              <p className="text-gray-500">Configure detection rules and thresholds</p>
            </div>
            <Button 
              onClick={() => setShowAddRuleDialog(true)}
              className="bg-ubi-blue hover:bg-ubi-blue-dark gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Rule
            </Button>
          </div>

          <div className="grid gap-4">
            {rules.map((rule) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "bg-white rounded-lg shadow-card p-5 border-l-4",
                  rule.enabled ? "border-green-500" : "border-gray-300"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        rule.enabled 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-500"
                      )}>
                        {rule.enabled ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{rule.description}</p>
                  </div>
                  
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                </div>

                {rule.enabled && rule.threshold !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">Threshold:</span>
                      <div className="flex-1 max-w-xs">
                        <Slider
                          value={[rule.threshold]}
                          onValueChange={(value) => updateThreshold(rule.id, value[0])}
                          max={1000000}
                          step={50000}
                        />
                      </div>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <span className="text-sm font-medium text-ubi-navy">
                          ₹{(rule.threshold).toLocaleString()}
                        </span>
                        {savingThreshold === rule.id && (
                          <Loader2 className="w-4 h-4 animate-spin text-ubi-blue" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">User Management</h2>
              <p className="text-gray-500">Manage system users and permissions</p>
            </div>
            <Button className="bg-ubi-blue hover:bg-ubi-blue-dark gap-2">
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Role</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Branch</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Last Login</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-ubi-navy/10 rounded-full flex items-center justify-center">
                          <span className="text-ubi-navy text-xs font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full font-medium",
                        user.role.includes('Senior') && "bg-ubi-gold/10 text-ubi-gold",
                        user.role.includes('Manager') && "bg-ubi-navy/10 text-ubi-navy",
                        user.role.includes('Analyst') && "bg-purple-100 text-purple-700",
                        user.role.includes('Officer') && "bg-blue-100 text-blue-700",
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.branch}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full font-medium",
                        user.status === 'Active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      )}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{user.lastLogin}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-ubi-navy hover:bg-ubi-navy/10 rounded transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
