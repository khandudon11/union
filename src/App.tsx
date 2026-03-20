import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Dashboard } from '@/pages/Dashboard';
import { FundFlowGraph } from '@/pages/FundFlowGraph';
import { CaseInvestigation } from '@/pages/CaseInvestigation';
import { STRGenerator } from '@/pages/STRGenerator';
import { DigitalTwin } from '@/pages/DigitalTwin';
import { AlertManagement } from '@/pages/AlertManagement';
import { Analytics } from '@/pages/Analytics';
import { Account360 } from '@/pages/Account360';
import { Admin } from '@/pages/Admin';
import { AuditTrail } from '@/pages/AuditTrail';

const pageTitles: Record<string, { title: string; breadcrumbs: string[] }> = {
  dashboard: { title: 'Dashboard', breadcrumbs: ['Home', 'Overview'] },
  'fund-flow': { title: 'Fund Flow Graph', breadcrumbs: ['Investigation', 'Graph Analysis'] },
  cases: { title: 'Case Investigation', breadcrumbs: ['Cases', 'CASE-2024-0091'] },
  'str-generator': { title: 'STR Report Generator', breadcrumbs: ['Compliance', 'STR Generation'] },
  'digital-twin': { title: 'Digital Twin Simulation', breadcrumbs: ['Simulation', 'What-If Analysis'] },
  alerts: { title: 'Alert Management', breadcrumbs: ['Monitoring', 'Alert Queue'] },
  analytics: { title: 'Analytics & Intelligence', breadcrumbs: ['Insights', 'Dashboard'] },
  'account-360': { title: 'Account 360° View', breadcrumbs: ['Accounts', 'ACC-4821'] },
  admin: { title: 'Admin & Configuration', breadcrumbs: ['Settings', 'System Config'] },
  audit: { title: 'Audit Trail', breadcrumbs: ['Compliance', 'Activity Log'] },
};

// Create a context for navigation
export const NavigationContext = {
  navigateTo: (_page: string, _params?: Record<string, unknown>) => {
    // This will be set by the App component
  }
};

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [pageParams, setPageParams] = useState<Record<string, unknown>>({});

  const navigateTo = (page: string, params?: Record<string, unknown>) => {
    setActivePage(page);
    if (params) {
      setPageParams(params);
    }
  };

  // Update the context
  NavigationContext.navigateTo = navigateTo;

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard navigateTo={navigateTo} />;
      case 'fund-flow':
        return <FundFlowGraph />;
      case 'cases':
        return <CaseInvestigation navigateTo={navigateTo} />;
      case 'str-generator':
        return <STRGenerator caseData={pageParams.caseData as Record<string, unknown>} />;
      case 'digital-twin':
        return <DigitalTwin />;
      case 'alerts':
        return <AlertManagement preSelectedAlert={pageParams.alertId as string} />;
      case 'analytics':
        return <Analytics />;
      case 'account-360':
        return <Account360 />;
      case 'admin':
        return <Admin />;
      case 'audit':
        return <AuditTrail />;
      default:
        return <Dashboard navigateTo={navigateTo} />;
    }
  };

  const pageInfo = pageTitles[activePage] || { title: 'Dashboard', breadcrumbs: ['Home'] };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Toast Provider */}
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        toastOptions={{
          style: {
            fontSize: '14px',
          },
        }}
      />

      {/* Sidebar */}
      <Sidebar activePage={activePage} onNavigate={navigateTo} />

      {/* Main Content */}
      <div className="flex-1 ml-60 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar title={pageInfo.title} breadcrumbs={pageInfo.breadcrumbs} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
