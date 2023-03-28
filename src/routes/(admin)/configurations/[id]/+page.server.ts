import type { ComponentType, Configuration } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/configurations/${params.id}`);
	const configuration: Configuration = await response.json();

	const responseComponents = await fetch('/api/components');
	const componentTypes : ComponentType[] = await responseComponents.json();
	return { configuration, componentTypes };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const id = params.id;
		const name = data.get('name');
		const start_datetime = data.get('start_datetime');
		const end_datetime = data.get('end_datetime');
		const algorithm = data.get('algorithm');
		const decision_time_weight = parseFloat(data.get('decision_time_weight') as string);
		const groups = data.getAll('groups');
		const prompt_types = data.getAll('prompt[type][]');
		const prompt_contents = data.getAll('prompt[content][]');
		const generate = data.has('generate');
		const generate_model = data.get('generate_model');
		if (!id || !name || !start_datetime || !end_datetime || !algorithm) {
			return {
				success: false
			};
		}
		const deconstructed_prompt = prompt_types.map((type, index) => ({
			type,
			content: prompt_contents[index]
		}));

		const response = await fetch(`/api/configurations/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				start_datetime,
				end_datetime,
				generate,
				generate_model,
				algorithm,
				deconstructed_prompt,
				decision_time_weight,
				groups
			})
		});

		if (!response.ok) {
			return {
				success: false
			};
		}
		return {
			success: true
		};
	},
	destroy: async ({ params, fetch }) => {
		await fetch(`/api/configurations/${params.id}`, {
			method: 'DELETE'
		});
		throw redirect(303, '/configurations');
	}
} satisfies Actions;
