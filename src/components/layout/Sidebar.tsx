import { 
  LayoutDashboard, 
  GitBranch, 
  Briefcase, 
  FileText, 
  Copy, 
  Bell, 
  BarChart3, 
  UserCircle, 
  Settings, 
  ClipboardList,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser, navItems } from '@/data/mockData';
import { UnionBankLogo } from '@/components/ui-custom/UnionBankLogo';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  GitBranch,
  Briefcase,
  FileText,
  Copy,
  Bell,
  BarChart3,
  UserCircle,
  Settings,
  ClipboardList,
};

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-ubi-navy flex flex-col z-50">
      {/* Logo Section */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <UnionBankLogo />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">FundSight</h1>
            <p className="text-white/50 text-xs">Union Bank of India</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = activePage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm transition-all",
                    isActive 
                      ? "text-white bg-white/10 border-l-2 border-ubi-red" 
                      : "text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                  )}
                >
                  {Icon && <Icon className={cn("w-5 h-5", isActive ? "text-ubi-red" : "text-white/60")} />}
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
          <div className="w-9 h-9 bg-ubi-red/20 rounded-full flex items-center justify-center">
            <span className="text-ubi-red text-sm font-medium">{currentUser.avatar}</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-white text-sm font-medium">{currentUser.name}</p>
            <p className="text-white/50 text-xs">{currentUser.role}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </button>
      </div>
    </aside>
  );
}
