'use client';

import React, { FC, useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { GroupVariants, IngredientItem, PizzaImage, Title } from '.';
import { Button } from '../ui';
import {
  PizzaSize,
  pizzaSizes,
  pizzaTypes,
  PizzaType,
  mapPizzaType,
} from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { useSet } from 'react-use';
import { calcTotalPizzaPrice, getAvaliablePizzaSizes } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

type Props = {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: () => void;
};

export const ChoosePizzaForm: FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAddCart,
}) => {
  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

  const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);

  const handleClickAdd = () => {
    onClickAddCart?.();
  };

  const avaliablePizzaSizes = getAvaliablePizzaSizes(type, items);

  const { size, type, setSize, setType } = usePizzaOptions(avaliablePizzaSizes);

  useEffect(() => {
    const isAvaliabledSize = avaliablePizzaSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const avaliableSize = avaliablePizzaSizes?.find((item) => !item.disabled);
    if (!isAvaliabledSize && avaliableSize) {
      setSize(Number(avaliableSize.value) as PizzaSize);
    }
  }, [type]);

  return (
    <div className={cn('flex flex-1', className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} />
        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={avaliablePizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient, key) => (
              <IngredientItem
                key={key}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Дбавить в корзину за {totalPrice} р
        </Button>
      </div>
    </div>
  );
};
