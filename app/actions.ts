'use server';
// import { create } from 'zustand';

import { CheckoutFormSchemaTypes } from '@/shared/constants';
import { prisma } from '@/prisma/PrismaClient';
import { OrderStatus, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { createPayment, sendEmail } from '@/shared/lib';
import { PayOrderTemplate, VerificationUserTemplate } from '@/shared/components';
import { getUserSession } from '@/shared/lib/getUserSession';
import { hashSync } from 'bcrypt';

export async function createOrder(data: CheckoutFormSchemaTypes) {
  try {
    const cookiesStore = cookies();
    const cartToken = cookiesStore.get('cartToken')?.value;
    // console.log('cartToken', cartToken);

    if (!cartToken) {
      throw new Error('Cart token not found!');
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });
    // console.log('userCart', userCart);
    // нет корзины - ошибка
    if (!userCart) {
      throw new Error('Cart not found');
    }
    // нет товаров - ошибка
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }
    let userId;
    if (userCart?.userId) {
      userId = userCart.userId;
    }
    // заказ создан
    const order = await prisma.order.create({
      data: {
        userId: userId,
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });
    // console.log('order', order);
    // очистка корзины
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    // очищаем список товаров
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    //TODO: прикрепить оплату
    // создаем плетеж
    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Оплата заказа №' + order.id,
    });
    // console.log('paymentData', paymentData);
    // не создали - ошибка
    if (!paymentData) {
      throw new Error('Payment data not found');
    }
    // обновляем заказ
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      `NexPizza / Оплатите заказ № ${order.id}`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }),
    );
    return paymentUrl;
  } catch (error) {
    console.log('[CreatedOrder] Server error', error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (error) {
    console.log('Error [UPDATE_USER]', error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
        // verified: false
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      `NexPizza / подтвердите аккаунт`,
      VerificationUserTemplate({
        code,
      }),
    );
  } catch (error) {
    console.log('Error [CREATE_USER]', error);
  }
}
