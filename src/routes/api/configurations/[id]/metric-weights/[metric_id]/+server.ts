import prisma from '$lib/database';
import type { MetricTypeWeight } from '@prisma/client';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, params }) => {
	const { id, metric_id } = params;
	let { weight } = await request.json();
	if (!id || !metric_id || !weight) {
		throw new Error('Missing required parameters');
	}
	weight = parseFloat(weight);

	const metricTypeWeight: MetricTypeWeight = await prisma.metricTypeWeight.create({
		data: {
			configuration_id: id,
			metric_type_id: metric_id,
			weight: weight
		}
	});
	return new Response(JSON.stringify(metricTypeWeight));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
	const { id, metric_id } = params;
	let { weight } = await request.json();
	if (!id || !metric_id || !weight) {
		throw new Error('Missing required parameters');
	}
	weight = parseFloat(weight);

	const metricTypeWeight: MetricTypeWeight = await prisma.metricTypeWeight.update({
		data: {
			configuration_id: id,
			metric_type_id: metric_id,
			weight: weight
		},
		where: {
			configuration_id_metric_type_id: {
				configuration_id: id,
				metric_type_id: metric_id
			}
		}
	});
	return new Response(JSON.stringify(metricTypeWeight));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	const { id, metric_id } = params;
	if (!id || !metric_id) {
		throw new Error('Missing required parameters');
	}

	const metricTypeWeight: MetricTypeWeight = await prisma.metricTypeWeight.delete({
		where: {
			configuration_id_metric_type_id: {
				configuration_id: id,
				metric_type_id: metric_id
			}
		}
	});
	return new Response(JSON.stringify(metricTypeWeight));
}) satisfies RequestHandler;
