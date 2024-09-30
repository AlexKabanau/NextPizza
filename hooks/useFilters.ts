import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useState } from 'react';

type PricePropsType = {
  priceFrom?: number;
  priceTo?: number;
};

export type QueryType = {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
};

export type FiltersTypes = PricePropsType & QueryType;

export type UseQueryFiltersPropsTypes = {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PricePropsType;
};

type ReturnPropsType = UseQueryFiltersPropsTypes & {
  setPrices: (name: keyof PricePropsType, value: number) => void;
  setPizzaTypes: (key: string) => void;
  setSizes: (key: string) => void;
  setIngredients: (key: string) => void;
};

export const useFilters = (): ReturnPropsType => {
  const searchParams = useSearchParams() as unknown as Map<keyof FiltersTypes, string>;

  // filter ingredients

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',')),
  );

  // filter sizes

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []),
  );

  // filter types

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],
    ),
  );

  // filter prices

  const [prices, setPrices] = useState<PricePropsType>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PricePropsType, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrices: updatePrice,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setIngredients: toggleIngredients,
  };
};
