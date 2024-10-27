import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  text: string;
};

export const ErrorText: FC<Props> = ({ className, text }) => {
  return <p className={cn('text-red-500 text-sm', className)}>{text}</p>;
};
