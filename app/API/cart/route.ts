import { updateItemQuantity } from './../../../shared/services/cart';
import { prisma } from '@/prisma/PrismaClient';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { findOrCreateCart } from '@/shared/lib/findOrCreateCart';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { updateCartTotalAmount } from '@/shared/lib/updateCartTotalAmount';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          // {
          //   userId,
          // },
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    /* проверить получение по localhost:3000/api/cart */

    return NextResponse.json(userCart);
  } catch (error) {
    console.error('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const data = (await req.json()) as CreateCartItemValues;

    const userCart = await findOrCreateCart(token);
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: { every: { id: { in: data.ingredients } } },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    }

    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        quantity: 1,
        ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
      },
    });
    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);

    return resp;
  } catch (error) {
    console.error('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}
