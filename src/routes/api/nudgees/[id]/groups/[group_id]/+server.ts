import prisma from '$lib/database';
import type { RequestHandler } from './$types';

export const POST = (async ({ params }) => {
	const nudgee_id = params.id;
	const group_id = params.group_id;

	const response = await prisma.nudgeeGroup.create({
		data: {
			nudgee_id,
			group_id
		}
	});

	return new Response(JSON.stringify(response));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	const nudgee_id = params.id;
	const group_id = params.group_id;

	await prisma.nudgeeGroup.delete({
		where: {
			nudgee_id_group_id: {
				nudgee_id,
				group_id
			}
		}
	});
	return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
