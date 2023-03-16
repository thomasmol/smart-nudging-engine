import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const label = data.get('label');
		const data_type = data.get('data_type');
		if (!label || !data_type) {
			return {
				success: false
			};
		}
		const response = await fetch(`/api/components`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label,
				data_type
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
