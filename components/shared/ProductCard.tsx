import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Title } from './Title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';

type Props = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
};

export const ProductCard: FC<Props> = ({ id, name, price, imageUrl, className }) => {
  return (
    <div className={cn(className)}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lgh-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed repellat placeat odio
          quisquam ex atque quis soluta ducimus iure odit. Ex, expedita. Officia sit adipisci beatae
          soluta fugiat labore quaerat.
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} $</b>
          </span>

          <Button variant={'secondary'} className="text-base font-bold">
            <Plus className="w-5 h-5 mr-1" />
          </Button>
        </div>
      </Link>
    </div>
  );
};
