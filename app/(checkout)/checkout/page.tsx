'use client';

import {
  CartCheckoutSideBar,
  CartItemSkeleton,
  CheckoutItem,
  // CheckoutItemDetails,
  Container,
  Title,
  WhiteBlock,
} from '@/shared/components/shared';
import { Input, Textarea } from '@/shared/components/ui';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';
import { GetCartItemDetails } from '@/shared/lib';
// import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

// const remove = () => {
//   console.log('first');
// };

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

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Корзина">
            <div className="flex flex-col gap-5">
              {items.map((item) => (
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
              <CartItemSkeleton />
            </div>
          </WhiteBlock>

          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-3">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input name="lfstName" className="text-base" placeholder="Фамилия" />
              <Input name="email" className="text-base" placeholder="e-mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input name="firstName" className="text-base" placeholder="Адрес доставки" />
              <Textarea className="text-base" placeholder="Комментарий к заказу" rows={5} />
            </div>
          </WhiteBlock>
        </div>
        <div className="w-[450px]">
          <CartCheckoutSideBar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
