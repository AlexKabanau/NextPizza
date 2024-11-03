import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from '..';
import { GetCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/getCartDetails';
import { Skeleton } from '../../ui';

type Props = {
  className?: string;
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading: boolean;
};

export const CheckoutCart: FC<Props> = ({
  className,
  items,
  onClickCountButton,
  removeCartItem,
  loading,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={cn(className)}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.length > 0 &&
            items.map((item) => (
              <CheckoutItem
                key={item.id}
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
                disabled={item.disabled}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                onClickRemoveButton={() => removeCartItem(item.id)}
                // onClickRemove={remove}
                // onClickCountButton={remove}
              />
            ))}
        {/* <CartItemSkeleton /> */}
      </div>
    </WhiteBlock>
  );
};
