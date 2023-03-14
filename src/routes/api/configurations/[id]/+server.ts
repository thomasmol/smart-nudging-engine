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
	const { name, algorithm, reactionWaitTime, startTime } = await request.json();
	const id = params.id;
	if (!name || !algorithm || !reactionWaitTime || !startTime || !id) {
		throw new Error('Missing required parameters');
	}
	const configuration: Configuration = await prisma.configuration.update({
		where: { id },
		data: {
			name: name,
			algorithm: algorithm,
			reaction_wait_time: reactionWaitTime,
			start_time: new Date(startTime)
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
