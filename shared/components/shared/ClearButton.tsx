import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';

type Props = {
  className?: string;
  onClick?: () => void;
};

export const ClearButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer',
      )}>
      <X className="h-5 w-5" />
    </button>
  );
};