import { useEffect, useState } from 'react';
import { Variant } from '../components/shared/GroupVariants';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { useSet } from 'react-use';
import { getAvaliablePizzaSizes } from '../lib';
import { ProductItem } from '@prisma/client';

type ReturnType = {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  avaliablePizzaSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
};

export const usePizzaOptions = (items: ProductItem[]): ReturnType => {
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(2);

  const avaliablePizzaSizes = getAvaliablePizzaSizes(type, items);

  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  useEffect(() => {
    const isAvaliabledSize = avaliablePizzaSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const avaliableSize = avaliablePizzaSizes?.find((item) => !item.disabled);
    if (!isAvaliabledSize && avaliableSize) {
      setSize(Number(avaliableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    avaliablePizzaSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
