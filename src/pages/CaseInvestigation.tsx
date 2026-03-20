import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Check, FileText, User, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { RiskBadge } from '@/components/ui-custom/RiskBadge';
import { ChannelBadge } from '@/components/ui-custom/ChannelBadge';
import { caseData, caseTimeline, evidenceChecklist, officers } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CaseInvestigationProps {
  navigateTo?: (page: string, params?: Record<string, unknown>) => void;
}

export function CaseInvestigation({ navigateTo }: CaseInvestigationProps) {
  const [status, setStatus] = useState(caseData.status);
  const [assignedOfficer, setAssignedOfficer] = useState(caseData.assignedOfficer);
  const [notes, setNotes] = useState('');
  const [isGeneratingSTR, setIsGeneratingSTR] = useState(false);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  const handleFormatText = (format: 'bold' | 'italic' | 'underline') => {
    const textarea = notesRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = notes.substring(start, end);
    
    if (!selectedText) {
      toast.info('Please select text to format');
      return;
    }

    let formattedText = selectedText;
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
    }

    const newNotes = notes.substring(0, start) + formattedText + notes.substring(end);
    setNotes(newNotes);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + formattedText.length);
    }, 0);

    toast.success(`${format.charAt(0).toUpperCase() + format.slice(1)} formatting applied`);
  };

  const handleGenerateSTR = () => {
    // Validation checks
    const evidenceComplete = evidenceChecklist.every(item => item.checked);
    const hasAssignedOfficer = assignedOfficer !== '';

    if (!evidenceComplete) {
      toast.error('Please complete all evidence checklist items before generating STR');
      return;
    }

    if (!hasAssignedOfficer) {
      toast.error('Please assign an officer before generating STR');
      return;
    }

    setIsGeneratingSTR(true);
    toast.loading('Generating STR report... Please wait', { duration: 2000 });

    setTimeout(() => {
      setIsGeneratingSTR(false);
      toast.dismiss();
      toast.success('STR report generation started');
      
      if (navigateTo) {
        navigateTo('str-generator', { caseData });
      }
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-6"
    >
      {/* Top Banner */}
      <div className="bg-ubi-navy rounded-lg p-5 text-white">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-ubi-red" />
                <span className="font-mono text-lg">{caseData.id}</span>
              </div>
              <div className="h-5 w-px bg-white/20" />
              <div className="flex items-center gap-2 text-white/70">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Opened {caseData.opened}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold">{caseData.riskScore}</span>
              <div>
                <span className="text-white/60 text-sm">/ 100</span>
                <RiskBadge level="critical" className="ml-2">CRITICAL</RiskBadge>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 max-w-md justify-end">
            {caseData.patterns.map((pattern) => (
              <span 
                key={pattern}
                className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20"
              >
                {pattern}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Fund Journey Timeline */}
        <div className="bg-white rounded-lg shadow-card">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Fund Journey Timeline</h3>
            <p className="text-sm text-gray-500 mt-0.5">Step-by-step transaction flow</p>
          </div>
          
          <div className="p-5">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
              
              {/* Timeline Items */}
              <div className="space-y-6">
                {caseTimeline.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "relative flex gap-4",
                      item.highlight && "animate-pulse rounded-lg p-2 -m-2 bg-red-50 border border-red-200"
                    )}
                  >
                    {/* Step Number */}
                    <div className={cn(
                      "relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0",
                      item.highlight ? "bg-red-600" : "bg-ubi-navy"
                    )}>
                      {item.step}
                    </div>
                    
                    {/* Content Card */}
                    <div className={cn(
                      "flex-1 bg-gray-50 rounded-lg p-4",
                      item.highlight && "border-2 border-dashed border-red-400 bg-red-50"
                    )}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="font-mono text-ubi-blue font-medium">{item.account}</span>
                          <span className="mx-2 text-gray-400">|</span>
                          <span className="font-bold text-gray-900">{item.amount}</span>
                        </div>
                        <ChannelBadge channel={item.channel} />
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-500">{item.time}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium",
                          item.highlight ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-600"
                        )}>
                          {item.signal}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Case Management Panel */}
        <div className="space-y-6">
          {/* Notes Area */}
          <div className="bg-white rounded-lg shadow-card p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Investigation Notes</h3>
            <Textarea
              ref={notesRef}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter investigation notes..."
              className="min-h-[120px] resize-none font-mono text-sm"
            />
            <div className="flex items-center gap-2 mt-3">
              <button 
                onClick={() => handleFormatText('bold')}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 font-bold transition-colors"
                title="Bold"
              >
                B
              </button>
              <button 
                onClick={() => handleFormatText('italic')}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 italic transition-colors"
                title="Italic"
              >
                I
              </button>
              <button 
                onClick={() => handleFormatText('underline')}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 underline transition-colors"
                title="Underline"
              >
                U
              </button>
            </div>
          </div>

          {/* Status & Assignment */}
          <div className="bg-white rounded-lg shadow-card p-5 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Case Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Escalated">Escalated</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Assign to Officer</label>
              <Select value={assignedOfficer} onValueChange={setAssignedOfficer}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {officers.map((officer) => (
                    <SelectItem key={officer.id} value={officer.name}>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {officer.name} — {officer.role}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Evidence Checklist */}
          <div className="bg-white rounded-lg shadow-card p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Evidence Checklist</h3>
            <div className="space-y-3">
              {evidenceChecklist.map((item) => (
                <label 
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className={cn(
                    "w-5 h-5 rounded flex items-center justify-center",
                    item.checked ? "bg-green-500" : "border-2 border-gray-300"
                  )}>
                    {item.checked && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={cn(
                    "text-sm",
                    item.checked ? "text-gray-700" : "text-gray-500"
                  )}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generate STR Button */}
      <div className="flex justify-center pt-4">
        <Button 
          size="lg"
          onClick={handleGenerateSTR}
          disabled={isGeneratingSTR}
          className="bg-ubi-gold hover:bg-ubi-gold/90 text-white px-8 py-6 text-lg font-semibold animate-pulse"
        >
          {isGeneratingSTR ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Generate STR Report
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
