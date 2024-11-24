import { prisma } from '@/prisma/PrismaClient';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const ingredients = await prisma.ingredient.findMany();

  return NextResponse.json(ingredients);
}
