import prisma from '$lib/database';
import type { Nudge } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const nudge: Nudge = await prisma.nudge.findFirstOrThrow({
		include: {
			NudgeMetric: true,
			UsedComponent: true,
			NudgeRecipient: true
		},
		where: { id: params.id }
	});
	return new Response(JSON.stringify(nudge));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
	const { content_type, content, generated } = await request.json();
	if (!content_type || !content || !generated) {
		throw new Error('Missing required parameters');
	}
	const id = params.id;
	const nudge: Nudge = await prisma.nudge.update({
		where: { id },
		data: {
			content_type,
			content,
			generated
		},
		include: {
			NudgeMetric: true,
			UsedComponent: true,
			NudgeRecipient: true
		}
	});

	return new Response(JSON.stringify(nudge));
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	await prisma.nudge.delete({
		where: { id: params.id }
	});

	return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
