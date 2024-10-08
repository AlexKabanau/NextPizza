'use client';

import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CartDrawerItem } from './CartDrawerItem';
import { GetCartItemDetails } from '@/shared/lib';

type Props = {
  className?: string;
};

export const CartDrawer: FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4F1EE]">
          <SheetHeader>
            <SheetTitle>
              В корзине <span className="font-bold">3 товара</span>
            </SheetTitle>
          </SheetHeader>

          <div className="mx-6 mt-5 overflow-auto scrollbar flex-1">
            <div className="mb-2">
              <CartDrawerItem
                id={0}
                imageUrl={'/public/images/pizzasImages/11EE7D610CF7E265B7C72BE5AE757CA7.webp'}
                details={GetCartItemDetails(2, 30, [
                  {
                    name: 'тро-ло-ло',
                    id: 0,
                    price: 0,
                    imageUrl: '',
                    createdAt: '20T40',
                    updatedAt: undefined,
                  },
                  {
                    name: 'тро-ло-ло2',
                    id: 0,
                    price: 0,
                    imageUrl: '',
                    createdAt: '20T40',
                    updatedAt: undefined,
                  },
                ])}
                name={'чоризо-фрэш'}
                price={41.9}
                quantity={2}
              />
            </div>
          </div>

          <SheetFooter className="mx-6 bg-white p-8">
            <div className="w-full">
              <div className="flex mb-4">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Итого
                  <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                </span>
                <span className="font-bold text-lg">50 Р</span>
              </div>
            </div>

            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
