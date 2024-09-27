'use client';

import React, { FC, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Title, RangeSlider, CheckboxFiltersGroup } from '.';
import { Input } from '../ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';
import qs from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  className?: string;
};

type PricePropsType = {
  priceFrom?: number;
  priceTo?: number;
};

type QueryType = {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
};

type FiltersTypes = PricePropsType & QueryType;

export const Filters: FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<keyof FiltersTypes, string>;

  const { ingredients, loading, onAddIs, selectedIngredients } = useFilterIngredients(
    searchParams.get('ingredients')?.split(','),
  );

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const [prices, setPrices] = useState({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []),
  );

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],
    ),
  );

  const updatePrice = (name: keyof PricePropsType, value: number) => {
    setPrices({
      ...prices,
      [name]: value,
    });
  };

  useEffect(() => {
    const filters = {
      ...prices,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
    };

    const queryString = qs.stringify(filters, {
      arrayFormat: 'comma',
    });

    router.push(`?${queryString}`, {
      scroll: false,
    });
  }, [prices, sizes, pizzaTypes, selectedIngredients]);

  return (
    <div className={cn(className)}>
      <Title text={'Фильтрация'} size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <CheckboxFiltersGroup
          title="Тип теста"
          name="pizzaTypes"
          className="mt-5"
          onClickCheckbox={togglePizzaTypes}
          selectedValues={pizzaTypes}
          items={[
            {
              text: 'Тонкое',
              value: '1',
            },
            {
              text: 'Традиционное',
              value: '2',
            },
          ]}
        />
        <CheckboxFiltersGroup
          title="Размеры"
          name="sizes"
          className="mt-5"
          onClickCheckbox={toggleSizes}
          selectedValues={sizes}
          items={[
            {
              text: '20 cм',
              value: '20',
            },
            {
              text: '30 cм',
              value: '30',
            },
            {
              text: '40 cм',
              value: '40',
            },
          ]}
        />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={500}
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={0}
            max={500}
            placeholder="100"
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={100}
          step={1}
          value={[prices.priceFrom || 0, prices.priceTo || 100]}
          onValueChange={([from, to]) => setPrices({ priceFrom: from, priceTo: to })}
        />

        <CheckboxFiltersGroup
          title="Ингридиенты"
          className="mt-5"
          limit={6}
          defaultItems={items.slice(0, 6)}
          items={items}
          loading={loading}
          onClickCheckbox={onAddIs}
          selectedValues={selectedIngredients}
          name="ingredients"
        />
      </div>
    </div>
  );
};
