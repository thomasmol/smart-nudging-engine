import type { Configuration } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/configurations/${params.id}`);

	const configuration: Configuration = await response.json();
	return { configuration };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const id = params.id;
		const name = data.get('name');
		const start_datetime = data.get('start_datetime');
		const end_datetime = data.get('end_datetime');
		const algorithm = data.get('algorithm');
		if (!id || !name || !start_datetime || !end_datetime || !algorithm) {
			return {
				success: false
			};
		}

		const response = await fetch(`/api/configurations/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				start_datetime,
				end_datetime,
				algorithm
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
