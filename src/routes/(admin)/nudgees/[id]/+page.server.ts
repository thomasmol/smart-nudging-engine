import type { Nudgee} from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/nudgees/${params.id}`);

	const nudgee: Nudgee = await response.json();
	return { nudgee };
}) satisfies PageServerLoad;


export const actions = {
	update: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const new_id = data.get('id');
		const profile = data.get('profile');
		const id = params.id;
		if (!new_id || !profile || !id) {
			return {
				success: false
			};
		}

		const response = await fetch(`/api/nudgees/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				new_id,
				profile
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
		await fetch(`/api/nudgees/${params.id}`, {
			method: 'DELETE'
		});
		throw redirect(303, '/nudgees');
	}

} satisfies Actions;
