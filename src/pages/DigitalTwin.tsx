import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Play, ChevronDown, Lightbulb, Loader2, Check } from 'lucide-react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { digitalTwinCases, simulationOutcomes, learnings } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const actualNodes = [
  { id: 'ACC-A001', position: { x: 50, y: 100 }, data: { label: 'ACC-A001' }, style: { background: '#16A34A', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' } },
  { id: 'ACC-4821', position: { x: 200, y: 100 }, data: { label: 'ACC-4821' }, style: { background: '#DC2626', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)' } },
  { id: 'ACC-7734', position: { x: 350, y: 50 }, data: { label: 'ACC-7734' }, style: { background: '#EA580C', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' } },
  { id: 'ACC-2291', position: { x: 350, y: 150 }, data: { label: 'ACC-2291' }, style: { background: '#DC2626', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' } },
  { id: 'ACC-9903', position: { x: 500, y: 100 }, data: { label: 'ACC-9903' }, style: { background: '#EA580C', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' } },
  { id: 'ACC-CASH', position: { x: 650, y: 100 }, data: { label: 'ACC-CASH' }, style: { background: '#7C2D12', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' } },
];

const actualEdges = [
  { id: 'e1', source: 'ACC-A001', target: 'ACC-4821', style: { stroke: '#3B82F6', strokeWidth: 3 } },
  { id: 'e2', source: 'ACC-4821', target: 'ACC-7734', style: { stroke: '#F97316', strokeWidth: 2 } },
  { id: 'e3', source: 'ACC-4821', target: 'ACC-2291', style: { stroke: '#8B5CF6', strokeWidth: 3 } },
  { id: 'e4', source: 'ACC-7734', target: 'ACC-9903', style: { stroke: '#3B82F6', strokeWidth: 2 } },
  { id: 'e5', source: 'ACC-2291', target: 'ACC-9903', style: { stroke: '#F97316', strokeWidth: 3 } },
  { id: 'e6', source: 'ACC-9903', target: 'ACC-CASH', style: { stroke: '#6B7280', strokeWidth: 4 } },
  { id: 'e7', source: 'ACC-CASH', target: 'ACC-4821', style: { stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '5,5' } },
];

const simulatedNodesBase = [
  { id: 'ACC-A001', position: { x: 50, y: 100 }, data: { label: 'ACC-A001' }, style: { background: '#16A34A', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' } },
  { id: 'ACC-4821', position: { x: 200, y: 100 }, data: { label: 'ACC-4821' }, style: { background: '#DC2626', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)' } },
];

const simulatedNodesFull = [
  ...simulatedNodesBase,
  { id: 'ACC-7734', position: { x: 350, y: 50 }, data: { label: 'ACC-7734' }, style: { background: '#9CA3AF', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', border: '2px dashed #9CA3AF', opacity: 0.5 } },
  { id: 'ACC-2291', position: { x: 350, y: 150 }, data: { label: 'ACC-2291' }, style: { background: '#9CA3AF', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', border: '2px dashed #9CA3AF', opacity: 0.5 } },
  { id: 'ACC-9903', position: { x: 500, y: 100 }, data: { label: 'ACC-9903' }, style: { background: '#9CA3AF', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', border: '2px dashed #9CA3AF', opacity: 0.5 } },
  { id: 'ACC-CASH', position: { x: 650, y: 100 }, data: { label: 'ACC-CASH' }, style: { background: '#9CA3AF', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', border: '2px dashed #9CA3AF', opacity: 0.5 } },
];

const simulatedEdges = [
  { id: 'e1', source: 'ACC-A001', target: 'ACC-4821', style: { stroke: '#16A34A', strokeWidth: 4 } },
];

export function DigitalTwin() {
  const [selectedCase, setSelectedCase] = useState(digitalTwinCases[0].id);
  const [interventionPoint, setInterventionPoint] = useState<'none' | 'day1' | 'day2' | 'day3'>('day1');
  const [isLoadingCase, setIsLoadingCase] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [showSimulatedResults, setShowSimulatedResults] = useState(false);
  const [currentSimulatedNodes, setCurrentSimulatedNodes] = useState(simulatedNodesFull);
  const [showProgressDialog, setShowProgressDialog] = useState(false);

  const handleLoadCase = () => {
    setIsLoadingCase(true);
    toast.loading('Loading case data...', { duration: 1500 });
    
    setTimeout(() => {
      setIsLoadingCase(false);
      toast.dismiss();
      toast.success(`Case ${selectedCase} loaded successfully`);
      setShowSimulatedResults(false);
    }, 1500);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setShowProgressDialog(true);
    setSimulationProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      setIsSimulating(false);
      setShowProgressDialog(false);
      setShowSimulatedResults(true);
      
      // Update simulated nodes based on intervention point
      if (interventionPoint === 'day1') {
        setCurrentSimulatedNodes(simulatedNodesBase);
      } else {
        setCurrentSimulatedNodes(simulatedNodesFull);
      }
      
      toast.success(`Simulation complete - Review ${interventionPoint === 'none' ? 'No' : interventionPoint.replace('day', 'Day ')} results`);
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-6"
    >
      {/* Progress Dialog */}
      <Dialog open={showProgressDialog} onOpenChange={setShowProgressDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-ubi-blue" />
              Running What-If Simulation
            </DialogTitle>
            <DialogDescription>
              Calculating outcome if intervention happened at {interventionPoint === 'none' ? 'no intervention' : interventionPoint.replace('day', 'Day ')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className="bg-ubi-blue h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${simulationProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <p className="text-sm text-gray-500 text-center">{simulationProgress}% complete</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Digital Twin Simulation</h2>
        <p className="text-gray-500 mt-1">Retrospective What-If Analysis</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-card p-4 flex items-center gap-6 flex-wrap">
        {/* Case Selector */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Case:</label>
          <div className="relative">
            <select 
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ubi-blue min-w-[280px]"
            >
              {digitalTwinCases.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <Button 
          variant="outline" 
          onClick={handleLoadCase}
          disabled={isLoadingCase}
          className="border-ubi-navy text-ubi-navy hover:bg-ubi-navy hover:text-white"
        >
          {isLoadingCase ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            'Load Case'
          )}
        </Button>

        <div className="h-8 w-px bg-gray-200" />

        {/* Intervention Point */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Intervention Point:</label>
          <div className="flex items-center gap-2">
            {(['none', 'day1', 'day2', 'day3'] as const).map((point) => (
              <label key={point} className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="intervention"
                  value={point}
                  checked={interventionPoint === point}
                  onChange={() => setInterventionPoint(point)}
                  className="w-4 h-4 text-ubi-blue focus:ring-ubi-blue"
                />
                <span className="text-sm text-gray-700">
                  {point === 'none' ? 'No Intervention' : `Day ${point.replace('day', '')}`}
                </span>
              </label>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="bg-ubi-red hover:bg-ubi-red-dark text-white gap-2 ml-auto"
        >
          {isSimulating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Simulating...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run Simulation
            </>
          )}
        </Button>
      </div>

      {/* Graphs Comparison */}
      <div className="grid grid-cols-2 gap-6">
        {/* Actual Outcome */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="bg-red-600 text-white px-4 py-2 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full" />
            ACTUAL OUTCOME
          </div>
          <div className="h-64">
            <ReactFlow
              nodes={actualNodes}
              edges={actualEdges}
              fitView
              nodesDraggable={false}
              nodesConnectable={false}
              panOnDrag={false}
              zoomOnScroll={false}
            >
              <Background color="#e5e7eb" gap={20} size={1} />
            </ReactFlow>
          </div>
          
          {/* Outcome Metrics */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase">Funds Lost</p>
              <p className="text-lg font-bold text-red-600">{simulationOutcomes.actual.fundsLost}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase">Accounts Involved</p>
              <p className="text-lg font-bold text-gray-900">{simulationOutcomes.actual.accountsInvolved}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase">Detection Day</p>
              <p className="text-lg font-bold text-gray-900">{simulationOutcomes.actual.detectionDay}</p>
            </div>
          </div>
        </div>

        {/* Simulated Outcome */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="bg-green-600 text-white px-4 py-2 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full" />
            SIMULATED — {interventionPoint === 'none' ? 'No Intervention' : interventionPoint.replace('day', 'Day ')} Intervention
          </div>
          <div className="h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={showSimulatedResults ? 'results' : 'empty'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <ReactFlow
                  nodes={showSimulatedResults ? currentSimulatedNodes : actualNodes}
                  edges={showSimulatedResults ? simulatedEdges : actualEdges}
                  fitView
                  nodesDraggable={false}
                  nodesConnectable={false}
                  panOnDrag={false}
                  zoomOnScroll={false}
                >
                  <Background color="#e5e7eb" gap={20} size={1} />
                </ReactFlow>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Outcome Metrics */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase">
                {showSimulatedResults && interventionPoint !== 'none' ? 'Funds Recoverable' : 'Funds Lost'}
              </p>
              <p className={cn(
                "text-lg font-bold",
                showSimulatedResults && interventionPoint !== 'none' ? 'text-green-600' : 'text-red-600'
              )}>
                {showSimulatedResults && interventionPoint !== 'none' 
                  ? simulationOutcomes.simulated.fundsRecoverable 
                  : simulationOutcomes.actual.fundsLost}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase">
                {showSimulatedResults && interventionPoint !== 'none' ? 'Accounts Blocked' : 'Accounts Involved'}
              </p>
              <p className="text-lg font-bold text-gray-900">
                {showSimulatedResults && interventionPoint !== 'none' 
                  ? simulationOutcomes.simulated.accountsBlocked 
                  : simulationOutcomes.actual.accountsInvolved}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase">Detection Day</p>
              <p className="text-lg font-bold text-gray-900">
                {showSimulatedResults && interventionPoint !== 'none' 
                  ? simulationOutcomes.simulated.detectionDay 
                  : simulationOutcomes.actual.detectionDay}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Learnings Panel */}
      <AnimatePresence>
        {showSimulatedResults && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 rounded-lg p-5 border border-blue-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-ubi-blue" />
              <h3 className="font-semibold text-gray-900">AI-Generated Insights</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {learnings.map((learning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-4 shadow-sm border border-blue-100 flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{learning}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
