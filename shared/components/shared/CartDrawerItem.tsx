import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';

type Props = CartItemProps & {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemoveButton?: () => void;
  className?: string;
};

export const CartDrawerItem: FC<Props> = ({
  imageUrl,
  name,
  price,
  details,
  onClickCountButton,
  onClickRemoveButton,
  quantity,
  disabled,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex bg-white p-5 gap-6',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={onClickRemoveButton}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
