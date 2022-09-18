import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const load = async () => {
  const nudgees = await prisma.nudgee.findMany();
 
  if (nudgees) {
    return {nudgees};
  }
};