import prisma from '$lib/database';
import type { MetricType } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const metricType: MetricType = await prisma.metricType.findFirstOrThrow({
		include: {
			NudgeMetric: true,
			Action: true
		},
		where: { id: params.id }
	});
	return new Response(JSON.stringify(metricType));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
	const { label, type } = await request.json();
	const id = params.id;
	console.log(label, type, id);
	const metricType: MetricType = await prisma.metricType.update({
		where: { id },
		data: {
			label,
			type
		}
	});

	return new Response(JSON.stringify(metricType));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	await prisma.metricType.delete({
		where: { id: params.id }
	});

	return new Response(JSON.stringify({success:true}));
}) satisfies RequestHandler;
