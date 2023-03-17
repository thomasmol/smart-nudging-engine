import type { Nudge} from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/nudges/${params.id}`);
	const nudge: Nudge = await response.json();
	return { nudge };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const content_type = data.get('content_type');
		const content = data.get('content');
		const generated = data.has('generated');
		const id = params.id;
		if (!content_type || !content || generated == null) {
			return {
				success: false
			};
		}

		const response = await fetch(`/api/nudges/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content_type,
				content,
				generated
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
		await fetch(`/api/nudges/${params.id}`, {
			method: 'DELETE'
		});
		throw redirect(303, '/nudges');
	}

} satisfies Actions;
