import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { FormInput, WhiteBlock } from '..';

type Props = {
  className?: string;
};

export const CheckoutPersonalForm: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={cn(className)}>
      <div className="grid grid-cols-2 gap-3">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
        <FormInput name="email" className="text-base" placeholder="e-mail" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
