import { PrismaClient } from '@prisma/client';
import {error} from '@sveltejs/kit';
const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const configuration = await prisma.configuration.findFirst({ where: { id: params.slug } });
	const nudges = await prisma.nudge.findMany({
		orderBy:[{created_at: 'desc'}],
		include: { ActivityType: true, Channel: true, Timeframe: true, Category: true, Nudgee: true },
		where: { configuration_id: params.slug }
	});
	if (configuration || nudges) {
		return { configuration, nudges };
	}

	throw error(404, 'Not found');
};
