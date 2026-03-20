import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  level: 'critical' | 'high' | 'medium' | 'low';
  showPulse?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const riskConfig = {
  critical: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200',
    label: 'Critical',
  },
  high: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-200',
    label: 'High',
  },
  medium: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
    label: 'Medium',
  },
  low: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
    label: 'Low',
  },
};

export function RiskBadge({ level, showPulse = false, children, className }: RiskBadgeProps) {
  const config = riskConfig[level];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.bg,
        config.text,
        config.border,
        showPulse && level === 'critical' && 'animate-pulse',
        className
      )}
    >
      {children || config.label}
    </span>
  );
}

interface RiskScoreBadgeProps {
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RiskScoreBadge({ score, showLabel = true, size = 'md', className }: RiskScoreBadgeProps) {
  const getLevel = (s: number): 'critical' | 'high' | 'medium' | 'low' => {
    if (s >= 80) return 'critical';
    if (s >= 60) return 'high';
    if (s >= 40) return 'medium';
    return 'low';
  };

  const level = getLevel(score);
  const config = riskConfig[level];
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-lg font-bold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border',
        config.bg,
        config.text,
        config.border,
        sizeClasses[size],
        className
      )}
    >
      <span>{score}</span>
      {showLabel && <span className="opacity-80">/ 100</span>}
    </span>
  );
}
