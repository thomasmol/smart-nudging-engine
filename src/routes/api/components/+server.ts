import type { RequestHandler } from './$types';
import type { ComponentType } from '@prisma/client';
import prisma from '$lib/database';

export const GET = (async () => {
	const compontentTypes: ComponentType[] = await prisma.componentType.findMany({
		include: {
			ComponentValue: true
		}
	});
	return new Response(JSON.stringify(compontentTypes));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { label, data_type } = await request.json();
	if (!label || !data_type) {
		throw new Error('Missing required params');
	}

	const componentType: ComponentType = await prisma.componentType.create({
		data: {
			label,
			data_type
		}
	});
	return new Response(JSON.stringify(componentType));
}) satisfies RequestHandler;
