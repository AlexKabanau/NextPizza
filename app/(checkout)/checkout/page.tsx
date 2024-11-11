'use client';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  CartCheckoutSideBar,
  Container,
  Title,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutAddressForm,
} from '@/shared/components';
import { useCart } from '@/shared/hooks';
import { checkoutFormSchema, CheckoutFormSchemaTypes } from '@/shared/constants';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Api } from '@/shared/services/apiClient';

export default function CheckoutPage() {
  const {
    totalAmount,
    items,
    // fetchCartItems,
    loading,
    // addCartItem,
    updateItemQuantity,
    removeCartItem,
  } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();

  const form = useForm<CheckoutFormSchemaTypes>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: session?.user.name || '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  });
  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }
    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  const onSubmit: SubmitHandler<CheckoutFormSchemaTypes> = async (data) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success('Заказ успешно оформлен. Переход на оплату...', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.log(error);
      toast.error('Не удалось создать заказ', {
        icon: '❎',
      });
      setSubmitting(false);
    }
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
                loading={loading}
              />

              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
            </div>
            <div className="w-[450px]">
              <CartCheckoutSideBar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
