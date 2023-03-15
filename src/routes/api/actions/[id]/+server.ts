import prisma from '$lib/database';
import type { Action } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const action: Action = await prisma.action.findFirstOrThrow({
		include: {
			Nudgee: true,
			MetricType: {
				include: {
					NudgeMetric: {
						include: {
							Nudge: true
						}
					}
				}
			}
		},
		where: { id: params.id }
	});
	return new Response(JSON.stringify(action));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
	const { nudgee_id, metric_type_id, metric_value } = await request.json();
	if (!nudgee_id || !metric_type_id || !metric_value) {
		throw new Error('Missing required parameters');
	}
	const id = params.id;
	const action: Action = await prisma.action.update({
		where: { id },
		data: {
			nudgee_id,
			metric_type_id,
			metric_value
		},
		include: {
			Nudgee: true,
			MetricType: true
		}
	});

	return new Response(JSON.stringify(action));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	await prisma.action.delete({
		where: { id: params.id }
	});

	return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
