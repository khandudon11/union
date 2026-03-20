import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Check, Download, Send, Sparkles, Edit3, Shield, FileText, X, Save } from 'lucide-react';
import jsPDF from 'jspdf';
import { strReportData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const steps = [
  { id: 1, label: 'Evidence Assembly' },
  { id: 2, label: 'Narrative Draft' },
  { id: 3, label: 'FIU Mapping' },
  { id: 4, label: 'Pack Ready' },
];

function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 20);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-blink">|</span>
      )}
    </span>
  );
}

interface STRGeneratorProps {
  caseData?: Record<string, unknown>;
}

export function STRGenerator(_props: STRGeneratorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [narrativeComplete, setNarrativeComplete] = useState(false);
  const [showSections, setShowSections] = useState<boolean[]>([false, false, false, false]);
  const [isEditingNarrative, setIsEditingNarrative] = useState(false);
  const [editedNarrative, setEditedNarrative] = useState(strReportData.narrative);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const narrativeRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    if (currentStep >= 2) {
      showSections.forEach((_, index) => {
        setTimeout(() => {
          setShowSections(prev => {
            const newSections = [...prev];
            newSections[index] = true;
            return newSections;
          });
        }, index * 400);
      });
    }
  }, [currentStep]);

  const handleDownloadPDF = async () => {
    toast.loading('Preparing STR evidence package...', { duration: 2000 });
    
    setTimeout(() => {
      const doc = new jsPDF();
      
      // Header
      doc.setFillColor(227, 24, 55);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text('Union Bank of India - STR Report', 15, 18);
      
      // Content
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text(`Subject Account: ${strReportData.subjectAccount}`, 15, 45);
      doc.text(`Risk Score: ${strReportData.riskScore}`, 15, 55);
      doc.text(`Reporting Period: ${strReportData.reportingPeriod}`, 15, 65);
      doc.text(`Funds Under Investigation: ${strReportData.fundsUnderInvestigation}`, 15, 75);
      
      // Narrative
      doc.setFontSize(11);
      doc.text('Investigation Narrative:', 15, 90);
      const splitNarrative = doc.splitTextToSize(editedNarrative, 180);
      doc.text(splitNarrative, 15, 100);
      
      // Footer
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 15, 280);
      doc.text('FIU-IND Compliant - Confidential', 15, 287);
      
      doc.save(`STR_ACC-4821_${new Date().getFullYear()}.pdf`);
      
      toast.dismiss();
      toast.success('STR evidence package downloaded successfully');
    }, 2000);
  };

  const handleSubmitFIU = async () => {
    setShowSubmitConfirm(true);
  };

  const confirmSubmitFIU = async () => {
    setShowSubmitConfirm(false);
    setIsSubmitting(true);
    
    toast.loading('Submitting to FIU-IND portal...', { duration: 3000 });
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.dismiss();
      toast.success(`Report successfully submitted to FIU on ${new Date().toLocaleString('en-IN')}`);
    }, 3000);
  };

  const handleEditNarrative = () => {
    setIsEditingNarrative(true);
    setTimeout(() => {
      narrativeRef.current?.focus();
    }, 100);
  };

  const handleSaveNarrative = () => {
    setIsEditingNarrative(false);
    toast.success('Narrative updated - Audit logged');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitConfirm} onOpenChange={setShowSubmitConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-ubi-blue" />
              Submit to FIU-IND
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this report to FIU-IND? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitConfirm(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmSubmitFIU}
              className="bg-ubi-blue hover:bg-ubi-blue-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">STR Evidence Pack Generator</h2>
        <p className="text-gray-500 mt-1 flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-ubi-blue" />
          FIU-IND Compliant — Auto-Assembly Pipeline
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: index < currentStep ? 1 : 0.9,
                    opacity: 1 
                  }}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                    index < currentStep 
                      ? "bg-ubi-red border-ubi-red text-white" 
                      : index === currentStep
                        ? "bg-white border-ubi-red text-ubi-red"
                        : "bg-white border-gray-200 text-gray-400"
                  )}
                >
                  {index < currentStep ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </motion.div>
                <span className={cn(
                  "text-xs mt-2 font-medium transition-colors",
                  index < currentStep ? "text-ubi-red" : "text-gray-400"
                )}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-2 transition-all duration-500",
                  index < currentStep - 1 ? "bg-ubi-red" : "bg-gray-200"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Document Preview */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-ubi-navy px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-ubi-red/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-ubi-red" />
            </div>
            <div>
              <h3 className="text-white font-semibold">STR Report Preview</h3>
              <p className="text-white/60 text-sm">Subject: {strReportData.subjectAccount}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-ubi-red font-mono text-lg">{strReportData.riskScore}</span>
            <span className="text-white/60 text-sm ml-1">/ 100 Risk Score</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Section 1: Subject Account */}
          <AnimatePresence>
            {showSections[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-ubi-navy pl-4"
              >
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Subject Account</h4>
                <p className="text-lg font-semibold text-gray-900">
                  {strReportData.subjectAccount} | Risk Score: {strReportData.riskScore}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section 2: Reporting Period */}
          <AnimatePresence>
            {showSections[1] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-ubi-blue pl-4"
              >
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Reporting Period</h4>
                <p className="text-lg font-semibold text-gray-900">{strReportData.reportingPeriod}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section 3: Funds Under Investigation */}
          <AnimatePresence>
            {showSections[2] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-red-500 pl-4"
              >
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Funds Under Investigation</h4>
                <p className="text-2xl font-bold text-red-600">{strReportData.fundsUnderInvestigation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section 4: AI-Generated Narrative */}
          <AnimatePresence>
            {showSections[3] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-5 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-ubi-gold" />
                    <h4 className="font-semibold text-gray-900">AI-Generated Investigation Narrative</h4>
                  </div>
                  {!isEditingNarrative && narrativeComplete && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleEditNarrative}
                      className="gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Narrative
                    </Button>
                  )}
                </div>
                
                {isEditingNarrative ? (
                  <div className="space-y-3">
                    <textarea
                      ref={narrativeRef}
                      value={editedNarrative}
                      onChange={(e) => setEditedNarrative(e.target.value)}
                      className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg text-sm leading-relaxed focus:ring-2 focus:ring-ubi-blue focus:border-transparent resize-y"
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditingNarrative(false)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleSaveNarrative}
                        className="bg-ubi-blue hover:bg-ubi-blue-dark"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-700 leading-relaxed text-sm">
                    <TypewriterText 
                      text={editedNarrative}
                      onComplete={() => setNarrativeComplete(true)}
                    />
                  </div>
                )}

                {!isEditingNarrative && narrativeComplete && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-end mt-5 pt-4 border-t border-gray-200"
                  >
                    <span className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                      <Check className="w-4 h-4" />
                      Narrative Locked — Audit Logged
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button 
          size="lg"
          onClick={handleDownloadPDF}
          className="bg-ubi-gold hover:bg-ubi-gold/90 text-white px-6 gap-2"
        >
          <Download className="w-5 h-5" />
          Download Evidence Pack
        </Button>
        <Button 
          size="lg"
          variant="outline"
          onClick={handleSubmitFIU}
          className="border-ubi-navy text-ubi-navy hover:bg-ubi-navy hover:text-white px-6 gap-2"
        >
          Submit to FIU Portal
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
}
