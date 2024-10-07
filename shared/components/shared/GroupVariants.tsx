'use client';

import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';

type Props = {
  items: readonly Variant[];
  defaultValue?: string;
  onClick?: (value: Variant['value']) => void;
  className?: string;
  value?: Variant['value'];
};

export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

export const GroupVariants: FC<Props> = ({ items, onClick, className, value }) => {
  return (
    <div className={cn('flex justify-between bg-[#f3f3f3] rounded-3xl p-1 select-none', className)}>
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
            {
              'bd-white shadow': item.value === value,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            },
          )}>
          {item.name}
        </button>
      ))}
    </div>
  );
};
