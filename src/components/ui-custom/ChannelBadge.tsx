import { cn } from '@/lib/utils';

interface ChannelBadgeProps {
  channel: 'NEFT' | 'IMPS' | 'UPI' | 'Cash' | 'RTGS' | string;
  className?: string;
}

const channelConfig: Record<string, { bg: string; text: string; border: string }> = {
  NEFT: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  IMPS: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-200',
  },
  UPI: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
  Cash: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
  },
  RTGS: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
  },
};

export function ChannelBadge({ channel, className }: ChannelBadgeProps) {
  const config = channelConfig[channel] || channelConfig.NEFT;
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {channel}
    </span>
  );
}
