import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Calendar, TrendingUp, ChevronDown, Loader2 } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { alertVolumeData, fraudPatternData, channelRiskData, topRiskBranches } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const dateRangeOptions = [
  { label: 'Last 7 Days', value: '7days', days: 7 },
  { label: 'Last 30 Days', value: '30days', days: 30 },
  { label: 'Last 90 Days', value: '90days', days: 90 },
  { label: 'Custom Range', value: 'custom' },
];

export function Analytics() {
  const [selectedRange, setSelectedRange] = useState('30days');
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(alertVolumeData);

  const handleDateRangeChange = async (range: string, label: string) => {
    setSelectedRange(range);
    setIsLoading(true);
    
    toast.loading(`Updating analytics for ${label}...`, { duration: 1000 });
    
    // Simulate data fetching
    setTimeout(() => {
      // Filter data based on selected range
      const days = dateRangeOptions.find(o => o.value === range)?.days || 30;
      const filteredData = alertVolumeData.slice(-days / 2); // Simplified filtering
      
      setChartData(filteredData.length > 0 ? filteredData : alertVolumeData);
      setIsLoading(false);
      toast.dismiss();
      toast.success(`Analytics updated for ${label}`);
    }, 1000);
  };

  const selectedLabel = dateRangeOptions.find(o => o.value === selectedRange)?.label || 'Last 30 Days';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Intelligence</h2>
          <p className="text-gray-500 mt-1">Comprehensive fraud detection insights</p>
        </div>
        
        {/* Date Range Dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              {selectedLabel}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="space-y-1">
              {dateRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleDateRangeChange(option.value, option.label)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    selectedRange === option.value 
                      ? "bg-ubi-blue text-white" 
                      : "hover:bg-gray-100"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-ubi-blue" />
            <span className="text-gray-700">Updating charts...</span>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Alert Volume Chart */}
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Alert Volume — {selectedLabel}</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="highRisk" 
                  name="High Risk"
                  stroke="#DC2626" 
                  strokeWidth={2}
                  dot={{ fill: '#DC2626', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mediumRisk" 
                  name="Medium Risk"
                  stroke="#D97706" 
                  strokeWidth={2}
                  dot={{ fill: '#D97706', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fraud Pattern Distribution */}
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Fraud Pattern Distribution</h3>
          </div>
          <div className="h-72 flex items-center">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={fraudPatternData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {fraudPatternData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-40 space-y-2">
              {fraudPatternData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Channel Risk Concentration */}
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Channel Risk Concentration</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelRiskData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="channel"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  width={60}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar 
                  dataKey="risk" 
                  name="Risk Score"
                  fill="#0072BC"
                  radius={[0, 4, 4, 0]}
                >
                  {channelRiskData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.risk >= 80 ? '#DC2626' : entry.risk >= 60 ? '#EA580C' : entry.risk >= 40 ? '#D97706' : '#16A34A'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Risk Branches */}
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Top 10 High-Risk Branches</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Rank</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Branch</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">City</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Alerts</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Funds</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Score</th>
                </tr>
              </thead>
              <tbody>
                {topRiskBranches.map((branch) => (
                  <tr 
                    key={branch.rank}
                    className={cn(
                      "border-b border-gray-100",
                      branch.rank === 1 && "bg-red-50"
                    )}
                  >
                    <td className="px-3 py-2">
                      <span className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                        branch.rank === 1 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"
                      )}>
                        {branch.rank}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-medium">{branch.name}</td>
                    <td className="px-3 py-2 text-gray-600">{branch.city}</td>
                    <td className="px-3 py-2">{branch.alerts}</td>
                    <td className="px-3 py-2 font-medium">{branch.funds}</td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "text-sm font-medium",
                        branch.score >= 80 ? 'text-red-600' : 
                        branch.score >= 60 ? 'text-orange-600' : 'text-gray-600'
                      )}>
                        {branch.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
