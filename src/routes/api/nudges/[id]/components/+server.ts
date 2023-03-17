import prisma from '$lib/database';
import type { RequestHandler } from './$types';

export const POST = (async ({ params, request }) => {
	const nudge_id = params.id;
	const { component_value_ids } = await request.json();
	const nudgeComponentValuesData = component_value_ids.map((component_value_id: string) => {
		return {
			component_value_id: component_value_id,
			nudge_id
		};
	});
	const response = await prisma.usedComponent.createMany({
		data: nudgeComponentValuesData,
    skipDuplicates: true
	});

	return new Response(JSON.stringify(response));
}) satisfies RequestHandler;
