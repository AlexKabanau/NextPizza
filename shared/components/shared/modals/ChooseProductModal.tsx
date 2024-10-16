'use client';

import React, { FC, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm, ChooseProductForm } from '..';
import { ProductWhithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

type Props = {
  product: ProductWhithRelations;
  className?: string;
};

export const ChooseProductModal: FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);
  // const [loading, setLoading] = useState(false);

  const onSubmitProduct = async (productItemId?: number, ingredients?: number[]) => {
    const itemId = productItemId ?? firstItem.id;
    try {
      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success('Добавлено в корзину');
      router.back();
    } catch (error) {
      toast.error('Не удалось добавить');
      console.error(error);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmitProduct}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onSubmitProduct}
            price={firstItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
