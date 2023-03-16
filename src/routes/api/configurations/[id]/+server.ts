import type { RequestHandler } from './$types';
import type { Configuration } from '@prisma/client';
import prisma from '$lib/database';

export const GET = (async ({ params }) => {
	const configuration: Configuration = await prisma.configuration.findFirstOrThrow({
		where: { id: params.id }
	});
	return new Response(JSON.stringify(configuration));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
	const { name, algorithm, start_datetime, end_datetime } = await request.json();
	const { id } = params;
	if (!id || !name || !algorithm || !start_datetime || !end_datetime) {
		throw new Error('Missing required parameters');
	}
	const configuration: Configuration = await prisma.configuration.update({
		where: { id },
		data: {
			name: name,
			algorithm: algorithm,
			start_datetime: new Date(start_datetime),
			end_datetime: new Date(end_datetime)
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
