import type { Actions, PageServerLoad } from './$types';
import type { ComponentType, Group, MetricType } from '@prisma/client';

export const load = (async ({ fetch }) => {
	const response = await fetch('/api/components');
	const componentTypes: ComponentType[] = await response.json();
	const responseGroups = await fetch('/api/groups');
	const groups: Group[] = await responseGroups.json();
	const responseMetrics = await fetch('/api/metrics');
	const metricTypes: MetricType[] = await responseMetrics.json();

	return { componentTypes, groups, metricTypes };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const name = data.get('name');
		const start_datetime = data.get('start_datetime');
		const end_datetime = data.get('end_datetime');
		const algorithm = data.get('algorithm');
		const decision_time_weight = parseFloat(data.get('decision_time_weight') as string);
		const metric_types = data.getAll('metric_types');
		const metric_type_weights = data.getAll('metric_type_weights') as string[];
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
		// zip the metric types and weights
		const metric_type_weights_zipped = metric_types.map((type, index) => ({
			metric_type_id: type,
			weight: parseFloat(metric_type_weights[index])
		}));

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
				decision_time_weight,
				groups,
				metric_type_weights_zipped
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
