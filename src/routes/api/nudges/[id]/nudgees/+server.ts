import prisma from '$lib/database';
import type { RequestHandler } from './$types';

export const POST = (async ({ params, request }) => {
	const nudge_id = params.id;
	const { nudgee_ids } = await request.json();
	const nudgeNudgeeData = nudgee_ids.map((nudgee_id: string) => {
		return {
			nudgee_id: nudgee_id,
			nudge_id
		};
	});
	const response = await prisma.nudgeRecipient.createMany({
		data: nudgeNudgeeData,
    skipDuplicates: true
	});

	return new Response(JSON.stringify(response));
}) satisfies RequestHandler;
