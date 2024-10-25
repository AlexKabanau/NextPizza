'use client';

import React, { FC, useState } from 'react';
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
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CartDrawerItem } from './CartDrawerItem';
import { GetCartItemDetails } from '@/shared/lib';
// import { useCartStore } from '@/shared/store';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import Image from 'next/image';
import { Title } from './Title';
import { useCart } from '@/shared/hooks';

type Props = {
  className?: string;
};

export const CartDrawer: FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  // const fetchCartItems = useCartStore((state) => state.fetchCartItems);

  const {
    totalAmount,
    items,
    // fetchCartItems,
    // loading,
    // addCartItem,
    updateItemQuantity,
    removeCartItem,
  } = useCart();
  // const [
  //   totalAmount,
  //   items,
  //   fetchCartItems,
  //   // loading,
  //   // addCartItem,
  //   updateItemQuantity,
  //   removeCartItem,
  // ] = useCartStore((state) => [
  //   state.totalAmount,
  //   state.items,
  //   state.fetchCartItems,
  //   state.updateItemQuantity,
  //   state.removeCartItem,
  //   // state.loading,
  //   // state.addCartItem,
  //   // debounce(state.updateItemQuantity, 200),
  // ]);

  // useEffect(() => {
  //   fetchCartItems();
  //   // console.log(items);
  //   // console.log(totalAmount);
  // }, []);
  // // const fu1 = () => {
  // // fetchCartItems();
  // // console.log(items);
  // // console.log(totalAmount);
  // // };

  const [redirecting, setRedirecting] = useState(false);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4F1EE]">
          <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
            {totalAmount > 0 && (
              <SheetHeader>
                <SheetTitle>
                  {/* В корзине <span className="font-bold">10 товара</span>В корзине{' '} */}В
                  корзине <span className="font-bold">{items.length} товара</span>
                </SheetTitle>
              </SheetHeader>
            )}

            {totalAmount && (
              <div className="flex flex-col items-center justify-center w-72 mx-auto">
                <Image
                  src="/assets/image/empty-box.png"
                  alt="Empty Cart"
                  width={120}
                  height={120}
                />
                <Title size="sm" text="Корзина пуста" className="text-center font-bold my-2" />
                <p className="text-center text-neutral-500 mb-5">
                  Добавьте хотя бы один товар в корзину
                </p>
                <SheetClose>
                  <Button className="w-56 h-12 text-base" size="lg">
                    <ArrowLeft className="w-5 mr-2" />
                    Вернуться назад
                  </Button>
                </SheetClose>
              </div>
            )}

            {totalAmount > 0 && (
              <>
                <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
                  {items.map((item) => (
                    <div key={item.id} className="mb-2">
                      <CartDrawerItem
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details={GetCartItemDetails(
                          item.ingredients,
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize,
                        )}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onClickCountButton={(type) =>
                          onClickCountButton(item.id, item.quantity, type)
                        }
                        onClickRemoveButton={() => removeCartItem(item.id)}
                        disabled={item.disabled}
                      />
                    </div>
                  ))}
                </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                  <div className="w-full">
                    <div className="flex mb-4">
                      <span className="flex flex-1 text-lg text-neutral-500">
                        Итого
                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                      </span>
                      {/* <span className="font-bold text-lg">10 Р</span> */}
                      <span className="font-bold text-lg">{totalAmount} $</span>
                    </div>
                    <Link href="/checkout">
                      <Button
                        onClick={() => setRedirecting(true)}
                        loading={redirecting}
                        type="submit"
                        className="w-full h-12 text-base">
                        Оформить заказ
                        <ArrowRight className="w-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </SheetFooter>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
