import prisma from '$lib/database';
import type { Action } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const action: Action = await prisma.action.findFirstOrThrow({
		include: {
			Nudgee: true,
			MetricType: true,

		},
		where: { id: params.id }
	});
	return new Response(JSON.stringify(action));
}) satisfies RequestHandler;
