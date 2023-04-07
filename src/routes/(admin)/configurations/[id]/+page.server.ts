import type { Action, ComponentType, Configuration, Nudge, NudgeRecipient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/configurations/${params.id}`);
	const configuration: Configuration = await response.json();

	// calculate effectiveness for each nudge
	const actions: Action[] = configuration.GroupConfiguration.reduce((acc, groupConfiguration) => {
		return acc.concat(
			groupConfiguration.Group.NudgeeGroup.reduce((acc, nudgeeGroup) => {
				return acc.concat(
					nudgeeGroup.Nudgee.Action.reduce((acc, action) => {
						return acc.concat(action);
					}, [])
				);
			}, [])
		);
	}, []);
	const nudgeRecipients: NudgeRecipient[] = configuration.GroupConfiguration.reduce(
		(acc, groupConfiguration) => {
			return acc.concat(
				groupConfiguration.Group.NudgeeGroup.reduce((acc, nudgeeGroup) => {
					return acc.concat(
						nudgeeGroup.Nudgee.NudgeRecipient.reduce((acc, nudgeRecipient) => {
							return acc.concat(nudgeRecipient);
						}, [])
					);
				}, [])
			);
		},
		[]
	);

	const compositeScores: number[] = [];

	// loop through nudge recipients
	nudgeRecipients.forEach((nudgeRecipient) => {
		// get all actions for this nudge recipient where the date of the action is after the date of the nudge
		const actionsAfterNudge = actions.filter((action) => {
			return (
				action.nudgee_id === nudgeRecipient.nudgee_id &&
				action.created_at > nudgeRecipient.created_at
			);
		});

		let compositeScore = 0;

		// loop through actions after nudge and calculate composite score of metric_value * metric_type_weight
		actionsAfterNudge.forEach((action) => {
			const metricTypeWeight = configuration.MetricTypeWeight.find((metricTypeWeight) => {
				return metricTypeWeight.metric_type_id === action.metric_type_id;
			});
			const metricValue = action.metric_value;
			compositeScore += metricValue * metricTypeWeight.weight;

			// get time difference between nudge and action
			const timeDifference: number =
			new Date(action.created_at).getTime() - new Date(nudgeRecipient.created_at).getTime();

			compositeScore += 1/(timeDifference * configuration.decision_time_weight);
		});
		compositeScore = compositeScore / (actionsAfterNudge.length*2);
		compositeScores.push(compositeScore);
	});

	const responseComponents = await fetch('/api/components');
	const componentTypes: ComponentType[] = await responseComponents.json();

	return { configuration, componentTypes, compositeScores };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const id = params.id;
		const name = data.get('name');
		const start_datetime = data.get('start_datetime');
		const end_datetime = data.get('end_datetime');
		const algorithm = data.get('algorithm');
		const decision_time_weight = parseFloat(data.get('decision_time_weight') as string);
		const groups = data.getAll('groups');
		const metric_types = data.getAll('metric_types');
		const metric_type_weights = data.getAll('metric_type_weights') as string[];
		const prompt_types = data.getAll('prompt[type][]');
		const prompt_contents = data.getAll('prompt[content][]');
		const generate = data.has('generate');
		const generate_model = data.get('generate_model');
		if (!id || !name || !start_datetime || !end_datetime || !algorithm) {
			return {
				success: false
			};
		}
		const deconstructed_prompt = prompt_types.map((type, index) => ({
			type,
			content: prompt_contents[index]
		}));
		// zip the metric types and weights
		const metric_type_weights_zipped = metric_types.map((type, index) => ({
			metric_type_id: type,
			weight: parseFloat(metric_type_weights[index])
		}));

		const response = await fetch(`/api/configurations/${id}`, {
			method: 'PUT',
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
	},
	destroy: async ({ params, fetch }) => {
		await fetch(`/api/configurations/${params.id}`, {
			method: 'DELETE'
		});
		throw redirect(303, '/configurations');
	},
	generate: async ({ params, fetch }) => {
		const response = await fetch(`/api/configurations/${params.id}/generate`, {
			method: 'POST'
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
