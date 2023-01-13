import type { RequestHandler } from './$types';
import type { Timeframe } from '@prisma/client';
import prisma from '$lib/database';

export const GET = (async () => {
	const timeframes: Timeframe[] = await prisma.timeframe.findMany();
	return new Response(JSON.stringify(timeframes));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { name, startTime, endTime } = await request.json();
	if (!name || !startTime || !endTime) {
		throw new Error('Missing required params');
	}
	console.log(new Date());

	const timeframe: Timeframe = await prisma.timeframe.create({
		data: {
			name: name,
			start_time: new Date('January 1 2023 ' + startTime + ':00'),
			end_time: new Date('January 1 2023 ' + endTime + ':00')
		}
	});
	return new Response(JSON.stringify(timeframe));
}) satisfies RequestHandler;
