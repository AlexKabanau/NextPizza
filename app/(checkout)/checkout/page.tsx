'use client';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  CartCheckoutSideBar,
  // CheckoutItemDetails,
  Container,
  Title,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutAddressForm,
} from '@/shared/components/shared';
import { useCart } from '@/shared/hooks';
import {
  checkoutFormSchema,
  CheckoutFormSchemaTypes,
} from '@/shared/components/shared/checkout/checkoutFormSchema';

export default function CheckoutPage() {
  const {
    totalAmount,
    items,
    // fetchCartItems,
    // loading,
    // addCartItem,
    updateItemQuantity,
    removeCartItem,
  } = useCart();

  const form = useForm<CheckoutFormSchemaTypes>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  const onSubmit: SubmitHandler<CheckoutFormSchemaTypes> = (data) => {
    console.log(data);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
              />

              <CheckoutPersonalForm />

              <CheckoutAddressForm />
            </div>
            <div className="w-[450px]">
              <CartCheckoutSideBar totalAmount={totalAmount} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
