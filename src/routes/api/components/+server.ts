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
	const { label, dataType } = await request.json();
	if (!label || !dataType) {
		throw new Error('Missing required params');
	}

	const componentType: ComponentType = await prisma.componentType.create({
		data: {
			label,
			data_type: dataType
		}
	});
	return new Response(JSON.stringify(componentType));
}) satisfies RequestHandler;
