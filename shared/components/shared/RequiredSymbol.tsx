import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
};

export const RequiredSymbol: FC<Props> = ({ className }) => {
  return <span className="text-red-500">*</span>;
};
