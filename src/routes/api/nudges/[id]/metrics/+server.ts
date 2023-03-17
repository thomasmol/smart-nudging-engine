import prisma from '$lib/database';
import type { RequestHandler } from './$types';

export const POST = (async ({ params, request }) => {
	const nudge_id = params.id;
	const { metric_type_ids } = await request.json();
	const nudgeNudgeMetricsData = metric_type_ids.map((metric_type_id: string) => {
		return {
			metric_type_id: metric_type_id,
			nudge_id
		};
	});
	const response = await prisma.nudgeMetric.createMany({
		data: nudgeNudgeMetricsData,
    skipDuplicates: true
	});

	return new Response(JSON.stringify(response));
}) satisfies RequestHandler;
