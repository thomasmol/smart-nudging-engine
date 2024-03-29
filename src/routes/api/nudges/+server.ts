import prisma from '$lib/database';
import type { RequestHandler } from './$types';
import type { Nudge } from '@prisma/client';

export const GET = (async () => {
	const nudges: Nudge[] = await prisma.nudge.findMany({
		include: {
			NudgeMetric: {
				include: {
					MetricType: true
				}
			},
			UsedComponent: {
				include: {
					ComponentValue: {
						include: {
							ComponentType: true
						}
					}
				}
			},
			NudgeRecipient: {
				include: {
					Nudgee: true
				}
			}
		},
	});
	return new Response(JSON.stringify(nudges));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { content_type, content, generated } = await request.json();
	if (!content_type || !content || generated == null) {
		throw new Error('Missing required parameters');
	}

	const nudge: Nudge = await prisma.nudge.create({
		data: {
			content_type,
			content,
			generated
		}
	});
	return new Response(JSON.stringify(nudge));
}) satisfies RequestHandler;
