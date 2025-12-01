import { PrismaClient } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = "mockedUser";
  const password = "Password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  let user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        token: null,
      },
    });
    console.log("Mocked user created!");
  } else {
    console.log("User already exists");
  }

  const existingSplit = await prisma.split.findFirst({
    where: { userId: user.id },
  });

  if (!existingSplit) {
    await prisma.split.create({
      data: {
        title: "Mocked Split",
        slug: "mocked-split",
        userId: user.id,
      },
    });

    console.log("Mocked split created!");
  } else {
    console.log("Split already exists for this user");
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
