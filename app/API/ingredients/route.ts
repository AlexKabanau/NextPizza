import { prisma } from '@/prisma/PrismaClient';
import { NextResponse } from 'next/server';

export async function GET() {
  const ingredients = await prisma.ingredients.findMany();

  return NextResponse.json(ingredients);
}
