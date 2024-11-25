import { getServerSession } from 'next-auth';
import { authOptions } from '../constants/authOptions';

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);
  // console.log('server session', session);
  return session?.user ?? null;
};
