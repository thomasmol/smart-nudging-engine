import prisma from '$lib/database';
import type { ComponentValue } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const componentValue: ComponentValue = await prisma.componentValue.findFirstOrThrow({
		where: { id: params.value_id, component_type_id: params.id },
		include: {
			ComponentType: true
		}
	});
	return new Response(JSON.stringify(componentValue));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
	const { value } = await request.json();
	const type_id = params.id;
	const value_id = params.value_id;
	if (!value || !value_id || !type_id) {
		throw new Error('Missing required parameters');
	}
	const componentValue: ComponentValue = await prisma.componentValue.update({
		where: { id: value_id },
		data: {
			component_type_id: type_id,
			value: value
		},
		include: {
			ComponentType: true
		}
	});

	return new Response(JSON.stringify(componentValue));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	await prisma.componentValue.delete({
		where: { id: params.value_id }
	});

	return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
