import prisma from '$lib/database';
import type { Configuration } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	const configurations: Configuration[] = await prisma.configuration.findMany({
		include: {
			GroupConfiguration: {
				include: {
					Group: {
						include: {
							NudgeeGroup: true
						}
					}
				}
			},
			MetricTypeWeight: true,
			NudgeeWeights: true
		}
	});
	return new Response(JSON.stringify(configurations));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const {
		name,
		algorithm,
		generate,
		generate_model,
		deconstructed_prompt,
		decision_time_weight,
		start_datetime,
		end_datetime,
		groups,
		metric_type_weights_zipped
	} = await request.json();
	if (!name || !algorithm || !start_datetime || !end_datetime) {
		throw new Error('Missing required parameters');
	}

	const configuration: Configuration = await prisma.configuration.create({
		data: {
			name: name,
			algorithm: algorithm,
			generate: generate,
			generate_model: generate_model,
			deconstructed_prompt: deconstructed_prompt,
			decision_time_weight: decision_time_weight,
			start_datetime: new Date(start_datetime),
			end_datetime: new Date(end_datetime),
			GroupConfiguration: {
				create: groups.map((group: string) => ({
					group_id: group
				}))
			},
			MetricTypeWeight: {
				createMany: { data: metric_type_weights_zipped }
			}
		}
	});
	return new Response(JSON.stringify(configuration));
}) satisfies RequestHandler;
