import { prisma } from '@/prisma/PrismaClient';
import { ProfileForm } from '@/shared/components';
import { getUserSession } from '@/shared/lib/getUserSession';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getUserSession();
  // console.log('session', session);

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session?.id),
    },
  });

  if (!user) {
    return redirect('/not-auth');
  }

  return <ProfileForm data={user} />;
}
