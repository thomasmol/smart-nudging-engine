import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const load = async () => {
  const timeframes = await prisma.timeframe.findMany();
 
  if (timeframes) {
    return {timeframes};
  }
};