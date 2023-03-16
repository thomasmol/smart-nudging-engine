import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import type { ComponentType } from '@prisma/client';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/components/${params.id}`);

	const componentType: ComponentType = await response.json();
	return { componentType };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch, params }) => {
		const data = await request.formData();
		const component_id = params.id;
		const value = data.get('value');
		if (!component_id || !value) {
			return {
				success: false
			};
		}
		const response = await fetch(`/api/components/${component_id}/values`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				value
			})
		});

		if (!response.ok) {
			return {
				success: false
			};
		}
		throw redirect(303, `/components/${component_id}`);
	}
} satisfies Actions;
