import { prisma } from '@/prisma/PrismaClient';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.user.findMany();
  console.log(users);

  return NextResponse.json(users);
}
