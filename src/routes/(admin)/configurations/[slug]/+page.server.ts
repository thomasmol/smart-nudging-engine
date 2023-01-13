import prisma from '$lib/database';
import {error} from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const configuration = await prisma.configuration.findFirst({ where: { id: params.slug } });
	const nudges = await prisma.nudge.findMany({
		orderBy:[{created_at: 'desc'}],
		include: { ActivityType: true, Timeframe: true, Nudgee: true, UsedComponent: true },
		where: { configuration_id: params.slug }
	});
	if (configuration || nudges) {
		return { configuration, nudges };
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
