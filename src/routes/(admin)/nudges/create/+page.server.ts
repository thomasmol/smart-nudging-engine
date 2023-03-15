import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const content_type = data.get('content_type');
		const content = data.get('content');
		const generated = data.has('generated');
		console.log(generated);
		if (!content_type || !content || generated == null) {
			return {
				success: false
			};
		}


		const response = await fetch(`/api/nudges`, {
			method: 'POST',
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
	}


} satisfies Actions;
