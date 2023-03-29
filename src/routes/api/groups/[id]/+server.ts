import type { RequestHandler } from './$types';
import type { Group } from '@prisma/client';
import prisma from '$lib/database';

export const GET = (async ({ params }) => {
	const group: Group = await prisma.group.findFirstOrThrow({
		where: {
			id: params.id
		},
		include: {
			NudgeeGroup: {
				include: {
					Nudgee: true
				}
			}
		}
	});
	return new Response(JSON.stringify(group));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
	const { name, control } = await request.json();
	if (!name || control == null) {
		throw new Error('Missing required params');
	}

	const group: Group = await prisma.group.update({
		where: {
			id: params.id
		},
		data: {
			name,
			control
		},
		include: {
			NudgeeGroup: {
				include: {
					Nudgee: true
				}
			}
		}
	});
	return new Response(JSON.stringify(group));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	await prisma.group.delete({
		where: { id: params.id }
	});

	return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
