import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { channels } from './seeds/channels';
import { categories } from './seeds/categories';
import { activityTypes } from './seeds/activityTypes';
import { timeFrames } from './seeds/timeFrames';
import { configurations } from './seeds/configurations';
const prisma = new PrismaClient();

const main = async () => {

	for (const activityType of activityTypes) {
		await prisma.activityType.create({
			data: activityType
		});
	}
	for (let i = 0; i < 10; i++) {
		await prisma.nudgee.create({
			data: {
				nudge_category_model: faker.datatype.json(),
				nudge_channel_model: faker.datatype.json(),
				activity_model: faker.datatype.json()
			}
		}).then(async (nudgee) =>{
			const allActivityTypes = await prisma.activityType.findMany();
			for(const activityType of allActivityTypes){
				await prisma.activityGoalContribution.create({
					data: {
						nudgee_id: nudgee.id,
						activity_type_id: activityType.id,
						contribution: faker.datatype.number({min:0, max:10})
					}
				})
			}
		});
	}
	/* for (const channel of channels) {
		await prisma.channel.create({
			data: channel
		});
	}
	for (const category of categories) {
		await prisma.category.create({
			data: category
		});
	}	 */
	for (const timeFrame of timeFrames) {
		await prisma.timeframe.create({
			data: timeFrame
		});
	}
	for (const configuration of configurations) {
		await prisma.configuration.create({
			data: configuration
		});
	}
};

/* main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
 */