import type { RequestHandler } from './$types';
import type { Nudge } from '@prisma/client';
import prisma from '$lib/database';
import { error } from '@sveltejs/kit';
import openai from '$lib/openai';

export const GET = (async ({ params }) => {
	const configuration = await prisma.configuration.findFirstOrThrow({ where: { id: params.slug } });
	const nudgee = await prisma.nudgee.findFirstOrThrow();


	/* const presentDatetime = new Date(timeframe.start_time);
	presentDatetime.setSeconds(timeframe.start_time.getSeconds() + 123);

	const prompt: string =
		'Create 1 encouraging nudge that will encourage me to ' +
		activityType.name +
		' in ' +
		timeframe.name +
		' time. ';

	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: prompt,
		temperature: 0.5,
		n: 1,
		max_tokens: 150
	});
	const text: string = response.data.choices[0].text?.replaceAll('"', '') ?? '';*/
	const nudge: Nudge = await prisma.nudge.create({
		data: {
			content_type: 'text',
			content: 'test',
			generated: true,
		}
	});

	if (nudge) {
		return new Response(JSON.stringify(nudge));
	}
	throw error(404, 'Not found');
}) satisfies RequestHandler;
