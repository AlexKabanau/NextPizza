'use client';

import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Title, RangeSlider, CheckboxFiltersGroup } from '.';
import { Input } from '../ui';
import { useIngredients, useFilters, useQueryFilters } from '@/shared/hooks';

type Props = {
  className?: string;
};

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={cn(className)}>
      <Title text={'Фильтрация'} size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <CheckboxFiltersGroup
          title="Тип теста"
          name="pizzaTypes"
          className="mt-5"
          onClickCheckbox={filters.setPizzaTypes}
          selectedValues={filters.pizzaTypes}
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
          onClickCheckbox={filters.setSizes}
          selectedValues={filters.sizes}
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
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={0}
            max={500}
            placeholder="100"
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={100}
          step={1}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 100]}
          onValueChange={updatePrices}
        />

        <CheckboxFiltersGroup
          title="Ингридиенты"
          className="mt-5"
          limit={6}
          defaultItems={items.slice(0, 6)}
          items={items}
          loading={loading}
          onClickCheckbox={filters.setIngredients}
          selectedValues={filters.selectedIngredients}
          name="ingredients"
        />
      </div>
    </div>
  );
};
