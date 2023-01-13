import type { RequestHandler } from './$types';
import type { Nudge } from '@prisma/client';
import prisma from '$lib/database';
import { error } from '@sveltejs/kit';
import openai from '$lib/openai';

export const GET = (async ({ params }) => {
	const configuration = await prisma.configuration.findFirstOrThrow({ where: { id: params.slug } });
	const timeframes = await prisma.timeframe.findMany();
	const activityTypes = await prisma.activityType.findMany();
	const nudgee = await prisma.nudgee.findFirstOrThrow();

	const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];
	const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];

	const presentDatetime = new Date(timeframe.start_time);
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
	const text: string = response.data.choices[0].text?.replaceAll('"', '') ?? '';
	const nudge: Nudge = await prisma.nudge.create({
		data: {
			text: text,
			nudgee_id: nudgee.id,
			activity_type_id: activityType.id,
			timeframe_id: timeframe.id,
			configuration_id: configuration.id,
			effectiveness: 0,
			present_datetime: timeframe.start_time,
			reaction_wait_datetime: timeframe.end_time
		}
	});

	if (nudge) {
		return new Response(JSON.stringify(nudge));
	}
	throw error(404, 'Not found');
}) satisfies RequestHandler;
