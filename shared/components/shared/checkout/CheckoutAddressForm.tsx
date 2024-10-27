import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { FormInput, WhiteBlock } from '..';
import { Textarea } from '../../ui';

type Props = {
  className?: string;
};

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адрес доставки" className={cn(className)}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" className="text-base" placeholder="Адрес доставки" />
        <Textarea className="text-base" placeholder="Комментарий к заказу" rows={5} />
      </div>
    </WhiteBlock>
  );
};
