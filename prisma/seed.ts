import { hashSync } from 'bcrypt';
import { prisma } from './PrismaClient';

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User',
        email: 'user@test.com',
        password: hashSync('111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin',
        email: 'admin@test.com',
        password: hashSync('333', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconect();
    process.exit(1);
  });
