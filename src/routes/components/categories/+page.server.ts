import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const load = async () => {
  const categories = await prisma.category.findMany();
 
  if (categories) {
    return {categories};
  }
};