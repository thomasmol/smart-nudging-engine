import prisma from '$lib/database';
import type { Configuration, ComponentValue, Prisma } from '@prisma/client';
import type { RequestHandler } from './$types';
import openai from '$lib/openai';

export const POST = (async ({ request, params }) => {
	const configuration: Configuration = await prisma.configuration.findFirstOrThrow({
		where: { id: params.id },
		include: {
			GroupConfiguration: {
				include: {
					Group: {
						include: {
							NudgeeGroup: {
								include: {
									Nudgee: true
								}
							}
						}
					}
				}
			},
			MetricTypeWeight: {
				include: {
					MetricType: true
				}
			},
			NudgeeWeights: true
		}
	});
	if (!configuration || !configuration.generate || configuration.deconstructed_prompt === null) {
		return new Response('Configuration not found', { status: 404 });
	}
	const deconstructed_prompt = configuration.deconstructed_prompt as Prisma.JsonArray;

	const componentValues: ComponentValue[] = await prisma.componentValue.findMany();

	// create prompt from deconstructed_prompt in configuration
	// deconstructed_prompt is a json object with the following structure:
	// [{"type":"text","content":"Generate a single sentence nudge message that will encourage me to "},
	// {"type":"component_type_id","content":"897b9e12-2c10-4fa5-b962-8527901e79ec"}]
	const prompt = deconstructed_prompt
		.map((deconstructedPrompt: any) => {
			if (deconstructedPrompt.type === 'text') {
				return deconstructedPrompt.content;
			} else if (deconstructedPrompt.type === 'component_type_id') {
				const componentValue = componentValues.find((componentValue) => {
					return componentValue.component_type_id === deconstructedPrompt.content;
				});
				return ' ' + componentValue?.value + ' ';
			}
		})
		.join('');

	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content:
					'you are a smart nudging engine that should create short and effective nudging messages'
			},
			{ role: 'user', content: prompt }
		]
	});

	// create nudge, does not check for control group, assigned to random nudgee
	await prisma.nudge.create({
		data: {
			content: response.data.choices[0].message?.content ?? '',
			content_type: 'text',
			generated: true,
			NudgeRecipient: {
				create: {
					nudgee_id: configuration.GroupConfiguration[0].Group.NudgeeGroup[0].nudgee_id,
				}
			}
		}
	});
	return new Response(JSON.stringify(response.data.choices[0].message?.content));
}) satisfies RequestHandler;
