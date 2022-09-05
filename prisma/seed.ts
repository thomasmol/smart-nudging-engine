import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { channels } from './seeds/channels';
import { categories } from './seeds/categories';
const prisma = new PrismaClient();

const main = async () => {
	for (let i = 0; i < 10; i++) {
		await prisma.user.create({
			data: {
				nudge_category_model: faker.datatype.json(),
				nudge_channel_model: faker.datatype.json(),
				activity_model: faker.datatype.json()
			}
		});
	}
	for (const channel of channels) {
		await prisma.channel.create({
			data: channel
		});
	}
	for (const category of categories) {
		await prisma.category.create({
			data: category
		});
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
