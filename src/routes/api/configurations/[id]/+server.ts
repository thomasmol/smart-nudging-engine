import type { RequestHandler } from './$types';
import type { Configuration } from '@prisma/client';
import prisma from '$lib/database';

export const GET = (async ({ params }) => {
	const configuration: Configuration = await prisma.configuration.findFirstOrThrow({
		where: { id: params.id },
		include: {
			GroupConfiguration: {
				include: {
					Group: {
						include: {
							NudgeeGroup: {
								include: {
									Nudgee: {
										include: {
											NudgeRecipient: {
												include: {
													Nudge: true
												}
											},
											Action: {
												include: {
													MetricType: true
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			MetricTypeWeight: {
				include: {
					MetricType: true
				}
			},
			NudgeeWeights: true
		}
	});
	return new Response(JSON.stringify(configuration));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
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
	const { id } = params;
	if (!id || !name || !algorithm || !start_datetime || !end_datetime) {
		throw new Error('Missing required parameters');
	}

	// easier than trying to figure out how to do this in one query
	await prisma.groupConfiguration.deleteMany({
		where: {
			configuration_id: id
		}
	});

	// easier than trying to figure out how to do this in one query
	await prisma.metricTypeWeight.deleteMany({
		where: {
			configuration_id: id
		}
	});

	const configuration: Configuration = await prisma.configuration.update({
		where: { id },
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
				create: groups.map((group: any) => ({
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

export const DELETE = (async ({ params }) => {
	await prisma.configuration.delete({
		where: { id: params.id }
	});

	return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
