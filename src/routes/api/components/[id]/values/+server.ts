import prisma from '$lib/database';
import type { ComponentValue } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const compontentValues: ComponentValue[] = await prisma.componentValue.findMany({
		where: { component_type_id: params.id },
		include: {
			ComponentType: true
		}
	});
	return new Response(JSON.stringify(compontentValues));
}) satisfies RequestHandler;

export const POST = (async ({ request, params }) => {
	const { value } = await request.json();
	const id = params.id;
	if (!value || !id) {
		throw new Error('Missing required parameters');
	}
	const componentValue: ComponentValue = await prisma.componentValue.create({
		data: {
			component_type_id: id,
			value: value
		}
	});
	return new Response(JSON.stringify(componentValue));
}) satisfies RequestHandler;
