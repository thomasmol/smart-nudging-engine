import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const name = data.get('name');
		if (!name) {
			return {
				success: false
			};
		}
		const response = await fetch(`/api/groups`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name
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
