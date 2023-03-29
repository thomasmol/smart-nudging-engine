import type {
	ComponentType,
	ComponentValue,
	Configuration,
	MetricType,
	Nudge,
	Nudgee
} from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const main = async () => {
	const group1 = await prisma.group.create({
		data: {
			name: 'Group one',
			control: false

		}
	});

	const group2 = await prisma.group.create({
		data: {
			name: 'Control group',
			control: true
		}
	});

	// Create mock data for other tables
	const componentTypeLabels = ['Category', 'Channel', 'Time'];
	const dataTypes = ['text', 'text', 'text'];
	const componentTypes: ComponentType[] = [];
	for (let i = 0; i < componentTypeLabels.length; i++) {
		const componentType = await prisma.componentType.create({
			data: {
				label: componentTypeLabels[i],
				data_type: dataTypes[i]
			}
		});
		componentTypes.push(componentType);
	}

	const values = [
		['simplification', 'social norm', 'reminder', 'feedback', 'goal setting'],
		['email', 'sms', 'push notification', 'in-app notification'],
		['morning', 'afternoon', 'evening']
	];
	const componentValues: ComponentValue[] = [];
	for (const [index, componentType] of componentTypes.entries()) {
		for (const value of values[index]) {
			const componentValue = await prisma.componentValue.create({
				data: {
					component_type_id: componentType.id,
					value: value
				}
			});
			componentValues.push(componentValue);
		}
	}
	const nudgeContents = [
		"Take a break from your busy day and go for a refreshing walk this morning. You'll feel reenergized and ready to tackle the day!",
		'Remember, a run this afternoon will give you more energy for the rest of your day!',
		'Most people in your community are exercising today - join them!'
	];
	const nudges: Nudge[] = [];
	for (let i = 0; i < nudgeContents.length; i++) {
		const nudge = await prisma.nudge.create({
			data: {
				content_type: 'text',
				content: nudgeContents[i],
				generated: true
			}
		});
		nudges.push(nudge);
	}

	// Create 10 nudgees and assign them to groups
	const nudgees: Nudgee[] = [];
	for (let i = 0; i < 10; i++) {
		const nudgee = await prisma.nudgee.create({
			data: {
				profile: JSON.stringify({
					name: faker.name.firstName(),
					age: faker.datatype.number({ min: 18, max: 74 }),
					location: faker.address.country(),
					jobTitle: faker.name.jobTitle(),
					cognitiveStyle: faker.name.jobDescriptor(),
					device: faker.name.jobArea(),
					interests: faker.name.jobType()
				})
			}
		});
		nudgees.push(nudgee);

		// Assign nudgees to groups, and nudges to nudgees
		if (i < 5) {
			await prisma.nudgeeGroup.create({
				data: {
					nudgee_id: nudgee.id,
					group_id: group1.id
				}
			});
			await prisma.nudgeRecipient.create({
				data: {
					nudge_id: faker.helpers.arrayElement(nudges).id,
					nudgee_id: nudgee.id
				}
			});
		} else {
			await prisma.nudgeeGroup.create({
				data: {
					nudgee_id: nudgee.id,
					group_id: group2.id
				}
			});
		}
	}

	// for every nudge, create a usedComponent for each componentType
	for (const nudge of nudges) {
		for (const componentType of componentTypes) {
			// get all componet values belonging to this component type
			const componentValues = await prisma.componentValue.findMany({
				where: {
					component_type_id: componentType.id
				}
			});
			await prisma.usedComponent.create({
				data: {
					nudge_id: nudge.id,
					component_value_id: faker.helpers.arrayElement(componentValues).id
				}
			});
		}
	}

	const metricLabels = ['steps', 'calories', 'exercise'];
	const metricTypeTypes = ['number', 'number', 'boolean'];
	const metricTypes: MetricType[] = [];
	for (let i = 0; i < metricLabels.length; i++) {
		const metricType = await prisma.metricType.create({
			data: {
				label: metricLabels[i],
				type: metricTypeTypes[i]
			}
		});
		metricTypes.push(metricType);
	}

	for (const nudgee of nudgees) {
		for (const metricType of metricTypes) {
			if (metricType.type === 'boolean') {
				await prisma.action.create({
					data: {
						nudgee_id: nudgee.id,
						metric_type_id: metricType.id,
						metric_value: 1
					}
				});
			} else if (metricType.label === 'steps') {
				await prisma.action.create({
					data: {
						nudgee_id: nudgee.id,
						metric_type_id: metricType.id,
						metric_value: faker.datatype.number({ min: 1000, max: 10000 })
					}
				});
			} else if (metricType.label === 'calories') {
				await prisma.action.create({
					data: {
						nudgee_id: nudgee.id,
						metric_type_id: metricType.id,
						metric_value: faker.datatype.number({ min: 500, max: 1000 })
					}
				});
			}
		}
	}

	for (const nudge of nudges) {
		for (const metricType of metricTypes) {
			await prisma.nudgeMetric.create({
				data: {
					nudge_id: nudge.id,
					metric_type_id: metricType.id
				}
			});
		}
	}

	const configurations: Configuration[] = [];
	for (let i = 0; i < 2; i++) {
		const configuration = await prisma.configuration.create({
			data: {
				name: 'Example Configuration ' + i,
				algorithm: faker.helpers.arrayElement(['algorithm1', 'algorithm2', 'algorithm3']),
				generate: false,
				generate_model: faker.system.commonFileName('model'),
				start_datetime: faker.date.past(),
				end_datetime: faker.date.future()
			}
		});
		configurations.push(configuration);
	}
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
