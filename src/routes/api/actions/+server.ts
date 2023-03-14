import type { RequestHandler } from './$types';
import type {  Action } from '@prisma/client';
import prisma from '$lib/database';

export const GET = (async () => {
	const actions:Action[] = await prisma.action.findMany();
	return new Response(JSON.stringify(actions));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { nudgee_id, metric_type_id, metric_value } = await request.json();
	if (!nudgee_id || !metric_type_id || !metric_value) {
		throw new Error('Missing required parameters');
	}

	const action: Action = await prisma.action.create({
		data: {
			nudgee_id,
			metric_type_id,
			metric_value
		}
	});
	return new Response(JSON.stringify(action));
}) satisfies RequestHandler;
