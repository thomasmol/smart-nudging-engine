import type { RequestHandler } from './$types';
import type { ActivityType } from '@prisma/client';
import prisma from '$lib/database';

export const GET = (async () => {
	const activityTypes: ActivityType[] = await prisma.activityType.findMany();
	return new Response(JSON.stringify(activityTypes));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { name } = await request.json();
	if (!name) {
		throw new Error('Missing required params');
	}

	const activityType: ActivityType = await prisma.activityType.create({
		data: {
			name: name
		}
	});
	return new Response(JSON.stringify(activityType));
}) satisfies RequestHandler;
