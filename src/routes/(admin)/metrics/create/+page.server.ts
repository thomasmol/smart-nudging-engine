import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const label = data.get('label');
		const type = data.get('type');
		if (!label || !type ) {
			return {
				success: false
			};
		}
		const response = await fetch(`/api/metrics`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label,
				type
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
