import type { RequestHandler } from './$types';
import type { Group } from '@prisma/client';
import prisma from '$lib/database';

export const GET = (async () => {
	const groups: Group[] = await prisma.group.findMany({
		include: {
			NudgeeGroup: {
				include: {
					Nudgee: true
				}
			},
		}
	});
	return new Response(JSON.stringify(groups));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { name } = await request.json();
	if (!name) {
		throw new Error('Missing required params');
	}

	const group: Group = await prisma.group.create({
		data: {
			name
		}
	});
	return new Response(JSON.stringify(group));
}) satisfies RequestHandler;
