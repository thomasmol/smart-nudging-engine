import prisma from '$lib/database';
import type { Configuration } from '@prisma/client';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	const configurations: Configuration[] = await prisma.configuration.findMany();
	return new Response(JSON.stringify(configurations));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const {
		name,
		algorithm,
		generate,
		generate_model,
		deconstructed_prompt,
		start_datetime,
		end_datetime
	} = await request.json();
	if (!name || !algorithm || !start_datetime || !end_datetime) {
		throw new Error('Missing required parameters');
	}

	const configuration: Configuration = await prisma.configuration.create({
		data: {
			name: name,
			algorithm: algorithm,
			generate: generate,
			generate_model: generate_model,
			deconstructed_prompt: deconstructed_prompt,
			start_datetime: new Date(start_datetime),
			end_datetime: new Date(end_datetime)
		}
	});
	return new Response(JSON.stringify(configuration));
}) satisfies RequestHandler;
