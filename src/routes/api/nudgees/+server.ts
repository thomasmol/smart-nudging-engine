import prisma from '$lib/database';
import type { Nudgee } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	const nudgees: Nudgee[] = await prisma.nudgee.findMany({
		include: {
			Action: true
		}
	});
	return new Response(JSON.stringify(nudgees));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { id, profile } = await request.json();
	if (!profile) {
		throw new Error('Missing required params');
	}

	const nudgee: Nudgee = await prisma.nudgee.create({
		data: {
			id: id || null,
			profile: profile
		}
	});
	return new Response(JSON.stringify(nudgee));
}) satisfies RequestHandler;
