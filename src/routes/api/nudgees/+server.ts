import prisma from '$lib/database';
import type { Nudgee } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	const nudgees: Nudgee[] = await prisma.nudgee.findMany({
		include: {
			Action: true,
			NudgeRecipient: {
				include: {
					Nudge: true
				}
			},
			NudgeeGroup: {
				include: {
					Group: true
				}
			}
		}
	});
	return new Response(JSON.stringify(nudgees));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { id, profile } = await request.json();
	if (!profile) {
		throw new Error('Missing required params');
	}
	
	let data;
	if (id) {
		data = {
			id: id,
			profile: profile
		};
	} else {
		data = {
			profile: profile
		};
	}


	const nudgee: Nudgee = await prisma.nudgee.create({
		data: data
	});
	return new Response(JSON.stringify(nudgee));
}) satisfies RequestHandler;
