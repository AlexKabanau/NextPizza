import {
  ChooseProductModal,
  Container,
  GroupVariants,
  PizzaImage,
  Title,
} from '@/shared/components/shared';
import { prisma } from '@/prisma/PrismaClient';
import { notFound } from 'next/navigation';

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
      // {
      //   // orderBy: {
      //   //   createdAt: 'desc',
      //   // },
      //   include: {
      //     product: {
      //       include: {
      //         items: true,
      //       },
      //     },
      //   },
      // },
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
