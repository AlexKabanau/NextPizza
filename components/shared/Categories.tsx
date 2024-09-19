import React, { FC } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};
const categoriesNames = [
  'Пиццы',
  'Комбо',
  'Закуски',
  'Коктейли',
  'Кофе',
  'Напитки',
  'Десерты',
  'Десерты',
];
const activeIndex = 0;

export const Categories: FC<Props> = ({ className }) => {
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {categoriesNames.map((categori, index) => (
        <a
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeIndex === index && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
          key={index}>
          <button>{categori}</button>
        </a>
      ))}
    </div>
  );
};
