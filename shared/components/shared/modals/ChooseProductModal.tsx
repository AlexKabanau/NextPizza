'use client';

import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ProductWhithRelations } from '@/@types/prisma';
import { ProductForm } from '..';

type Props = {
  product: ProductWhithRelations;
  className?: string;
};

export const ChooseProductModal: FC<Props> = ({ className, product }) => {
  const router = useRouter();
  // const [loading, setLoading] = useState(false);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
