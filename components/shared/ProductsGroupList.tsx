'use client';

import React, { FC, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ProductCard, Title } from '.';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/app/store/category';

type Props = {
  title: string;
  items: any[];
  className?: string;
  listClassName?: string;
  categoryId: number;
};

export const ProductsGroupList: FC<Props> = ({
  title,
  items,
  className,
  listClassName,
  categoryId,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={cn(className)} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items
          .filter((product) => product.items.length > 0)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.items[0].price}
              imageUrl={product.imageUrl}
            />
          ))}
      </div>
    </div>
  );
};
