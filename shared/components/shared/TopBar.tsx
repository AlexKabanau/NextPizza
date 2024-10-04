import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Categories, Container, SortPopup } from './index';
import { Category } from '@prisma/client';

type Props = {
  categories: Category[];
  className?: string;
};

export const TopBar: FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
