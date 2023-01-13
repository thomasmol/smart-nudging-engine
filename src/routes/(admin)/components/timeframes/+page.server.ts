import { PrismaClient, type Timeframe } from "@prisma/client";
const prisma = new PrismaClient();

export const load = async () => {
  const timeframes : Timeframe[] = await prisma.timeframe.findMany();

  if (timeframes) {
    return {timeframes};
  }
};