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
			name: 'Control group'
		}
	});

	const group2 = await prisma.group.create({
		data: {
			name: 'Some other group'
		}
	});

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

		// Assign nudgees to groups
		if (i < 5) {
			await prisma.nudgeeGroup.create({
				data: {
					nudgee_id: nudgee.id,
					group_id: group1.id
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

	// Create mock data for other tables
	const types = ['Category', 'Channel', 'Related Content', 'Time'];
	const dataTypes = ['text', 'text', 'text', 'text'];
	const componentTypes: ComponentType[] = [];
	for (let i = 0; i < types.length; i++) {
		const componentType = await prisma.componentType.create({
			data: {
				label: types[i],
				data_type: dataTypes[i]
			}
		});
		componentTypes.push(componentType);
	}

	const values = [
		['simplification', 'social norm', 'reminder', 'feedback', 'goal setting'],
		['email', 'sms', 'push notification', 'in-app notification'],
		['weather'],
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
		'do more!',
		'go for a walk!',
		'eat more veggies!',
		'drink more water!',
		'go to bed earlier!',
		'get more sleep!'
	];
	const nudges: Nudge[] = [];
	for (let i = 0; i < 20; i++) {
		const nudge = await prisma.nudge.create({
			data: {
				content_type: 'text',
				content: faker.helpers.arrayElement(nudgeContents),
				generated: true
			}
		});
		nudges.push(nudge);
	}

	for (const nudge of nudges) {
		for (const nudgee of nudgees) {
			await prisma.nudgeRecipient.create({
				data: {
					nudge_id: nudge.id,
					nudgee_id: nudgee.id
				}
			});
		}

		for (const componentValue of componentValues) {
			await prisma.usedComponent.create({
				data: {
					nudge_id: nudge.id,
					component_value_id: componentValue.id
				}
			});
		}
	}

	const metricTypes: MetricType[] = [];
	for (let i = 0; i < 3; i++) {
		const metricType = await prisma.metricType.create({
			data: {
				label: faker.random.word(),
				type: faker.helpers.arrayElement(['number', 'percentage', 'boolean'])
			}
		});
		metricTypes.push(metricType);
	}

	for (const nudgee of nudgees) {
		for (const metricType of metricTypes) {
			await prisma.action.create({
				data: {
					nudgee_id: nudgee.id,
					metric_type_id: metricType.id,
					metric_value: faker.helpers.arrayElement(['1', '0', '0.5'])
				}
			});
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
				name: faker.random.word(),
				algorithm: faker.helpers.arrayElement(['algorithm1', 'algorithm2', 'algorithm3']),
				generate: faker.datatype.boolean(),
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
