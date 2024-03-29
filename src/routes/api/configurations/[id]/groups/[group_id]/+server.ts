import prisma from '$lib/database';
import type { RequestHandler } from './$types';

export const POST = (async ({ params }) => {
	const configuration_id = params.id;
	const group_id = params.group_id;

	const response = await prisma.groupConfiguration.create({
		data: {
			configuration_id,
			group_id
		}
	});

	return new Response(JSON.stringify(response));
}) satisfies RequestHandler;

export const PUT = (async ({ params }) => {
	const configuration_id = params.id;
	const group_id = params.group_id;

	const response = await prisma.groupConfiguration.update({
		data: {
			configuration_id,
			group_id
		},
		where: {
			group_id_configuration_id: {
				configuration_id,
				group_id
			}
		}
	});

	return new Response(JSON.stringify(response));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	const configuration_id = params.id;
	const group_id = params.group_id;

	await prisma.groupConfiguration.delete({
		where: {
			group_id_configuration_id: {
				configuration_id,
				group_id
			}
		}
	});
	return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
