import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const load = async () => {
  const configurations = await prisma.configuration.findMany();
 
  if (configurations) {
    return {configurations};
  }
};