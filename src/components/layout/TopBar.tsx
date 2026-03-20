import { Bell, Calendar, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  title: string;
  breadcrumbs?: string[];
}

export function TopBar({ title, breadcrumbs = [] }: TopBarProps) {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left: Title & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
                  <span className={cn(index === breadcrumbs.length - 1 && "text-ubi-red font-medium")}>
                    {crumb}
                  </span>
                </span>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-ubi-red rounded-full animate-pulse" />
        </button>

        {/* Date Display */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{today}</span>
        </div>
      </div>
    </header>
  );
}
