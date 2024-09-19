import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import { Title, FilterCheckbox, RangeSlider } from '.';
import { Input } from '../ui';

type Props = {
  className?: string;
};

export const Filters: FC<Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <Title text={'Фильтрация'} size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox text={'Можно собирать'} value="1" />
        <FilterCheckbox text={'Новинки'} value="2" />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={100} defaultValue={0} />
          <Input type="number" min={0} max={100} placeholder="100" />
        </div>

        <RangeSlider min={0} max={100} step={1} value={[0, 100]} />
      </div>
    </div>
  );
};
