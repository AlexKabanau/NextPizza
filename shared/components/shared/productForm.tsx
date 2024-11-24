'use client';

import React, { FC } from 'react';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';
import { ProductWhithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from './ChoosePizzaForm';
import { ChooseProductForm } from './ChooseProductForm';

type Props = {
  product: ProductWhithRelations;
  onSubmit?: VoidFunction;
  className?: string;
};

export const ProductForm: FC<Props> = ({ className, product, onSubmit: _onSubmit }) => {
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmitProduct = async (productItemId?: number, ingredients?: number[]) => {
    const itemId = productItemId ?? firstItem.id;
    try {
      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success('Добавлено в корзину');
      _onSubmit?.();
    } catch (error) {
      toast.error('Не удалось добавить');
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        descriptions={product.description}
        items={product.items}
        onSubmit={onSubmitProduct}
        loading={loading}
      />
    );
  } else {
    return (
      <ChooseProductForm
        imageUrl={product.imageUrl}
        name={product.name}
        descriptions={product.description}
        onSubmit={onSubmitProduct}
        price={firstItem.price}
        loading={loading}
      />
    );
  }
};
