import { prisma } from '@/prisma/PrismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.user.findMany();
  // console.log(users);

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const user = await prisma.user.create({
    data,
  });

  return user;
}
