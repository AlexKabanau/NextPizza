'use client';

import React, { FC, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { ProductCard, Title } from '.';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWhithRelations } from '@/@types/prisma';

type Props = {
  title: string;
  items: ProductWhithRelations[];
  // items: CategoryProducts['products'];
  // products: CategoryProducts['products'];

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
  const intersectionRef = React.useRef<HTMLDivElement>(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={cn(className)} id={title}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className="wrapper" ref={intersectionRef}></div>
      <div
        className={cn('grid grid-cols-3 gap-[50px]', listClassName)}
        // ref={intersectionRef}>
      >
        {!items &&
          [...Array(6)].map((_, index) => (
            <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
          ))}
        {/* {items.map((story) => (
          <img
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer"
            height={250}
            width={200}
            src={story.previewImageUrl}
          />
        ))} */}
        {items
          .filter((product) => product.items.length > 0)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.items[0].price}
              ingredients={product.ingredients}
              description={product.description}
            />
          ))}
      </div>
    </div>
  );
};
