import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const load = async () => {
  const channels = await prisma.channel.findMany();
 
  if (channels) {
    return {channels};
  }
};