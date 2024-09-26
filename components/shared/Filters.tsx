'use client';

import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from '.';
import { Input } from '../ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

type Props = {
  className?: string;
};

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddIs, selectedIds } = useFilterIngredients();

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  return (
    <div className={cn(className)}>
      <Title text={'Фильтрация'} size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox name="collection" text={'Можно собирать'} value="1" />
        <FilterCheckbox name="new" text={'Новинки'} value="2" />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={100} defaultValue={0} />
          <Input type="number" min={0} max={100} placeholder="100" />
        </div>

        <RangeSlider min={0} max={100} step={1} value={[0, 100]} />

        <CheckboxFiltersGroup
          title="Ингридиенты"
          className="mt-5"
          limit={6}
          defaultItems={items.slice(0, 6)}
          items={items}
          loading={loading}
          onClickCheckbox={onAddIs}
          selectedIds={selectedIds}
          name="ingredients"
        />
      </div>
    </div>
  );
};
