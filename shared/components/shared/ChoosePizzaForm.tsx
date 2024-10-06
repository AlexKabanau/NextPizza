'use client';

import React, { FC, useState } from 'react';
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
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(2);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;
  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const handleClickAdd = () => {
    onClickAddCart?.();
  };

  const avaliablePizzas = items.filter((item) => item.pizzaType === type);
  const avaliablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !avaliablePizzas.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));
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
