import prisma from '$lib/database';
import type { Configuration } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	const configurations: Configuration[] = await prisma.configuration.findMany();
	return new Response(JSON.stringify(configurations));
}) satisfies RequestHandler;

export const POST = (async ({request}) => {
  const { name, algorithm, reactionWaitTime, startTime } = await request.json();

	const configuration: Configuration = await prisma.configuration.create({
		data: {
      name: name,
      algorithm: algorithm,
      reaction_wait_time: reactionWaitTime,
      start_time: new Date(startTime),
    }
	});
	return new Response(JSON.stringify(configuration));
}) satisfies RequestHandler;
