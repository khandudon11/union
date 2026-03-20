import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  delta?: string | number;
  deltaType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  delta, 
  deltaType = 'neutral',
  icon: Icon,
  className 
}: StatCardProps) {
  const isPositive = deltaType === 'increase';
  const isNegative = deltaType === 'decrease';

  const DeltaIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  
  const deltaColorClass = isPositive 
    ? 'text-red-600' 
    : isNegative 
      ? 'text-green-600' 
      : 'text-gray-400';

  return (
    <div className={cn(
      "bg-white rounded-lg p-5 shadow-card hover:shadow-hover transition-shadow",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        {Icon && (
          <div className="w-10 h-10 bg-ubi-navy/5 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-ubi-navy" />
          </div>
        )}
      </div>
      
      {delta !== undefined && delta !== 0 && (
        <div className="flex items-center gap-1.5 mt-3">
          <DeltaIcon className={cn("w-4 h-4", deltaColorClass)} />
          <span className={cn("text-sm font-medium", deltaColorClass)}>
            {isPositive ? '+' : ''}{delta} vs yesterday
          </span>
        </div>
      )}
    </div>
  );
}
