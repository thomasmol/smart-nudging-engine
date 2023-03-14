import prisma from '$lib/database';
import type { Nudgee } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const nudgees: Nudgee[] = await prisma.nudgee.findMany();

	return new Response(JSON.stringify(nudgees));
};

export const POST = (async () => {
	/* if (!label || !dataType) {
		throw new Error('Missing required params');
	} */
	const nudgee: Nudgee = await prisma.nudgee.create({ data: {
		profile: {}
	} });
	return new Response(JSON.stringify(nudgee));
}) satisfies RequestHandler;
