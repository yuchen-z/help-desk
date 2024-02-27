const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      password: 'admin',
      email: 'admin@test.com',
    },
  });

  console.log(`Created user with ID: ${adminUser.id}`);

  const ticket = await prisma.ticket.create({
    data: {
      name: 'Robin Z',
      email: 'robin@test-user.com',
      description: 'Starter ticket',
      status: 'OPEN',
    },
  });

  console.log(`Created ticket with ID: ${ticket.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
