'use client';

import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from '.';
import { Button } from '../ui';

type Props = {
  className?: string;
  imageUrl: string;
  name: string;
  descriptions: string;
  loading?: boolean;
  onSubmit?: VoidFunction;
  price: number;
};

export const ChooseProductForm: FC<Props> = ({
  className,
  imageUrl,
  name,
  descriptions,
  loading,
  onSubmit,
  price,
}) => {
  // const textDetails = '30 см, радиционное тесто';
  // const totalPrice = '35 p';
  return (
    <div className={cn('flex flex-1', className)}>
      <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
        <img
          src={imageUrl}
          alt={name}
          className={cn(
            'relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]',
          )}
        />
      </div>

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} />
        <p className="text-gray-400">{descriptions}</p>

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {price} $
        </Button>
      </div>
    </div>
  );
};
