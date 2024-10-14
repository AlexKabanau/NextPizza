'use client';

import React, { FC, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import {
  Sheet,
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
import { useCartStore } from '@/shared/store';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

type Props = {
  className?: string;
};

export const CartDrawer: FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  // const fetchCartItems = useCartStore((state) => state.fetchCartItems);

  const [
    totalAmount,
    items,
    fetchCartItems,
    // loading,
    // addCartItem,
    updateItemQuantity,
    // removeCartItem,
  ] = useCartStore((state) => [
    state.totalAmount,
    state.items,
    state.fetchCartItems,
    state.updateItemQuantity,
    // state.loading,
    // state.addCartItem,
    // debounce(state.updateItemQuantity, 200),
    // state.removeCartItem,
  ]);

  useEffect(() => {
    fetchCartItems();
    // console.log(items);
    // console.log(totalAmount);
  }, []);
  // const fu1 = () => {
  // fetchCartItems();
  // console.log(items);
  // console.log(totalAmount);
  // };

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4F1EE]">
          <SheetHeader>
            <SheetTitle>
              {/* В корзине <span className="font-bold">10 товара</span>В корзине{' '} */}В корзине{' '}
              <span className="font-bold">{items.length} товара</span>
            </SheetTitle>
          </SheetHeader>

          <div className="mx-6 mt-5 overflow-auto scrollbar flex-1">
            <div className="mb-2">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={
                    item.pizzaSize && item.pizzaType
                      ? GetCartItemDetails(
                          item.ingredients,
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize,
                        )
                      : ''
                  }
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                />
              ))}
            </div>
          </div>

          <SheetFooter className="mx-6 bg-white p-8">
            <div className="w-full">
              <div className="flex mb-4">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Итого
                  <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                </span>
                {/* <span className="font-bold text-lg">10 Р</span> */}
                <span className="font-bold text-lg">{totalAmount} Р</span>
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
