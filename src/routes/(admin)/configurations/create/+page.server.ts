import type { Actions, PageServerLoad } from './$types';
import type { ComponentType, Group } from '@prisma/client';

export const load = (async ({ fetch }) => {
	const response = await fetch('/api/components');
	const componentTypes: ComponentType[] = await response.json();
	const responseGroups = await fetch('/api/groups');
	const groups: Group[] = await responseGroups.json();
	return { componentTypes, groups };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const name = data.get('name');
		const start_datetime = data.get('start_datetime');
		const end_datetime = data.get('end_datetime');
		const algorithm = data.get('algorithm');
		const prompt_types = data.getAll('prompt[type][]');
		const prompt_contents = data.getAll('prompt[content][]');
		const groups = data.getAll('groups');
		const generate = data.has('generate');
		const generate_model = data.get('generate_model');

		if (!name || !start_datetime || !end_datetime || !algorithm) {
			return {
				success: false
			};
		}
		if (generate && !generate_model) {
			return {
				success: false
			};
		}
		if (prompt_types.length !== prompt_contents.length) {
			return {
				success: false
			};
		}

		const deconstructed_prompt = prompt_types.map((type, index) => ({
			type,
			content: prompt_contents[index]
		}));


		const response = await fetch(`/api/configurations`, {
			method: 'POST',
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
	}
} satisfies Actions;
