import bcrypt from "bcryptjs";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const username = "mockedUser";
  const password = "Password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { username } });
  if (!existing) {
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        token: null, // initially no token
      },
    });
    console.log("Mocked user created!");
  } else {
    console.log("User already exists");
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
