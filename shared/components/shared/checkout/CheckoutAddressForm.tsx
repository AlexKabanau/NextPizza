import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { AddressInput, ErrorText, FormInput, FormTextarea, WhiteBlock } from '..';
import { Controller, useFormContext } from 'react-hook-form';
// import { AddressInput } from '../address-input';

type Props = {
  className?: string;
};

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставки" className={cn(className)}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />
        {/* <FormInput name="address" className="text-base" placeholder="Адрес доставки" /> */}

        {/* <AddressInput /> */}

        <FormTextarea
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
          name={'comment'}
        />
      </div>
    </WhiteBlock>
  );
};
