import prisma from '$lib/database';
import type { Nudgee } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const nudgee: Nudgee = await prisma.nudgee.findFirstOrThrow({
		where: { id: params.id },
		include: {
			Action: true,
			NudgeRecipient:{
				include: {
					Nudge: true
				}
			}
		}
	});
	return new Response(JSON.stringify(nudgee));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
	const { profile } = await request.json();
	if (!profile) {
		throw new Error('Missing required params');
	}
	const id = params.id;
	const nudgee: Nudgee = await prisma.nudgee.update({
		where: { id },
		data: {
			profile
		},
		include: {
			Action: true
		}
	});

	return new Response(JSON.stringify(nudgee));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	await prisma.nudgee.delete({
		where: { id: params.id }
	});

	return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
