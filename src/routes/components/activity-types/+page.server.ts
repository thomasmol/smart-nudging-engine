import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const load = async () => {
  const activityTypes = await prisma.activityType.findMany();
 
  if (activityTypes) {
    return {activityTypes};
  }
};