import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const withPrisma = async <T>(fn: (client: PrismaClient) => Promise<T>): Promise<T> => {
  try {
    return await fn(prisma);
  } finally {
    // no-op
  }
};
