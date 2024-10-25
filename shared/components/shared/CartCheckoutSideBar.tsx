import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './CheckoutItemDetails';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '../ui';

type Props = {
  className?: string;
  totalAmount: number;
};

const VAT = 15;
const DELIVERY_PRICE = 15;

export const CartCheckoutSideBar: FC<Props> = ({ className, totalAmount }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <div className={cn(className)}>
      <WhiteBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Итого:</span>
          <span className="text-[34px] font-extrabold">{totalPrice}$</span>
        </div>
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Package size={18} className="mr-2 text-gray-300" />
              Стоимость корзины
            </div>
          }
          value={`${totalAmount}$`}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Percent size={18} className="mr-2 text-gray-300" />
              Налог
            </div>
          }
          value={`${vatPrice}$`}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Truck size={18} className="mr-2 text-gray-300" />
              Доставка
            </div>
          }
          value={`${DELIVERY_PRICE}$`}
        />
        <Button
          type="submit"
          // disabled={!totalAmount || submiting}
          disabled={false}
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
          Перейти к оплате
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
