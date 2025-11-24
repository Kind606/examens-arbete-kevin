import { PrismaClient } from "@prisma/client/extension";

export const db = new PrismaClient({
  adapter: {
    provider: "postgresql",
    url: process.env.DATABASE_URL!,
  },
});
