import { prisma } from '@/prisma/PrismaClient';
// import { authOptions } from '@/shared/constants/authOptions';
import { getUserSession } from '@/shared/lib/getUserSession';
// import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// export async function GET(req: NextRequest, res: NextResponse) {
export async function GET() {
  try {
    const user = await getUserSession();
    // const user = await getServerSession(req, res, authOptions);

    if (!user) {
      return NextResponse.json({ message: '[USER_GET] Unauthorized' }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
  }
}
