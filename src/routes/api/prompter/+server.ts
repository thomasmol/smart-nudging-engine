import type { RequestHandler } from './$types';
import openai from '$lib/openai';

export const GET: RequestHandler = async () => {
	const response = await openai.createCompletion({
		model: 'davinci',
		prompt: 'tell me a joke about skiing in france',
		temperature: 0,
	});
	console.log(response.data);

	return new Response();
};
