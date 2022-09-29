import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const configuration = await prisma.configuration.findFirst({ where: { id: params.slug } });
	const nudges = await prisma.nudge.findMany({
		include: { ActivityType: true, Channel: true, Timeframe: true, Category: true, Nudgee: true }
	});
	if (configuration || nudges) {
		return { configuration, nudges };
	}
};
