import type { Group } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/groups/${params.id}`);

	const group: Group = await response.json();
	return { group };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const name = data.get('name');
		const control = data.has('control');
		const id = params.id;
		if (!name || !id || control == null) {
			return {
				success: false
			};
		}

		const response = await fetch(`/api/groups/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				name,
				control
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
		await fetch(`/api/groups/${params.id}`, {
			method: 'DELETE'
		});
		throw redirect(303, '/groups');
	},
	addnudgees: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const nudgees = data.getAll('nudgees');
		const id = params.id;
		if (!nudgees || !id) {
			return {
				success: false
			};
		}
		const response = await fetch(`/api/groups/${id}/nudgees`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nudgees
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
