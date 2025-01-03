import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/PrismaClient';
import { compare, hashSync } from 'bcrypt';
import { UserRole } from '@prisma/client';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: 'Ov23li7kBSTA1WulunLH',
      clientSecret: 'b02303f2f5cef803316e61f192037d6144df16ef',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'E-Mail', type: 'text' },
        password: { label: 'Пароль', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const values = {
          email: credentials.email,
        };

        const findUser = await prisma.user.findFirst({
          where: values,
        });
        if (!findUser) {
          console.log('пользователь не найден');
          return null;
        }

        const isPasswordValid = await compare(credentials.password, findUser.password);

        if (!isPasswordValid) {
          console.log('неправильный пароль');
          return null;
        }

        if (!findUser.verified) {
          console.log('пользователь не верифицирован');
          return null;
        }

        return {
          id: Number(findUser.id),
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role as UserRole,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        }

        console.log(user, account);

        if (!user.email) {
          console.log('No email provided');
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              { provider: account?.provider, providerId: account?.providerAccountId },
              { email: user.email },
            ],
          },
        });

        if (findUser) {
          console.log('firstUser - есть', findUser);
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
          return true;
        }

        console.log('firstUser - нет', findUser);

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || 'User #' + user.id,
            password: hashSync(user.id.toString(), 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
            role: 'USER' as UserRole,
          },
        });

        return true;
      } catch (error) {
        console.log('Error [SignIn]', error);
        return false;
      }
    },
    async jwt({ token }) {
      // const DEFAULT_ROLE = 'USER';
      if (token.email) {
        const findUser = await prisma.user.findFirst({
          where: {
            email: token.email,
          },
        });

        if (findUser) {
          token.id = String(findUser.id);
          token.email = findUser.email?.toString() ?? '';
          token.fullName = findUser.fullName;
          if (findUser.role) {
            token.role = findUser.role as UserRole;
          }
        } else {
          // Обработка случая, когда email отсутствует
          console.error('Email is null or undefined');
        }
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        // console.log('session', session);
        session.user.id = token.id;
        session.user.role = token.role;
      }
      // console.log('session + id , role', session);

      return session;
    },
  },
};
