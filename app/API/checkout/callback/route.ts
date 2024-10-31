import { PaymentCallbackData } from '@/@types/yookassa';
import { prisma } from '@/prisma/PrismaClient';
import { OrderSuccessTemplate } from '@/shared/components/shared/email-templates/orderSuccess';
import { sendEmail } from '@/shared/lib';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELED,
      },
    });
    const items = order?.items as unknown as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'NextPizza / Ваш заказ оформлен 👍',
        OrderSuccessTemplate({ orderId: order.id, items }),
      );
    } else {
      // неуспешная оплата
    }
  } catch (error) {
    console.log('[Checkout Callback] Error', error);
    return NextResponse.json({ error: 'Server Error' });
  }
}